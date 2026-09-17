"use client";

import { useEffect, useState } from "react";

interface PlanRow {
  tier: "FREE" | "CREATOR" | "BUSINESS";
  name: string;
  priceMxn: number;
  blurb: string;
  unlimited: boolean;
  dmLimit: number;
  maxInstagramAccounts: number;
  teamMembers: boolean;
}
interface Status {
  stripeEnabled: boolean;
  currentTier: PlanRow["tier"];
  currentName: string;
  hasSubscription: boolean;
  subscriptionStatus: string | null;
  periodEnd: string | null;
  usage: { sent: number; limit: number; unlimited: boolean };
  plans: PlanRow[];
}

export default function BillingPage() {
  const [data, setData] = useState<Status | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/billing/status")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setErr("No se pudo cargar tu plan."));
  }, []);

  async function subscribe(tier: string) {
    setBusy(tier);
    setErr(null);
    try {
      const r = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const j = await r.json();
      if (j.url) window.location.href = j.url;
      else setErr(j.error || "No se pudo iniciar el pago.");
    } catch {
      setErr("No se pudo iniciar el pago.");
    } finally {
      setBusy(null);
    }
  }

  async function manage() {
    setBusy("portal");
    setErr(null);
    try {
      const r = await fetch("/api/billing/portal", { method: "POST" });
      const j = await r.json();
      if (j.url) window.location.href = j.url;
      else setErr(j.error || "No se pudo abrir el portal.");
    } catch {
      setErr("No se pudo abrir el portal.");
    } finally {
      setBusy(null);
    }
  }

  if (!data) {
    return (
      <div className="p-6 text-sm text-muted">
        {err ?? "Cargando tu plan…"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold text-foreground">Plan y facturación</h1>

      {!data.stripeEnabled && (
        <p className="mt-3 rounded-lg border border-warning/40 bg-surface px-4 py-3 text-sm text-warning">
          El cobro todavía no está activado en este servidor. Puedes ver los
          planes, pero aún no se puede pagar.
        </p>
      )}

      <div className="mt-5 rounded-lg border border-border bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted">Tu plan</div>
            <div className="text-lg font-semibold text-foreground">{data.currentName}</div>
            <div className="text-sm text-muted">
              {data.usage.unlimited
                ? `${data.usage.sent} DMs este mes · ilimitado`
                : `${data.usage.sent} / ${data.usage.limit} DMs este mes`}
            </div>
          </div>
          {data.hasSubscription && (
            <button
              onClick={manage}
              disabled={busy === "portal"}
              className="rounded border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-hover disabled:opacity-50"
            >
              {busy === "portal" ? "Abriendo…" : "Gestionar suscripción"}
            </button>
          )}
        </div>
      </div>

      {err && <p className="mt-3 text-sm text-error">{err}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {data.plans.map((p) => {
          const isCurrent = p.tier === data.currentTier;
          return (
            <div
              key={p.tier}
              className={`flex flex-col rounded-lg border p-5 ${
                isCurrent ? "border-accent" : "border-border"
              }`}
            >
              <div className="text-sm font-semibold text-foreground">{p.name}</div>
              <div className="mt-1 text-2xl font-bold text-foreground">
                {p.priceMxn === 0 ? "$0" : `$${p.priceMxn}`}
                <span className="text-sm font-medium text-muted"> MXN/mes</span>
              </div>
              <p className="mt-2 text-sm text-muted">{p.blurb}</p>
              <ul className="mt-3 flex-1 space-y-1 text-sm text-foreground">
                <li>{p.unlimited ? "DMs ilimitados" : `${p.dmLimit} DMs/mes`}</li>
                <li>{p.maxInstagramAccounts === 1 ? "1 cuenta de Instagram" : `${p.maxInstagramAccounts} cuentas`}</li>
                {p.teamMembers && <li>Miembros de equipo</li>}
              </ul>
              <div className="mt-4">
                {isCurrent ? (
                  <div className="text-center text-sm font-semibold text-accent">Plan actual</div>
                ) : p.tier === "FREE" ? (
                  <div className="text-center text-sm text-muted">—</div>
                ) : (
                  <button
                    onClick={() => subscribe(p.tier)}
                    disabled={!data.stripeEnabled || busy === p.tier}
                    className="w-full rounded bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
                  >
                    {busy === p.tier ? "Abriendo…" : "Suscribirme"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs text-muted">
        Pago seguro con Stripe. Cancela cuando quieras desde “Gestionar suscripción”.
      </p>
    </div>
  );
}
