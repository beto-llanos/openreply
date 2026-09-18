import type { Metadata } from "next";
import LegalShell from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Política de Privacidad - Comentio",
  description:
    "Cómo Comentio maneja los datos de las cuentas de Instagram, los payloads de webhooks, los datos de facturación y la información de las campañas de los clientes.",
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Política de Privacidad"
      description="Comentio ayuda a las empresas a enviar respuestas privadas conformes con Meta cuando alguien comenta en publicaciones o reels de Instagram conectados."
      updatedAt="24 de mayo de 2026"
    >
      <section>
        <h2 className="text-xl font-bold text-white">Datos que recopilamos</h2>
        <p className="mt-3">
          Recopilamos los correos de las cuentas para autenticación, los
          metadatos de espacio de trabajo y facturación, los identificadores de
          las cuentas de Instagram conectadas, los tokens de acceso de Instagram
          cifrados, la configuración de las campañas, los payloads de webhooks,
          los comentarios necesarios para procesar las campañas, los registros
          de envío y los diagnósticos operativos.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Cómo usamos los datos</h2>
        <p className="mt-3">
          Usamos estos datos para autenticar a los usuarios, conectar las
          integraciones de Instagram, coincidir las palabras clave de los
          comentarios, enviar respuestas privadas a través de las APIs oficiales
          de Meta, evitar envíos duplicados, resolver fallas y proteger el
          servicio.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Datos de Instagram y Meta</h2>
        <p className="mt-3">
          Comentio no pide contraseñas de Instagram, no hace scraping de
          Instagram ni usa automatización de navegador. Los tokens de Instagram
          se cifran en reposo y se usan solo para realizar acciones autorizadas
          por la cuenta de empresa conectada.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Subprocesadores</h2>
        <p className="mt-3">
          El servicio en producción puede usar proveedores de hosting, base de
          datos, cola de Redis, correo y observabilidad, como Vercel, Railway,
          PostgreSQL, Redis y Resend. Estos proveedores procesan los datos solo
          en la medida necesaria para operar el servicio.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Retención y eliminación</h2>
        <p className="mt-3">
          Los clientes pueden desconectar Instagram desde la configuración, lo
          que elimina la conexión de Instagram guardada y detiene las campañas.
          Para eliminar la cuenta o los datos, sigue la página de Eliminación de
          Datos enlazada en el pie de página.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Contacto</h2>
        <p className="mt-3">
          Para preguntas sobre privacidad, escríbenos a hola@comentio.app.
        </p>
      </section>
    </LegalShell>
  );
}
