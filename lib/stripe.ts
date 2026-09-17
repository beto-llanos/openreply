import Stripe from "stripe";

// Stripe es OPCIONAL: si no hay STRIPE_SECRET_KEY, el billing está apagado y la
// app sigue funcionando igual (manda DMs). Se enciende cuando se setea la key.
let _stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!_stripe) {
    _stripe = new Stripe(key, { apiVersion: "2026-08-26.dahlia" });
  }
  return _stripe;
}

export function stripeEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getBaseUrl(): string {
  return (
    process.env.NEXTAUTH_URL ||
    process.env.APP_URL ||
    "https://comentio.app"
  ).replace(/\/$/, "");
}
