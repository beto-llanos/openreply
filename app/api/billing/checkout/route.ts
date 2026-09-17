import { NextRequest, NextResponse } from "next/server";
import { getCurrentWorkspaceId } from "@/lib/auth";
import { prisma } from "@/lib/db/client";
import { getStripe, getBaseUrl } from "@/lib/stripe";
import { PLANS, PAID_TIERS } from "@/lib/billing/plans";
import type { PlanTier } from "@/app/generated/prisma/client";

// Crea una sesión de Stripe Checkout para suscribirse a un plan de pago.
// Devuelve { url } para redirigir. Usa price_data inline (MXN, mensual) para no
// depender de precios pre-creados en el dashboard.
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Billing no está configurado todavía." },
      { status: 503 }
    );
  }

  const workspaceId = await getCurrentWorkspaceId();
  if (!workspaceId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  let tier: PlanTier;
  try {
    const body = await req.json();
    tier = body?.tier;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  if (!PAID_TIERS.includes(tier)) {
    return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
  }
  const plan = PLANS[tier];

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: { id: true, stripeCustomerId: true, owner: { select: { email: true } } },
  });
  if (!workspace) {
    return NextResponse.json({ error: "Workspace no encontrado" }, { status: 404 });
  }

  const base = getBaseUrl();
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ...(workspace.stripeCustomerId
        ? { customer: workspace.stripeCustomerId }
        : workspace.owner?.email
          ? { customer_email: workspace.owner.email }
          : {}),
      line_items: [
        {
          price_data: {
            currency: "mxn",
            product_data: { name: `Comentio ${plan.name}` },
            unit_amount: plan.priceMxn * 100,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      metadata: { workspaceId, tier },
      subscription_data: { metadata: { workspaceId, tier } },
      success_url: `${base}/settings/billing?status=ok`,
      cancel_url: `${base}/settings/billing?status=cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("checkout create failed:", err);
    return NextResponse.json(
      { error: "No se pudo crear el checkout" },
      { status: 500 }
    );
  }
}
