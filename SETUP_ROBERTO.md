# OpenReply: lo que te toca hacer en el navegador

Todo el sistema ya está desplegado en Railway y funcionando (web, worker, cron, Postgres, Redis). Solo faltan 4 llaves que únicamente tú puedes generar: 3 de Meta y 1 de Resend. Este doc es el paso a paso exacto. Al final está la lista de valores que me pegas en la terminal.

Datos fijos que vas a necesitar (ya están configurados del lado del servidor):

| Cosa | Valor |
| --- | --- |
| URL pública de la app | `https://web-production-69bfc.up.railway.app` |
| URL del webhook (para Meta) | `https://web-production-69bfc.up.railway.app/api/webhook` |
| Verify token del webhook (para Meta) | `3587444711743949143f44f7be2c14b6` |
| OAuth redirect URI (para Meta) | `https://web-production-69bfc.up.railway.app/api/instagram/callback` |

Nota importante: tu cuenta tiene los DMs restringidos hasta el 17 de septiembre. Puedes hacer TODOS los pasos de este doc desde ya (crear la app, llaves, webhook), pero no actives ninguna campaña ni conectes la cuenta para mandar DMs hasta después de esa fecha.

---

## Paso 1: Convertir @_beto.llanos_ a cuenta profesional (si no lo es ya)

Una cuenta personal de Instagram no se puede conectar. Necesitas Creator o Business.

1. Abre Instagram (la app del celular es lo más fácil) con @_beto.llanos_.
2. Tu perfil, menú de arriba a la derecha, "Configuración y actividad".
3. Busca "Tipo de cuenta y herramientas" (en algunas versiones: "Cuenta", luego "Cambiar a cuenta profesional").
4. Elige "Cambiar a cuenta profesional" y selecciona Creator (sirve igual que Business para esto).
5. Sáltate lo opcional (categoría, datos de contacto públicos, etc.).

## Paso 2: Crear la app en Meta

1. Ve a https://developers.facebook.com/apps (inicia sesión con tu cuenta de Facebook; el registro de desarrollador se hace ahí mismo si es tu primera vez).
2. Clic en "Create App" / "Crear app".
3. Tipo de app: **Business**.
4. Correo de contacto: uno que sí revises.
5. Cuando pida agregar un "use case" (caso de uso): filtra por "All" y elige **"Manage messaging and content on Instagram"** (administrar mensajes y contenido en Instagram).
   - NO elijas "Create and manage ads with Marketing API".
   - NO elijas nada de "Facebook Login". OpenReply usa Instagram Login; si eliges el de Facebook, el OAuth falla después.

## Paso 3: Sacar las 3 llaves de Meta

Hay dos "app secrets" y dos "app IDs" distintos, es confuso a propósito de Meta. Este es el mapa:

| Valor que necesito | Dónde está en el dashboard de la app |
| --- | --- |
| `INSTAGRAM_APP_ID` | Producto Instagram, sección "API setup with Instagram login". Es un número largo tipo `2036...` |
| `INSTAGRAM_APP_SECRET` | La misma página, botón "Show" junto al secret |
| `FACEBOOK_APP_SECRET` | Menú "App settings", "Basic", campo "App secret", botón "Show" |

Ojo: el Instagram App ID NO es el mismo número que el "App ID" que sale en App settings > Basic. Usa el que está dentro del producto Instagram.

## Paso 4: Agregarte a ti mismo como Instagram Tester

Sin esto, el login de Instagram falla con "Insufficient Developer Role". Son dos mitades y las dos son obligatorias:

**Mitad 1, en el dashboard de Meta:**
1. En la app, abre "App roles", luego "Roles".
2. Busca la sección "Instagram testers" y clic en agregar.
3. Escribe exactamente: `_beto.llanos_`
4. Manda la invitación.

**Mitad 2, dentro de Instagram (esta es la que todos se saltan):**
1. Abre Instagram como @_beto.llanos_.
2. Perfil, menú, "Configuración y actividad".
3. Abre "Apps y sitios web" (en versiones viejas: "Permisos del sitio web", luego "Apps y sitios web").
4. Abre "Invitaciones de tester" / "Tester invites".
5. Acepta la invitación de tu app.

Con esto operas en Standard Access: tu propia cuenta funciona completa sin pasar por App Review. Review solo se necesita si algún día quieres que desconocidos conecten sus cuentas.

## Paso 5: Registrar el OAuth redirect

1. En el producto Instagram del dashboard, abre "Set up Instagram business login", luego "Business login settings".
2. En el campo "OAuth redirect URIs" pega exactamente (sin diagonal al final):
   ```
   https://web-production-69bfc.up.railway.app/api/instagram/callback
   ```
3. Guarda.

## Paso 6: Configurar el webhook

1. Todavía en el producto Instagram, busca el paso "Configure webhooks".
2. Callback URL:
   ```
   https://web-production-69bfc.up.railway.app/api/webhook
   ```
3. Verify token:
   ```
   3587444711743949143f44f7be2c14b6
   ```
4. Clic en "Verify and save". Debe pasar a la primera (el servidor ya está respondiendo el challenge de Meta). Si el botón sale gris, vuelve a pegar el verify token: editar la URL suele borrar ese campo.
5. Suscríbete a DOS campos: **`comments`** y **`messages`**. Los dos importan: comments es el comment-to-DM y messages es la respuesta automática a DMs. Con solo comments, la mitad de la app parece prendida pero nunca dispara.

## Paso 7: Publicar la app (modo Live)

Los webhooks reales solo llegan con la app en estado Live. En Development solo funciona el botón de prueba de la consola.

1. En el menú lateral de la app, busca "Publish".
2. Te va a pedir 3 URLs antes de dejarte publicar. La app ya sirve esas páginas, pega estas:
   ```
   https://web-production-69bfc.up.railway.app/privacy
   https://web-production-69bfc.up.railway.app/terms
   https://web-production-69bfc.up.railway.app/data-deletion
   ```
3. Publica. Para tu propia cuenta (que ya es tester) no necesitas App Review.

## Paso 8: Cuenta de Resend (para los emails de login)

El login de OpenReply es solo por magic link al correo, sin Resend nadie puede entrar.

1. Ve a https://resend.com y crea la cuenta gratis.
2. Regístrate con **allanos.10@outlook.com** (importante: sin dominio propio verificado, Resend solo entrega correos a la dirección del dueño de la cuenta; como el login permitido de OpenReply es ese mismo correo, así cierra el circuito).
3. Dentro de Resend: "API Keys", "Create API Key", dale permiso de envío (Sending access), copia la key (empieza con `re_`).
4. No necesitas verificar dominio para arrancar; el remitente ya está configurado como `onboarding@resend.dev`, que es el que Resend permite sin dominio.

---

## Lo que me pegas en la terminal al terminar

Solo estas 4 líneas, con tus valores reales:

```
INSTAGRAM_APP_ID=
INSTAGRAM_APP_SECRET=
FACEBOOK_APP_SECRET=
RESEND_API_KEY=
```

Todo lo demás del `.env` ya está seteado en Railway y no dependes de nada más: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `CRON_SECRET`, `ENCRYPTION_KEY`, `WEBHOOK_VERIFY_TOKEN`, `DATABASE_URL`, `REDIS_URL`, `EMAIL_FROM`, `ALLOWED_EMAILS` (tus 2 correos), `META_GRAPH_API_VERSION`.

Cuando me pases las 4 llaves yo las seteo en Railway, redeployo, y probamos el flujo completo: login con magic link, conectar Instagram y el test de webhook desde la consola de Meta. Las campañas reales quedan para después del 17 de septiembre.
