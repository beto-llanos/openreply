import type { Metadata } from "next";
import SeoPageShell from "@/components/seo-page-shell";
import { commentLinkSeoPage } from "@/lib/seo-pages";

export const metadata: Metadata = {
  title: "Automatización de comentario LINK para Instagram",
  description:
    "Automatiza las respuestas de comentario LINK de Instagram con coincidencia de palabras clave, respuestas privadas conformes con Meta, enlaces rastreados y analítica de campañas.",
  alternates: { canonical: "/comment-link-automation" },
  openGraph: {
    title: "Automatización de comentario LINK para Instagram",
    description:
      "Convierte los comentarios LINK, SHOP, GUIDE y PRICE en respuestas privadas rastreadas con Comentio.",
    url: "/comment-link-automation",
  },
};

export default function CommentLinkAutomationPage() {
  return <SeoPageShell config={commentLinkSeoPage} />;
}

