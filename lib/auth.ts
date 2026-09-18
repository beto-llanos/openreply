import NextAuth, { type NextAuthConfig } from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/client";
import { ensureWorkspaceForUser, getPrimaryWorkspace } from "@/lib/workspace";
import { isEmailAllowedToSignIn } from "@/lib/env";

type AdapterPrismaClient = Parameters<typeof PrismaAdapter>[0];

const emailFrom = process.env.EMAIL_FROM ?? "Comentio <hola@comentio.app>";
const resendApiKey = process.env.RESEND_API_KEY ?? "missing-resend-api-key";
// Setting EMAIL_SERVER switches magic links to your own SMTP server, for
// self-hosters who do not want a third-party mail service. Resend stays the
// default, so an existing deployment is unaffected.
const smtpServer = process.env.EMAIL_SERVER;

// Correo del enlace mágico, en español y con marca Comentio (el default de
// next-auth es genérico y en inglés).
function magicLinkEmail(url: string) {
  const subject = "Tu acceso a Comentio";
  const text =
    `Entra a Comentio con este enlace (caduca pronto y solo funciona una vez):\n` +
    `${url}\n\nSi no pediste este acceso, ignora este correo.`;
  const html = `<div style="background:#f4f4f5;padding:32px 16px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:440px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e4e4e7;overflow:hidden;">
    <div style="background:#f97316;height:6px;"></div>
    <div style="padding:32px;">
      <div style="font-size:20px;font-weight:800;color:#18181b;">Comentio</div>
      <h1 style="font-size:18px;font-weight:700;color:#18181b;margin:20px 0 8px;">Entra a tu cuenta</h1>
      <p style="font-size:14px;line-height:22px;color:#52525b;margin:0 0 24px;">Toca el botón para entrar a Comentio. El enlace caduca pronto y solo funciona una vez.</p>
      <a href="${url}" style="display:inline-block;background:#f97316;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:8px;">Entrar a Comentio</a>
      <p style="font-size:12px;line-height:20px;color:#a1a1aa;margin:24px 0 0;">Si el botón no funciona, copia y pega este enlace:<br><span style="color:#71717a;word-break:break-all;">${url}</span></p>
      <p style="font-size:12px;line-height:20px;color:#a1a1aa;margin:16px 0 0;">Si no pediste este acceso, ignora este correo.</p>
    </div>
  </div>
</div>`;
  return { subject, text, html };
}

/**
 * Provider id the login form has to sign in with. It differs per transport,
 * so it is derived here rather than hardcoded at the call site.
 */
export const EMAIL_PROVIDER_ID = smtpServer ? "nodemailer" : "resend";

export const authConfig = {
  adapter: PrismaAdapter(prisma as unknown as AdapterPrismaClient),
  providers: [
    smtpServer
      ? Nodemailer({ server: smtpServer, from: emailFrom })
      : Resend({
          apiKey: resendApiKey,
          from: emailFrom,
          async sendVerificationRequest({ identifier: to, url }) {
            const { subject, html, text } = magicLinkEmail(url);
            const res = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ from: emailFrom, to, subject, html, text }),
            });
            if (!res.ok) {
              throw new Error(
                `Resend no pudo enviar el correo: ${res.status} ${await res.text()}`
              );
            }
          },
        }),
  ],
  callbacks: {
    // Runs before the magic link is sent, so a blocked address never receives
    // one, and again when the link is verified.
    async signIn({ user }) {
      return isEmailAllowedToSignIn(user?.email);
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (user.id) {
        await ensureWorkspaceForUser(user.id, user.email);
      }
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
  },
  session: {
    strategy: "database",
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export async function getCurrentUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

export async function getCurrentWorkspaceId(): Promise<string | null> {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const workspace = await getPrimaryWorkspace(userId);
  if (workspace) return workspace.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });

  const createdWorkspace = await ensureWorkspaceForUser(userId, user?.email);
  return createdWorkspace.id;
}
