import { NextResponse } from "next/server";
import { getCurrentWorkspaceId } from "@/lib/auth";
import { prisma } from "@/lib/db/client";
import { getStripe, getBaseUrl } from "@/lib/stripe";

// Abre el portal de facturación de Stripe para que el cliente gestione o cancele
// su suscripción. Devuelve { url }.
export async function POST() {
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

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: { stripeCustomerId: true },
  });
  if (!workspace?.stripeCustomerId) {
    return NextResponse.json(
      { error: "No hay suscripción todavía" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: workspace.stripeCustomerId,
      return_url: `${getBaseUrl()}/settings/billing`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("portal create failed:", err);
    return NextResponse.json(
      { error: "No se pudo abrir el portal" },
      { status: 500 }
    );
  }
}
