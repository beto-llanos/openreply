import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/db/client";
import { getStripe } from "@/lib/stripe";
import { PAID_TIERS } from "@/lib/billing/plans";
import type { PlanTier } from "@/app/generated/prisma/client";

// Webhook de Stripe: la ÚNICA fuente de verdad del plan. El checkout no cambia el
// plan; Stripe confirma el pago aquí y aquí se actualiza el workspace. Verifica la
// firma con STRIPE_WEBHOOK_SECRET antes de creer nada.
export const dynamic = "force-dynamic";

function tierFromMeta(meta: Stripe.Metadata | null | undefined): PlanTier | null {
  const t = meta?.tier as PlanTier | undefined;
  return t && PAID_TIERS.includes(t) ? t : null;
}

function periodEnd(sub: Stripe.Subscription): Date | null {
  const raw = (sub as unknown as { current_period_end?: number })
    .current_period_end;
  return typeof raw === "number" ? new Date(raw * 1000) : null;
}

async function applySubscription(sub: Stripe.Subscription, fallbackTier?: PlanTier) {
  const workspaceId = sub.metadata?.workspaceId;
  if (!workspaceId) return;
  const active = sub.status === "active" || sub.status === "trialing" || sub.status === "past_due";
  const tier = tierFromMeta(sub.metadata) ?? fallbackTier ?? "CREATOR";
  await prisma.workspace.updateMany({
    where: { id: workspaceId },
    data: {
      plan: active ? tier : "FREE",
      stripeSubscriptionId: sub.id,
      stripeCustomerId: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
      subscriptionStatus: sub.status,
      planCurrentPeriodEnd: periodEnd(sub),
    },
  });
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "Billing no configurado" }, { status: 503 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "sin firma" }, { status: 400 });

  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    console.error("webhook signature failed:", err);
    return NextResponse.json({ error: "firma inválida" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        const workspaceId = s.metadata?.workspaceId;
        const tier = tierFromMeta(s.metadata);
        if (workspaceId && s.subscription) {
          const subId = typeof s.subscription === "string" ? s.subscription : s.subscription.id;
          const sub = await stripe.subscriptions.retrieve(subId);
          // asegura el workspaceId en la metadata de la subscription
          if (!sub.metadata?.workspaceId) {
            await stripe.subscriptions.update(subId, {
              metadata: { workspaceId, tier: tier ?? "CREATOR" },
            });
            sub.metadata = { ...sub.metadata, workspaceId, tier: tier ?? "CREATOR" };
          }
          await applySubscription(sub, tier ?? undefined);
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.created": {
        await applySubscription(event.data.object as Stripe.Subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const workspaceId = sub.metadata?.workspaceId;
        if (workspaceId) {
          await prisma.workspace.updateMany({
            where: { id: workspaceId },
            data: { plan: "FREE", subscriptionStatus: sub.status },
          });
        }
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error("webhook handling failed:", err);
    return NextResponse.json({ error: "error interno" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
