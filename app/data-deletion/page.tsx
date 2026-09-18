import type { Metadata } from "next";
import LegalShell from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Eliminación de Datos - Comentio",
  description:
    "Cómo los clientes de Comentio pueden desconectar Instagram y solicitar la eliminación de los datos de su cuenta o campañas.",
};

export default function DataDeletionPage() {
  return (
    <LegalShell
      title="Eliminación de Datos"
      description="Usa esta página para la Revisión de App de Meta y para las solicitudes de clientes sobre cómo eliminar los datos de cuenta, espacio de trabajo, Instagram y campañas de Comentio."
      updatedAt="24 de mayo de 2026"
    >
      <section>
        <h2 className="text-xl font-bold text-white">Desconectar Instagram</h2>
        <p className="mt-3">
          Inicia sesión, abre Configuración y selecciona Desconectar. Esto
          elimina el token de conexión de Instagram guardado y detiene el envío
          de respuestas privadas de las campañas de ese espacio de trabajo.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Eliminar los datos del espacio de trabajo</h2>
        <p className="mt-3">
          Para eliminar los datos de espacio de trabajo, campañas, registros,
          webhooks, referencias de facturación y diagnósticos operativos,
          escribe a hola@comentio.app desde el correo que usaste para iniciar
          sesión. Incluye el nombre del espacio de trabajo y el usuario de
          Instagram conectado a ese espacio.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">Verificación</h2>
        <p className="mt-3">
          Podemos pedirte que verifiques el control del correo o de la cuenta de
          empresa conectada antes de eliminar los datos. Las solicitudes de
          eliminación se procesan tan rápido como sea posible, salvo que la
          retención sea requerida por razones legales, de facturación, de
          prevención de fraude o de seguridad.
        </p>
      </section>
    </LegalShell>
  );
}
