import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { DemoNotice } from "@/components/demo-notice";

export const metadata: Metadata = {
  title: "Comentio - Comentarios de Instagram a DM automático",
  description:
    "Cuando alguien comenta tu palabra clave en un post o reel, le llega tu DM un segundo después. Con la API oficial de Instagram, en español y hosteado por nosotros.",
};

const heroStats = [
  { value: "24/7", label: "Monitoreo de comentarios" },
  { value: "1", label: "DM por comentario que coincide" },
  { value: "0", label: "Scraping o bots" },
];

const flowSteps = [
  {
    eyebrow: "Conecta",
    title: "Conecta tu cuenta profesional de Instagram",
    description:
      "Entras con tu correo y conectas Instagram una vez. Sin compartir contraseñas, sin automatizar el navegador.",
  },
  {
    eyebrow: "Arma",
    title: "Elige un post, las palabras clave y el DM",
    description:
      "Creas una campaña para un reel o post: la palabra que se vigila, la respuesta pública y el DM que se envía.",
  },
  {
    eyebrow: "Entrega",
    title: "Los DMs salen por la API oficial",
    description:
      "Los webhooks captan los comentarios al instante y un barrido recoge los que Instagram nunca avisa, para que no se pierda ninguno. Cada envío va en cola, con límite de ritmo y registrado.",
  },
];

const features = [
  "Acceso por enlace mágico al correo",
  "Varias cuentas de Instagram",
  "Tokens cifrados en reposo",
  "Webhook y barrido de reconciliación",
  "Envío con cola de trabajo",
  "Límite de ritmo por cuenta",
  "Enlaces rastreados con clics",
  "Registro de DMs con estado completo",
  "En español y hosteado por nosotros",
];

/* Copias estáticas y fieles de las pantallas reales de Resumen y Panel, hechas
   con los mismos tokens de diseño de la app, para que lo que ve el visitante sea
   igual a lo que se ve dentro. */

function AppWindow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background shadow-2xl shadow-black/50">
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
    <div className="rounded border border-border bg-surface p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

const overviewStats = [
  ["Vistas", "847.2K"],
  ["Alcance", "612.4K"],
  ["Me gusta", "38.1K"],
  ["Comentarios", "4,204"],
  ["Guardados", "9,712"],
  ["Compartidos", "2,340"],
];

const overviewPosts = [
  ["Reel del drop", "214.8K", "9.1K", "3 abr"],
  ["Haul de restock", "88.4K", "5.2K", "28 mar"],
  ["Detrás del estudio", "51.3K", "3.4K", "21 mar"],
];

function OverviewPreview() {
  return (
    <AppWindow label="app / resumen">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">Resumen</h3>
          <p className="mt-1 text-xs text-muted">
            Reciente, 24 posts de @studio.store
          </p>
        </div>
        <span className="rounded border border-border px-2 py-1 text-xs text-muted">
          Últimos 50
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {overviewStats.map(([label, value]) => (
          <Stat key={label} label={label} value={value} />
        ))}
      </div>

      <div className="mt-4 rounded border border-border bg-surface p-4">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold text-foreground">
            Seguidores en el tiempo
          </p>
          <p className="text-xs text-muted">
            48,210 <span className="text-success">+1,240</span> · 30d
          </p>
        </div>
        <svg
          viewBox="0 0 300 64"
          preserveAspectRatio="none"
          className="mt-3 h-16 w-full"
          aria-hidden="true"
        >
          <polyline
            points="0,54 43,49 86,51 129,40 171,36 214,26 257,20 300,9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="text-accent"
          />
        </svg>
      </div>

      <div className="mt-4 rounded border border-border bg-surface p-4">
        <p className="text-sm font-semibold text-foreground">Posts</p>
        <table className="mt-3 w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-zinc-500">
              <th className="pb-2 pr-3 font-medium">Post</th>
              <th className="pb-2 px-3 text-right font-medium">Vistas</th>
              <th className="pb-2 px-3 text-right font-medium">Me gusta</th>
              <th className="pb-2 pl-3 text-right font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {overviewPosts.map(([post, views, likes, date]) => (
              <tr key={post} className="border-b border-border last:border-0">
                <td className="py-2 pr-3 text-foreground">{post}</td>
                <td className="py-2 px-3 text-right text-muted">{views}</td>
                <td className="py-2 px-3 text-right text-muted">{likes}</td>
                <td className="py-2 pl-3 text-right text-zinc-500">{date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppWindow>
  );
}

function MatchedCommentCard() {
  return (
    <div className="w-64 rounded-lg border border-border bg-surface p-4 shadow-2xl shadow-black/50">
      <p className="text-xs text-muted">Nuevo comentario</p>
      <p className="mt-1 text-sm font-semibold text-foreground">@maya.co</p>
      <p className="mt-1 text-sm text-muted">LINK porfa</p>
      <div className="mt-3 border-t border-border pt-3">
        <p className="text-xs text-muted">
          Coincidió <span className="text-accent">GUIA</span>
        </p>
        <p className="mt-1 text-sm font-medium text-success">
          DM en cola
        </p>
      </div>
    </div>
  );
}

const dashboardStats = [
  ["Campañas activas", "8"],
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

const dashboardActivity = [
  ["@maya.co", "Respuesta con la guía", "Enviado", "text-success"],
  ["@founder.ray", "Pedido de precio", "Enviado", "text-success"],
  ["@shop.ava", "Imán de leads", "En cola", "text-warning"],
];

function DashboardPreview() {
  const maxDM = Math.max(...dashboardChart.map(([, n]) => n));
  return (
    <AppWindow label="app / panel">
      <h3 className="text-base font-semibold text-foreground">¡Hola, Maya!</h3>
      <p className="mt-1 text-xs text-muted">2 cuentas conectadas · 340 contactos</p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {dashboardStats.map(([label, value]) => (
          <Stat key={label} label={label} value={value} />
        ))}
      </div>

      <div className="mt-4 rounded border border-border bg-surface p-4">
        <p className="text-sm font-semibold text-foreground">DMs, últimos 7 días</p>
        <div className="mt-4 flex h-32 items-end gap-2">
          {dashboardChart.map(([day, n]) => (
            <div key={day} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-[10px] text-muted">{n}</span>
              <div
                className="w-full rounded-sm bg-accent"
                style={{ height: `${Math.max((n / maxDM) * 100, 4)}%` }}
              />
              <span className="text-[10px] text-zinc-500">{day}</span>
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
              <span className="truncate text-muted">{automation}</span>
              <span className={`text-sm ${color}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <DemoNotice variant="banner" />

      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Comentio inicio">
            <span className="text-lg font-bold text-zinc-900">Comentio</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden text-sm font-semibold text-zinc-600 transition hover:text-zinc-900 sm:inline-flex"
            >
              Entrar
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Empezar gratis
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-12 sm:px-6 sm:pt-18 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-600">
            API oficial de Meta
          </div>

          <h1 className="mt-7 text-balance text-5xl font-black leading-[1.02] text-zinc-900 sm:text-6xl lg:text-7xl">
            Cada comentario abre el DM correcto
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Cuando alguien comenta tu palabra clave en un post o reel, recibe tu
            DM un segundo después. Con la API oficial de Instagram, sin compartir
            contraseñas ni bots que scrapeen. Tú publicas, Comentio contesta.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Empezar gratis
            </Link>
            <a
              href="#how"
              className="inline-flex items-center justify-center border border-zinc-200 bg-white px-6 py-3 text-sm font-bold text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-100"
            >
              Ver cómo funciona
            </a>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="border border-zinc-200 bg-zinc-50 p-4">
                <dt className="text-2xl font-black text-zinc-900">{stat.value}</dt>
                <dd className="mt-1 text-xs leading-5 text-zinc-500">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <OverviewPreview />
          <div className="absolute -bottom-8 -left-6 hidden lg:block">
            <MatchedCommentCard />
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-orange-600">Cómo funciona</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-zinc-900 sm:text-5xl">
              Entra un comentario, sale un DM
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-600">
              Tres pasos. Conectas una cuenta, armas una campaña y la dejas
              correr. El webhook lo resuelve en vivo y el barrido recoge lo que el
              webhook no alcanza.
            </p>
          </div>

          <div className="grid gap-4">
            {flowSteps.map((step) => (
              <article
                key={step.title}
                className="grid gap-4 border border-zinc-200 bg-zinc-50 p-5 sm:grid-cols-[120px_1fr]"
              >
                <p className="text-sm font-bold text-orange-600">{step.eyebrow}</p>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:items-center">
          <DashboardPreview />

          <div>
            <p className="text-sm font-bold uppercase text-orange-600">El panel</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-zinc-900 sm:text-5xl">
              Mira exactamente qué pasó
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-600">
              Cada comentario es rastreable: en cola, coincidió, enviado, omitido,
              fallido o limitado. Sin caja negra.
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase text-orange-600">Qué incluye</p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-zinc-900 sm:text-5xl">
            Todo listo, sin que instales nada
          </h2>
          <p className="mt-5 text-base leading-8 text-zinc-600">
            Nosotros lo hospedamos, tú lo usas. Sin servidores que configurar, sin
            código, sin dolores de cabeza técnicos. Entras y lo prendes.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature}
              className="border border-zinc-200 bg-zinc-50 p-4 text-sm font-semibold text-zinc-700"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 border border-orange-200 bg-orange-50 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="max-w-3xl text-4xl font-black leading-tight text-zinc-900 sm:text-5xl">
              Convierte los comentarios de tu próximo reel en DMs
            </h2>
            <p className="mt-4 text-base text-zinc-600">
              Empieza gratis, sin tarjeta. Cuando crezcas, planes desde $199 MXN
              al mes con DMs ilimitados.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Empezar gratis
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 py-8">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 text-sm text-zinc-500 sm:px-6 lg:px-8">
          <span className="font-semibold text-zinc-600">Comentio</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition hover:text-zinc-900">
              Privacidad
            </Link>
            <Link href="/terms" className="transition hover:text-zinc-900">
              Términos
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
