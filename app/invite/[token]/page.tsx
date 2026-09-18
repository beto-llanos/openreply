import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InvitationAcceptCard from "@/components/invitation-accept-card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/client";

type InvitePageProps = {
  params: Promise<{ token: string }>;
};

export const metadata: Metadata = {
  title: "Aceptar invitación al espacio de trabajo - Comentio",
  robots: { index: false, follow: false },
};

const ROLE_LABELS: Record<string, string> = {
  OWNER: "propietario",
  ADMIN: "administrador",
  MEMBER: "miembro",
};

export default async function InvitePage({ params }: InvitePageProps) {
  const { token } = await params;
  const [session, invitation] = await Promise.all([
    auth(),
    prisma.workspaceInvitation.findUnique({
      where: { token },
      include: {
        workspace: { select: { name: true } },
      },
    }),
  ]);

  if (!invitation || invitation.status !== "PENDING") {
    notFound();
  }

  const expired = invitation.expiresAt <= new Date();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-5 py-12">
        <Link href="/" className="mb-8 text-sm font-bold text-cyan-100">
          Comentio
        </Link>
        <section className="border border-white/10 bg-white/[0.035] p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100">
            Invitación al espacio de trabajo
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight text-white">
            Únete a {invitation.workspace.name}
          </h1>
          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Te invitaron como{" "}
            {ROLE_LABELS[invitation.role] ?? invitation.role.toLowerCase()} para{" "}
            {invitation.email}.
          </p>
          <div className="mt-8">
            {expired ? (
              <p className="text-sm text-error">
                Esta invitación expiró. Pídele al propietario del espacio de
                trabajo que la reenvíe.
              </p>
            ) : (
              <InvitationAcceptCard
                token={token}
                isSignedIn={Boolean(session?.user?.id)}
                invitedEmail={invitation.email}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

