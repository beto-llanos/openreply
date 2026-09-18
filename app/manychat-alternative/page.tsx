import type { Metadata } from "next";
import SeoPageShell from "@/components/seo-page-shell";
import { manychatAlternativePage } from "@/lib/seo-pages";

export const metadata: Metadata = {
  title: "Alternativa a Manychat para campañas de comentario a DM de Instagram",
  description:
    "Una alternativa a Manychat enfocada en comentarios con palabras clave de Instagram, respuestas privadas, enlaces rastreados, analítica y reportes para clientes de agencia.",
  alternates: { canonical: "/manychat-alternative" },
  openGraph: {
    title: "Alternativa a Manychat para campañas de comentario a DM de Instagram",
    description:
      "Usa Comentio para campañas de comentario a DM de Instagram enfocadas, sin un constructor de flujos de chatbot amplio.",
    url: "/manychat-alternative",
  },
};

export default function ManychatAlternativePage() {
  return <SeoPageShell config={manychatAlternativePage} />;
}

