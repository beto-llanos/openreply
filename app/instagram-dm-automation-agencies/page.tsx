import type { Metadata } from "next";
import SeoPageShell from "@/components/seo-page-shell";
import { agenciesSeoPage } from "@/lib/seo-pages";

export const metadata: Metadata = {
  title: "Automatización de DM de Instagram para agencias",
  description:
    "Automatización de DM de Instagram para agencias con espacios de trabajo de múltiples cuentas, campañas de comentario a DM, enlaces rastreados y reportes para clientes que puedes compartir.",
  alternates: { canonical: "/instagram-dm-automation-agencies" },
  openGraph: {
    title: "Automatización de DM de Instagram para agencias",
    description:
      "Administra las campañas de comentario a DM de Instagram de tus clientes con los espacios de trabajo de agencia de Comentio.",
    url: "/instagram-dm-automation-agencies",
  },
};

export default function InstagramDmAutomationAgenciesPage() {
  return <SeoPageShell config={agenciesSeoPage} />;
}

