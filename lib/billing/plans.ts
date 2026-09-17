// Planes de Comentio. Precios en MXN, suscripción mensual.
// El límite se cuenta en DMs enviados por mes (lo que el workspace ya trackea en
// dmsSentThisPeriod). "Ilimitado" usa un tope enorme dentro del rango int4 de
// Postgres, igual que hacía el build self-hosted, para no romper la columna Int.
import type { PlanTier } from "@/app/generated/prisma/client";

export const UNLIMITED_DMS = 2_000_000_000;

export interface PlanDef {
  tier: PlanTier;
  name: string;
  priceMxn: number; // 0 = gratis
  dmLimit: number; // DMs/mes; UNLIMITED_DMS = sin tope real
  maxInstagramAccounts: number;
  teamMembers: boolean;
  blurb: string;
}

export const PLANS: Record<PlanTier, PlanDef> = {
  FREE: {
    tier: "FREE",
    name: "Prueba",
    priceMxn: 0,
    dmLimit: 50, // suficiente para vivir el momento "ajá" sin tarjeta
    maxInstagramAccounts: 1,
    teamMembers: false,
    blurb: "Para probar la magia, sin tarjeta.",
  },
  CREATOR: {
    tier: "CREATOR",
    name: "Creador",
    priceMxn: 199,
    dmLimit: UNLIMITED_DMS, // sin cobro por contacto: no te multamos por hacerte viral
    maxInstagramAccounts: 1,
    teamMembers: false,
    blurb: "DMs ilimitados. Sin multa por hacerte viral.",
  },
  BUSINESS: {
    tier: "BUSINESS",
    name: "Negocio",
    priceMxn: 499,
    dmLimit: UNLIMITED_DMS,
    maxInstagramAccounts: 5,
    teamMembers: true,
    blurb: "Varias cuentas y equipo.",
  },
};

// Planes que se compran (los que van al checkout). FREE no.
export const PAID_TIERS: PlanTier[] = ["CREATOR", "BUSINESS"];

export function planFor(tier: PlanTier | null | undefined): PlanDef {
  return PLANS[(tier ?? "FREE") as PlanTier] ?? PLANS.FREE;
}

export function dmLimitForTier(tier: PlanTier | null | undefined): number {
  return planFor(tier).dmLimit;
}

// Un plan de pago sigue "vivo" mientras Stripe lo reporte activo o en periodo de
// gracia. Cualquier otro estado (canceled, unpaid, etc.) cae a los límites de FREE.
export function isPaidActive(
  status: string | null | undefined
): boolean {
  return status === "active" || status === "trialing" || status === "past_due";
}
