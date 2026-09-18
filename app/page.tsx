import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { DemoNotice } from "@/components/demo-notice";

export const metadata: Metadata = {
  title: "Comentio - Comentarios de Instagram a DM automático",
  description:
    "Cuando alguien comenta tu palabra clave en un post o reel, le llega tu DM un segundo después. Con la API oficial de Instagram, en español y hosteado por nosotros.",
};

/* ── Copy (voz de Beto, español MX, sin guion largo). Los cuerpos largos van
   como constantes para que el markup quede limpio y sin comillas sueltas. ── */

const heroStats = [
  { value: "24/7", label: "Vigila tus comentarios" },
  { value: "1 seg", label: "Tarda el DM en salir" },
  { value: "0", label: "Bots o contraseñas" },
];

const dolorBody = `Subiste algo bueno. Se llenó de "precio", "link porfa", "info". Y ahí estás, copiando y pegando el mismo link cincuenta veces. Mientras duermes, tres personas preguntan y ninguna te espera. Para cuando contestas, ya se les enfrió o le compraron a otro. El reel hizo su trabajo. Tú te quedaste haciendo el resto.`;

const giroBody = `Comentan "GUIA" a las 3 am, les llega el DM a las 3 am. No importa si son diez o son mil, a todos les llega igual de rápido.`;

const flowSteps = [
  {
    n: "1",
    title: "Conecta",
    body: "Conectas tu Instagram una vez, con tu correo. Sin dar tu contraseña, sin nada raro.",
  },
  {
    n: "2",
    title: "Arma",
    body: `Eliges el post, la palabra que vas a vigilar ("GUIA", "LINK", "PRECIO") y el DM que quieres mandar. En un minuto.`,
  },
  {
    n: "3",
    title: "Suelta",
    body: "Y ya. Cada quien que comente esa palabra recibe tu DM al segundo. Tú no vuelves a tocar nada.",
  },
];

const vsBody = `Ya lo buscaste. Llegaste a ManyChat. Está en inglés, te cobra en dólares y armar un flujo se siente como aprender otro programa. Lo cerraste y seguiste contestando a mano. Comentio está en español, cobra en pesos y lo prendes en lo que dura un café.`;

const vsClose = `ManyChat es gringo, caro y en inglés. Comentio lo hice para el que vende por Instagram en México y LATAM. Mismo resultado, sin traducir ni sacar la calculadora del dólar.`;

const compareRows = [
  { k: "Idioma", mc: "En inglés", co: "En español" },
  { k: "Precio", mc: "En dólares (17 a 199 USD)", co: "En pesos (199 a 499)" },
  { k: "Setup", mc: "Complejo, se te va la tarde", co: "3 toques, listo en 3 min" },
  { k: "Baneo", mc: "Depende de cómo lo uses", co: "API oficial, no te banean" },
  { k: "Soporte", mc: "Te contestan en inglés", co: "Te contestamos como hablas" },
];

const trustBody = `Cada DM queda registrado: a quién, cuándo, si salió o no. Y como todo va por la API oficial de Instagram, no hay bots ni contraseñas prestadas, o sea que no te banean. Lo que un scraper te arriesga, aquí no existe.`;

const trustBullets = [
  "Cada DM con su estado: en cola, enviado, omitido o fallido",
  "Enlaces con clics rastreados, ves qué convierte",
  "Varias cuentas de Instagram en un solo panel",
  "En español y hospedado por nosotros",
];

const archLine = `Webhooks al instante, un barrido recoge lo que Instagram no avisa, y cada envío va en cola con límite de ritmo. No se pierde ninguno.`;

const plans = [
  {
    name: "Gratis",
    price: "$0",
    cadence: "",
    tagline: "Para probar con tu próximo reel",
    points: ["Algunos DMs al mes", "1 cuenta de Instagram"],
    popular: false,
  },
  {
    name: "Crecimiento",
    price: "$199",
    cadence: "/mes",
    tagline: "Para el que ya vende por Instagram",
    points: ["DMs ilimitados", "Varias campañas a la vez"],
    popular: true,
  },
  {
    name: "Pro",
    price: "$499",
    cadence: "/mes",
    tagline: "Para agencias y varias marcas",
    points: ["Varias cuentas de Instagram", "Todo incluido"],
    popular: false,
  },
];

const faqs = [
  {
    q: "Me pueden banear?",
    a: "No. Comentio usa la API oficial de Meta. No scrapea ni pide tu contraseña, que es justo lo que hace que baneen a los bots.",
  },
  {
    q: "Necesito tarjeta?",
    a: "No. El plan gratis es gratis de verdad. Metes tarjeta solo si subes de plan.",
  },
  {
    q: "Puedo cancelar?",
    a: "Cuando quieras, en dos toques. Sin llamadas ni letras chiquitas.",
  },
];

const REFRAN = "Tú subes el reel. Comentio contesta.";

/* ── Piezas reutilizables ─────────────────────────────────────────────── */

function Eyebrow({
  children,
  onDark = false,
}: {
  children: ReactNode;
  onDark?: boolean;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] ${
        onDark ? "text-support-live" : "text-support"
      }`}
    >
      <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
      {children}
    </p>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3.5 8.5l3 3 6-7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* El momento wow: teléfono con loop de 3 beats en CSS puro. Decorativo, así
   que va oculto para lectores de pantalla; el subtítulo ya lo explica. */
function HeroPhone({ className = "" }: { className?: string }) {
  return (
    <div
      className={`hero-demo mx-auto w-[clamp(248px,74vw,304px)] select-none ${className}`}
      aria-hidden="true"
    >
      <div className="rounded-[2.4rem] border border-night-raised bg-night p-2.5 shadow-2xl shadow-black/30">
        <div className="overflow-hidden rounded-[1.9rem] bg-[#FAF7F2]">
          <div className="flex items-center gap-2 border-b border-[#E7DFD3] bg-[#F2ECE3] px-4 py-3">
            <span className="h-7 w-7 shrink-0 rounded-full bg-night" />
            <div className="leading-tight">
              <p className="text-[11px] font-bold text-[#1C1917]">studio.store</p>
              <p className="text-[10px] text-[#78706A]">Comentarios · Reel</p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-support">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-support-live" />
              En vivo
            </span>
          </div>

          <div className="min-h-[268px] space-y-3 px-4 py-5">
            <div className="cmt-in flex items-start gap-2">
              <span className="mt-0.5 h-7 w-7 shrink-0 rounded-full bg-[#E7DFD3]" />
              <div className="rounded-2xl rounded-tl-sm bg-[#F2ECE3] px-3 py-2">
                <p className="text-[11px] font-bold text-[#1C1917]">maya.co</p>
                <p className="mt-0.5 text-[13px] leading-snug text-[#1C1917]">
                  Me urge, <span className="kw rounded px-1 font-semibold">GUIA</span>{" "}
                  porfa
                </p>
              </div>
            </div>

            <div className="dm-rise flex justify-end">
              <div className="max-w-[84%] rounded-2xl rounded-br-sm bg-night px-3 py-2 text-on-night">
                <p className="text-[13px] leading-snug">
                  Va, aquí tienes tu guía
                </p>
                <p className="mt-1 truncate font-mono text-[12px] font-medium text-accent">
                  comentio.link/guia
                </p>
              </div>
            </div>

            <div className="sent-tag flex items-center justify-end gap-1.5">
              <Check className="h-3.5 w-3.5 text-support-live" />
              <span className="text-[11px] font-bold text-support">Enviado</span>
              <span className="font-mono text-[11px] text-[#78706A]">0.8s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Copia fiel de las pantallas reales de la app, con los tokens base (blanco),
   para que la ventana flote sobre la banda espresso como software de verdad. */

function AppWindow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 text-xs text-muted">{label}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded border border-border bg-surface p-3">
      <p className="truncate text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-lg font-medium tabular-nums text-foreground">
        {value}
      </p>
    </div>
  );
}

const dashboardStats = [
  ["Campañas", "8"],
  ["DMs enviados", "1,284"],
  ["Omitidos", "42"],
  ["Fallidos", "3"],
  ["Clics", "356"],
  ["CTR", "27.7%"],
];

const dashboardChart: [string, number][] = [
  ["Lun", 42],
  ["Mar", 68],
  ["Mié", 51],
  ["Jue", 94],
  ["Vie", 120],
  ["Sáb", 86],
  ["Dom", 73],
];

const dashboardActivity: [string, string, string, string][] = [
  ["@maya.co", "Respuesta con la guía", "Enviado", "text-success"],
  ["@founder.ray", "Pedido de precio", "Enviado", "text-success"],
  ["@shop.ava", "Imán de leads", "En cola", "text-warning"],
];

function DashboardPreview() {
  const maxDM = Math.max(...dashboardChart.map(([, n]) => n));
  return (
    <AppWindow label="app / panel">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">Hola, Maya</h3>
          <p className="mt-1 text-xs text-muted">2 cuentas · 340 contactos</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-success" />
          En vivo
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {dashboardStats.map(([label, value]) => (
          <Stat key={label} label={label} value={value} />
        ))}
      </div>

      <div className="mt-4 rounded border border-border bg-surface p-4">
        <p className="text-sm font-semibold text-foreground">DMs, últimos 7 días</p>
        <div className="mt-4 flex h-28 items-end gap-2">
          {dashboardChart.map(([day, n]) => (
            <div key={day} className="flex flex-1 flex-col items-center gap-2">
              <span className="font-mono text-[10px] text-muted">{n}</span>
              <div
                className="w-full rounded-sm bg-accent"
                style={{ height: `${Math.max((n / maxDM) * 100, 4)}%` }}
              />
              <span className="text-[10px] text-muted">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded border border-border bg-surface p-4">
        <p className="text-sm font-semibold text-foreground">Actividad reciente</p>
        <div className="mt-3 space-y-2">
          {dashboardActivity.map(([user, automation, status, color]) => (
            <div
              key={user}
              className="flex items-center justify-between gap-3 border-b border-border py-2 text-sm last:border-0"
            >
              <span className="truncate text-foreground">{user}</span>
              <span className="hidden truncate text-muted sm:inline">
                {automation}
              </span>
              <span className={`shrink-0 text-sm ${color}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

/* ── Página ───────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] pb-20 text-[#1C1917] antialiased sm:pb-0">
      <DemoNotice variant="banner" />

      <header className="sticky top-0 z-40 border-b border-[#E7DFD3] bg-[#FAF7F2]/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2" aria-label="Comentio inicio">
            <span className="h-2.5 w-2.5 bg-accent" aria-hidden="true" />
            <span className="text-lg font-black tracking-[-0.02em] text-[#1C1917]">
              Comentio
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden text-sm font-semibold text-[#78706A] transition hover:text-[#1C1917] sm:inline-flex"
            >
              Entrar
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center bg-accent-hover px-4 py-2 text-sm font-bold text-white transition hover:bg-[#C2410C]"
            >
              Empezar gratis
            </Link>
          </div>
        </div>
      </header>

      {/* 1 · HERO — demo viva */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 pb-14 pt-10 sm:px-6 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:px-8 lg:pb-24">
        <div className="flex flex-col">
          <Eyebrow>Sin bots. API oficial de Instagram.</Eyebrow>

          <h1 className="mt-6 text-balance text-[clamp(2.6rem,9vw,5rem)] font-black leading-[1.02] tracking-[-0.02em] text-[#1C1917]">
            El reel que más vendió también fue tu peor noche
          </h1>

          <HeroPhone className="mt-8 lg:hidden" />

          <p className="mt-8 max-w-xl text-[1.125rem] leading-relaxed text-[#57504A]">
            Alguien comenta tu palabra clave y le llega tu DM con el link un
            segundo después. Solo, al instante, mientras tú haces otra cosa. En
            español y en pesos.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center bg-accent-hover px-6 py-3.5 text-base font-bold text-white transition hover:bg-[#C2410C]"
            >
              Empezar gratis
            </Link>
            <a
              href="#como"
              className="inline-flex items-center justify-center border border-[#D8CDBC] bg-transparent px-6 py-3.5 text-base font-bold text-[#1C1917] transition hover:bg-[#F2ECE3]"
            >
              Ver cómo se siente
            </a>
          </div>
          <p className="mt-3 text-sm text-[#78706A]">
            Gratis para empezar. Sin tarjeta.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[#E7DFD3] pt-8">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-[clamp(1.75rem,6vw,2.6rem)] font-medium leading-none tracking-tight text-[#1C1917]">
                  {stat.value}
                </dt>
                <dd className="mt-2 text-xs leading-5 text-[#78706A]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hidden lg:block">
          <HeroPhone />
        </div>
      </section>

      {/* 2 · EL DOLOR */}
      <section className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="reveal">
          <Eyebrow>El problema</Eyebrow>
          <h2 className="mt-4 text-[clamp(2rem,6vw,3.25rem)] font-black leading-[1.05] tracking-[-0.02em] text-[#1C1917]">
            Contestar a mano no escala. Tú lo sabes.
          </h2>
          <p className="mt-6 max-w-2xl text-[1.125rem] leading-relaxed text-[#57504A]">
            {dolorBody}
          </p>
        </div>
      </section>

      {/* 3 · EL GIRO */}
      <section className="mx-auto w-full max-w-3xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="reveal">
          <Eyebrow>El cambio</Eyebrow>
          <h2 className="mt-4 text-[clamp(2rem,6vw,3.25rem)] font-black leading-[1.05] tracking-[-0.02em] text-[#1C1917]">
            Y si cada comentario se contestara solo
          </h2>
          <p className="mt-6 max-w-2xl text-[1.125rem] leading-relaxed text-[#57504A]">
            {giroBody}
          </p>
          <p className="mt-6 text-xl font-black tracking-[-0.01em] text-accent-ink sm:text-2xl">
            {REFRAN}
          </p>
        </div>
      </section>

      {/* 4 · CÓMO FUNCIONA */}
      <section
        id="como"
        className="border-y border-[#E7DFD3] bg-[#F2ECE3]/60 py-16 sm:py-24"
      >
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <Eyebrow>Cómo funciona</Eyebrow>
            <h2 className="mt-4 text-[clamp(2rem,6vw,3.25rem)] font-black leading-[1.05] tracking-[-0.02em] text-[#1C1917]">
              Entra un comentario, sale un DM
            </h2>
          </div>

          <ol className="relative mt-10">
            <span
              className="absolute bottom-3 left-[11px] top-3 w-0.5 bg-[#D8CDBC]"
              aria-hidden="true"
            />
            {flowSteps.map((step) => (
              <li key={step.n} className="relative pb-10 pl-12 last:pb-0">
                <span className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center bg-accent-hover font-mono text-xs font-bold text-white">
                  {step.n}
                </span>
                <h3 className="text-xl font-black text-[#1C1917]">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-[#57504A]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · COMENTIO vs MANYCHAT */}
      <section className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="reveal max-w-3xl">
          <Eyebrow>Por qué no lo automatizaste antes</Eyebrow>
          <h2 className="mt-4 text-[clamp(2.25rem,7.5vw,4.25rem)] font-black leading-[1.02] tracking-[-0.025em] text-[#1C1917]">
            Lo bueno siempre está en inglés y en dólares. Esta vez no.
          </h2>
          <p className="mt-6 text-[1.125rem] leading-relaxed text-[#57504A]">
            {vsBody}
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2 lg:items-start">
          {/* ManyChat — apagada */}
          <div className="rounded-2xl border border-[#E7DFD3] bg-[#F2ECE3] p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-[#A89A8C]">
              ManyChat
            </p>
            <dl className="mt-3 divide-y divide-[#E0D7C9]">
              {compareRows.map((r) => (
                <div
                  key={r.k}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-[#A89A8C]">
                    {r.k}
                  </dt>
                  <dd className="text-right text-sm text-[#78706A]">{r.mc}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Comentio — tinta + naranja, elevada */}
          <div className="rounded-2xl border-2 border-accent bg-night p-6 text-on-night shadow-xl shadow-black/25 lg:-translate-y-3">
            <p className="text-sm font-bold uppercase tracking-wide text-accent">
              Comentio
            </p>
            <dl className="mt-3 divide-y divide-white/10">
              {compareRows.map((r) => (
                <div
                  key={r.k}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-on-night-muted">
                    {r.k}
                  </dt>
                  <dd className="flex items-center gap-2 text-right text-sm font-semibold text-on-night">
                    <Check className="h-3.5 w-3.5 shrink-0 text-support-live" />
                    {r.co}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Golpe del precio */}
        <div className="mt-6 flex flex-col gap-2 rounded-2xl bg-accent-tint px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[#8a5a3a] line-through decoration-2">
            ManyChat: ~$340 al mes solo para arrancar
          </p>
          <p className="font-mono text-2xl font-bold tracking-tight text-accent-ink sm:text-3xl">
            Comentio: $0 para empezar
          </p>
        </div>

        <blockquote className="mt-8 border-l-2 border-accent pl-5 text-xl font-black leading-snug tracking-[-0.01em] text-[#1C1917] sm:text-2xl">
          {vsClose}
        </blockquote>
      </section>

      {/* 6 · CONFIANZA / EL PANEL — única banda espresso */}
      <section className="bg-night text-on-night">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <div className="reveal">
            <Eyebrow onDark>Sin caja negra</Eyebrow>
            <h2 className="mt-4 text-[clamp(2rem,6vw,3.25rem)] font-black leading-[1.05] tracking-[-0.02em] text-on-night">
              Ves exactamente qué pasó con cada DM
            </h2>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-on-night-muted">
              {trustBody}
            </p>

            <ul className="mt-7 space-y-3">
              {trustBullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-on-night">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-support-live" />
                  {b}
                </li>
              ))}
            </ul>

            <p className="mt-7 max-w-md text-xs leading-5 text-on-night-muted">
              {archLine}
            </p>
          </div>

          <div>
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* 7 · PRECIOS */}
      <section
        id="precios"
        className="bg-accent-tint py-16 sm:py-24"
      >
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="reveal max-w-2xl">
            <Eyebrow>Precios</Eyebrow>
            <h2 className="mt-4 text-[clamp(2rem,6vw,3.25rem)] font-black leading-[1.05] tracking-[-0.02em] text-[#1C1917]">
              En pesos, sin dólares raros en tu estado de cuenta
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl bg-[#FAF7F2] p-6 ${
                  plan.popular
                    ? "border-2 border-accent shadow-lg shadow-orange-900/5 sm:-translate-y-3"
                    : "border border-[#E7DFD3]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 bg-accent-hover px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    Popular
                  </span>
                )}
                <p className="text-sm font-bold uppercase tracking-wide text-accent-ink">
                  {plan.name}
                </p>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-medium tracking-tight text-[#1C1917]">
                    {plan.price}
                  </span>
                  {plan.cadence && (
                    <span className="font-mono text-sm text-[#78706A]">
                      {plan.cadence}
                    </span>
                  )}
                </p>
                <p className="mt-2 text-sm text-[#57504A]">{plan.tagline}</p>
                <ul className="mt-5 space-y-2.5 border-t border-[#E7DFD3] pt-5">
                  {plan.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-[#1C1917]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-support" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`mt-6 inline-flex items-center justify-center px-5 py-3 text-sm font-bold transition ${
                    plan.popular
                      ? "bg-accent-hover text-white hover:bg-[#C2410C]"
                      : "border border-[#D8CDBC] text-[#1C1917] hover:bg-[#F2ECE3]"
                  }`}
                >
                  Empezar gratis
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-[#57504A]">
            Empiezas gratis. Subes de plan cuando ya te esté trayendo ventas.
          </p>
        </div>
      </section>

      {/* 8 · FAQ */}
      <section className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="reveal">
          <Eyebrow>Lo que te preguntas</Eyebrow>
          <h2 className="mt-4 text-[clamp(2rem,6vw,3.25rem)] font-black leading-[1.05] tracking-[-0.02em] text-[#1C1917]">
            Tres dudas, tres respuestas
          </h2>
        </div>

        <div className="mt-8 border-t border-[#E7DFD3]">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-[#E7DFD3] py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-[#1C1917] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="font-mono text-xl leading-none text-accent-ink transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[#57504A] leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 9 · CTA final */}
      <section className="mx-auto w-full max-w-5xl px-5 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E7DFD3] bg-[#F2ECE3] p-8 sm:p-12">
          <Eyebrow>Empieza hoy</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-[clamp(2rem,6vw,3.5rem)] font-black leading-[1.03] tracking-[-0.02em] text-[#1C1917]">
            Tu próximo reel ya puede trabajar para ti
          </h2>
          <p className="mt-5 max-w-xl text-[1.125rem] leading-relaxed text-[#57504A]">
            Conéctalo hoy y el siguiente post que subas ya contesta sus propios
            DMs. Gratis para empezar, en pesos.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center bg-accent-hover px-7 py-3.5 text-base font-bold text-white transition hover:bg-[#C2410C]"
            >
              Empezar gratis
            </Link>
            <span className="font-mono text-sm font-medium uppercase tracking-wide text-accent-ink">
              {REFRAN}
            </span>
          </div>
        </div>
      </section>

      {/* 10 · Footer */}
      <footer className="bg-night">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-8 pb-28 text-sm text-on-night-muted sm:px-6 sm:pb-8 lg:px-8">
          <span className="font-black tracking-[-0.02em] text-on-night">
            Comentio
          </span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition hover:text-on-night">
              Privacidad
            </Link>
            <Link href="/terms" className="transition hover:text-on-night">
              Términos
            </Link>
          </div>
        </div>
      </footer>

      {/* CTA fijo inferior — solo móvil */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-accent-hover sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <Link
          href="/login"
          className="flex flex-col items-center justify-center py-3 text-white"
        >
          <span className="text-base font-bold">Empezar gratis</span>
          <span className="text-[11px] font-medium text-white/85">Sin tarjeta</span>
        </Link>
      </div>
    </main>
  );
}
