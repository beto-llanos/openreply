import { NextResponse } from "next/server";
import { getCurrentWorkspaceId } from "@/lib/auth";
import { prisma } from "@/lib/db/client";
import { stripeEnabled } from "@/lib/stripe";
import {
  PLANS,
  planFor,
  dmLimitForTier,
  isPaidActive,
  UNLIMITED_DMS,
} from "@/lib/billing/plans";

// Estado del plan del workspace + uso, para la página de billing.
export async function GET() {
  const workspaceId = await getCurrentWorkspaceId();
  if (!workspaceId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const w = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: {
      plan: true,
      subscriptionStatus: true,
      dmsSentThisPeriod: true,
      planCurrentPeriodEnd: true,
      stripeCustomerId: true,
    },
  });
  if (!w) return NextResponse.json({ error: "Workspace no encontrado" }, { status: 404 });

  const paidActive = w.plan !== "FREE" && isPaidActive(w.subscriptionStatus);
  const effectiveTier = paidActive ? w.plan : "FREE";
  const limit = dmLimitForTier(effectiveTier);

  return NextResponse.json({
    stripeEnabled: stripeEnabled(),
    currentTier: effectiveTier,
    rawPlan: w.plan,
    subscriptionStatus: w.subscriptionStatus,
    hasSubscription: Boolean(w.stripeCustomerId),
    periodEnd: w.planCurrentPeriodEnd,
    usage: {
      sent: w.dmsSentThisPeriod,
      limit,
      unlimited: limit >= UNLIMITED_DMS,
    },
    currentName: planFor(effectiveTier).name,
    plans: Object.values(PLANS).map((p) => ({
      tier: p.tier,
      name: p.name,
      priceMxn: p.priceMxn,
      blurb: p.blurb,
      unlimited: p.dmLimit >= UNLIMITED_DMS,
      dmLimit: p.dmLimit,
      maxInstagramAccounts: p.maxInstagramAccounts,
      teamMembers: p.teamMembers,
    })),
  });
}
