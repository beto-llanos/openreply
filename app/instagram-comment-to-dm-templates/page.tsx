import type { Metadata } from "next";
import SeoPageShell from "@/components/seo-page-shell";
import { templatesSeoPage } from "@/lib/seo-pages";

export const metadata: Metadata = {
  title: "Plantillas de comentario a DM de Instagram para campañas",
  description:
    "Explora plantillas de comentario a DM de Instagram para lead magnets, enlaces de producto, respuestas de precio, listas de espera de lanzamiento, creadores y agencias.",
  alternates: { canonical: "/instagram-comment-to-dm-templates" },
  openGraph: {
    title: "Plantillas de comentario a DM de Instagram para campañas",
    description:
      "Empieza con las plantillas de Comentio para comentarios de alta intención con palabras clave de Instagram y respuestas privadas.",
    url: "/instagram-comment-to-dm-templates",
  },
};

export default function InstagramCommentToDmTemplatesPage() {
  return <SeoPageShell config={templatesSeoPage} />;
}

