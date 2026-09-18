import type { SeoPageConfig } from "@/components/seo-page-shell";

const templateLinks = [
  { label: "Plantilla de enlace de producto DTC", href: "/templates/dtc-product-link" },
  { label: "Plantilla de formulario de leads inmobiliarios", href: "/templates/real-estate-lead-form" },
  { label: "Plantilla de plan fitness", href: "/templates/fitness-plan" },
  { label: "Ver todas las plantillas", href: "/templates" },
];

export const manychatAlternativePage: SeoPageConfig = {
  eyebrow: "Alternativa a Manychat",
  title: "Una alternativa a Manychat enfocada en campañas de comentario a DM de Instagram",
  description:
    "Comentio es para equipos que no necesitan un constructor de chatbots amplio. Convierte los comentarios con palabras clave en respuestas privadas conformes con Meta, enlaces rastreados, analítica de campañas y reportes para clientes.",
  primaryCta: "Prueba la alternativa enfocada",
  bullets: [
    "Hecho en torno a los comentarios, publicaciones, reels y respuestas privadas de Instagram.",
    "Flujo con la API oficial de Meta, sin scraping ni compartir contraseñas.",
    "Plantillas de campaña, enlaces rastreados y reportes para clientes que puedes compartir.",
    "Servicio hosteado y confiable para agencias: Comentio se encarga de toda la operación, tú solo lo usas.",
  ],
  sections: [
    {
      title: "Más acotado por diseño",
      body: "Las suites de automatización amplias pueden ser potentes, pero también agregan el peso de un constructor de flujos. Comentio mantiene el camino de la campaña simple: palabra clave, publicación, respuesta, enlace, resultado.",
    },
    {
      title: "Prueba para agencias",
      body: "Los enlaces rastreados y los reportes que puedes compartir facilitan mostrarle al cliente qué pasó después del comentario, no solo que se envió un mensaje.",
    },
    {
      title: "Entrega con Meta primero",
      body: "Los eventos de comentarios se procesan por webhooks, se ponen en cola, se deduplican, se validan contra los límites y se envían como respuestas privadas usando el ID del comentario.",
    },
  ],
  comparisonTitle: "Comentio vs constructores de chatbots amplios",
  comparisons: [
    {
      label: "Configuración",
      ours: "Crea una campaña de palabra clave para una publicación o reel específico.",
      other: "Construye y mantiene un flujo de automatización de chatbot más grande.",
    },
    {
      label: "Reportes",
      ours: "Envíos, omisiones, fallas, clics, CTR y enlaces de reporte para clientes a nivel de campaña.",
      other: "Normalmente analítica de conversaciones más amplia que hay que depurar para reportar al cliente.",
    },
    {
      label: "Posicionamiento",
      ours: "Sistema de campañas de Instagram para agencias y equipos de campaña.",
      other: "Automatización de DM general en muchos canales y casos de uso.",
    },
  ],
  templateLinks,
  faqs: [
    {
      title: "¿Comentio reemplaza por completo a Manychat?",
      body: "No. Comentio se enfoca a propósito en campañas de comentario a DM de Instagram. Si necesitas una suite completa de chatbots, usa una plataforma amplia. Si necesitas ciclos de campaña rápidos, Comentio está hecho para eso.",
    },
    {
      title: "¿Sirve para agencias?",
      body: "Sí. Soporta múltiples cuentas de Instagram, miembros del espacio de trabajo, filtros por cuenta, analítica y reportes que puedes compartir, sin límite de cuentas.",
    },
  ],
};

export const templatesSeoPage: SeoPageConfig = {
  eyebrow: "Plantillas de comentario a DM de Instagram",
  title: "Plantillas de comentario a DM de Instagram para respuestas de campaña de alta intención",
  description:
    "Empieza con patrones de campaña probados para enlaces de producto, lead magnets, respuestas de precio, listas de espera de lanzamiento, ofertas de coaching, eventos y servicios locales.",
  primaryCta: "Usa una plantilla",
  bullets: [
    "La intención de la plantilla se conserva al registrarte y crear la campaña.",
    "Cada plantilla incluye palabras clave, un objetivo de campaña y el texto de la respuesta.",
    "Los enlaces rastreados convierten las respuestas de la plantilla en clics medibles.",
    "Las agencias pueden reutilizar las plantillas en las cuentas de sus clientes.",
  ],
  sections: [
    {
      title: "Envíos de enlaces de producto",
      body: "Usa comentarios como LINK, SHOP, BUY o SIZE para enviar páginas de producto exactas, paquetes de lanzamiento o enlaces de colección.",
    },
    {
      title: "Lead magnets",
      body: "Usa comentarios como GUIDE, CHECKLIST, PLAN o START para enviar recursos gratuitos y ofertas de seguimiento.",
    },
    {
      title: "Servicios locales",
      body: "Usa comentarios como PRICE, BOOK, INFO o TOUR para entregar enlaces de reserva, formularios de cotización y páginas de ofertas locales.",
    },
  ],
  comparisonTitle: "Campañas con plantilla vs respuestas manuales en la bandeja",
  comparisons: [
    {
      label: "Velocidad",
      ours: "Lanza desde plantillas de campaña reutilizables en minutos.",
      other: "Responde manualmente o reconstruye el mismo texto de campaña cada vez.",
    },
    {
      label: "Medición",
      ours: "Usa enlaces rastreados y analítica de palabras clave por campaña.",
      other: "Depende de capturas de pantalla, la memoria de la bandeja o datos de enlaces dispersos.",
    },
    {
      label: "Reutilización",
      ours: "Clona el mismo playbook en publicaciones, reels y cuentas de clientes.",
      other: "Repite el trabajo de configuración para cada campaña.",
    },
  ],
  templateLinks,
  faqs: [
    {
      title: "¿Puedo editar el texto de la plantilla?",
      body: "Sí. Las plantillas son puntos de partida. Puedes cambiar las palabras clave, el texto de la respuesta privada, las URL de destino rastreadas y el estado activo antes de lanzar.",
    },
    {
      title: "¿Las plantillas funcionan para reels?",
      body: "Sí. Las campañas pueden apuntar a publicaciones o reels de Instagram que devuelve la cuenta profesional conectada.",
    },
  ],
};

export const agenciesSeoPage: SeoPageConfig = {
  eyebrow: "Automatización de DM de Instagram para agencias",
  title: "Automatización de DM de Instagram para agencias que administran campañas de clientes",
  description:
    "Comentio les da a las agencias espacios de trabajo con múltiples cuentas, reportes listos para el cliente, enlaces rastreados y un flujo de comentario a DM enfocado para campañas de Instagram repetibles.",
  primaryCta: "Crea un espacio de trabajo de agencia",
  bullets: [
    "Conecta múltiples cuentas de Instagram de clientes en el plan Agencia.",
    "Filtra tableros, registros, campañas y configuración por cuenta.",
    "Invita a tu equipo como propietarios, administradores o miembros.",
    "Comparte con los clientes reportes de solo lectura sin exponer los controles del espacio de trabajo.",
  ],
  sections: [
    {
      title: "Separación de clientes",
      body: "Los filtros por cuenta mantienen más ordenada la creación de campañas, los registros y los reportes cuando un espacio de trabajo administra varias marcas.",
    },
    {
      title: "Ofertas repetibles",
      body: "Usa plantillas para empaquetar lead magnets, lanzamientos de producto, respuestas de precio y listas de espera como servicios de agencia repetibles.",
    },
    {
      title: "Prueba de trabajo",
      body: "Los reportes que puedes compartir muestran envíos, omisiones, fallas, clics, CTR, palabras clave principales y enlaces rastreados en una vista segura para el cliente.",
    },
  ],
  comparisonTitle: "Flujo de agencia vs automatización genérica",
  comparisons: [
    {
      label: "Reportes para clientes",
      ours: "Enlaces públicos de reporte de campaña de solo lectura, sin marca y sin restricción por plan.",
      other: "Capturas manuales o tableros que exponen demasiado contexto interno del espacio de trabajo.",
    },
    {
      label: "Roles del equipo",
      ours: "Roles de propietario, administrador y miembro con enlaces de invitación.",
      other: "A menudo un solo inicio de sesión compartido o accesos de equipo con demasiados permisos.",
    },
    {
      label: "Operaciones por cuenta",
      ours: "Filtros por cuenta para campañas, registros, estadísticas del tablero y configuración.",
      other: "El trabajo de los clientes se puede mezclar en espacios de automatización amplios.",
    },
  ],
  templateLinks,
  faqs: [
    {
      title: "¿Cuántas cuentas de Instagram pueden conectar las agencias?",
      body: "El plan Agencia está pensado para hasta 10 cuentas profesionales de Instagram conectadas en el empaquetado de lanzamiento actual.",
    },
    {
      title: "¿Los clientes pueden ver los reportes sin iniciar sesión?",
      body: "Sí. Las páginas de reporte que puedes compartir son enlaces públicos de solo lectura que ocultan los controles privados del espacio de trabajo y el texto de los DM.",
    },
  ],
};

export const commentLinkSeoPage: SeoPageConfig = {
  eyebrow: "Automatización de comentario LINK",
  title: "Automatización de comentario LINK para publicaciones y reels de Instagram",
  description:
    "Deja que tus seguidores comenten LINK, SHOP, GUIDE o cualquier palabra clave y reciban la respuesta privada correcta con una URL de destino rastreada.",
  primaryCta: "Automatiza el comentario LINK",
  bullets: [
    "Coincide con palabras clave exactas o frases de palabra completa.",
    "Envía respuestas privadas conformes con Meta desde el comentario que las activó.",
    "Inserta enlaces rastreados en las respuestas con analítica de clics.",
    "Deduplica los trabajos de comentarios y registra los resultados enviados, omitidos y fallidos.",
  ],
  sections: [
    {
      title: "Para enlaces de producto",
      body: "Convierte los comentarios LINK de alta intención en visitas rastreadas a páginas de producto, landing pages, listas de espera u ofertas de checkout.",
    },
    {
      title: "Para ofertas de creadores",
      body: "Envía guías, recursos gratuitos, enlaces de cursos y solicitudes de coaching sin vigilar la bandeja manualmente.",
    },
    {
      title: "Para picos de lanzamiento",
      body: "Pon en cola y procesa las respuestas de campaña mientras un reel recibe atención, con validaciones de plan y de límite de tasa en el worker.",
    },
  ],
  comparisonTitle: "Automatización de comentario LINK vs respuestas manuales con enlace",
  comparisons: [
    {
      label: "Precisión de la respuesta",
      ours: "Cada comentario que coincide recibe la respuesta de campaña ligada a esa publicación o reel.",
      other: "Las respuestas manuales se pasan por alto fácilmente cuando los comentarios se disparan.",
    },
    {
      label: "Rastreo",
      ours: "Los enlaces rastreados conectan las respuestas privadas con los resultados de clics.",
      other: "Los enlaces pegados normales rara vez muestran el desempeño a nivel de campaña.",
    },
    {
      label: "Cumplimiento",
      ours: "Construido en torno a la semántica oficial de respuestas privadas y colas que respetan los límites de tasa.",
      other: "La automatización de navegador insegura o el scraping pueden poner las cuentas en riesgo.",
    },
  ],
  templateLinks,
  faqs: [
    {
      title: "¿Puedo usar palabras clave distintas de LINK?",
      body: "Sí. Cada campaña puede usar varias palabras clave como PRICE, SHOP, GUIDE, PLAN, WAITLIST, TOUR o tu propia frase.",
    },
    {
      title: "¿Comentio envía un DM normal de Instagram?",
      body: "Envía una respuesta privada conforme con Meta, activada por el evento del comentario, usando el ID del comentario de Instagram.",
    },
  ],
};
