import Link from "next/link";

interface PublicSiteHeaderProps {
  active?: "home" | "templates";
}

const navLinks = [
  { label: "Plantillas", href: "/templates", key: "templates" },
  { label: "Precios", href: "/#pricing", key: "pricing" },
];

export default function PublicSiteHeader({ active }: PublicSiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/85">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Comentio inicio">
          <span className="text-lg font-bold text-white">Comentio</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`text-sm font-medium transition ${
                active === link.key ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:text-white sm:inline-flex"
          >
            Entrar
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center bg-cyan-300 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-cyan-200"
          >
            Empezar gratis
          </Link>
        </div>
      </div>
    </header>
  );
}
