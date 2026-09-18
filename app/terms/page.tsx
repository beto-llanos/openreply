import type { Metadata } from "next";
import LegalShell from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Términos de Servicio - Comentio",
  description:
    "Términos para usar el software de campañas de comentario a DM de Instagram de Comentio.",
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Términos de Servicio"
      description="Estos términos definen el uso aceptable del servicio hosteado de campañas de comentario a DM de Instagram de Comentio."
      updatedAt="24 de mayo de 2026"
    >
      <section>
        <h2 className="text-xl font-bold text-white">Uso autorizado</h2>
        <p className="mt-3">
          Puedes usar Comentio solo con cuentas profesionales de Instagram que
          poseas o estés autorizado a administrar. Eres responsable de las
          campañas, palabras clave, enlaces y mensajes que configures.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Cumplimiento de la plataforma</h2>
        <p className="mt-3">
          Aceptas seguir los Términos de la Plataforma de Meta, las políticas de
          Instagram, las reglas de mensajería aplicables, las leyes de
          privacidad, las reglas de publicidad y las leyes antispam. Comentio
          puede limitar la tasa, pausar o desactivar las campañas que generen
          riesgo de cumplimiento, abuso, seguridad o entregabilidad.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Disponibilidad</h2>
        <p className="mt-3">
          Comentio depende de plataformas de terceros, incluidos Meta, correo,
          hosting, base de datos y proveedores de cola. Trabajamos para operar
          el servicio de forma confiable, pero no se garantiza la disponibilidad
          ininterrumpida.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Servicio de pago</h2>
        <p className="mt-3">
          Comentio es un servicio SaaS de pago y hosteado. La infraestructura,
          el soporte, los flujos para agencias, la analítica y los reportes son
          parte del servicio: Comentio se encarga de toda la operación, tú solo
          lo usas.
        </p>
      </section>
    </LegalShell>
  );
}
