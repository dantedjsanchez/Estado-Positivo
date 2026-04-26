import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang, t } from "@/i18n/LangProvider";
import { copy } from "@/i18n/content";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", key: "home" as const },
  { to: "/proyecto", key: "project" as const },
  { to: "/investigacion", key: "research" as const },
  { to: "/contacto", key: "contact" as const },
];

export function Header() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-prose flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <span className="grid place-items-center h-9 w-9 rounded-sm bg-primary text-primary-foreground font-serif text-lg leading-none">
            E<span className="text-accent">+</span>
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-serif text-lg text-foreground">{t(lang, copy.brand.short)}</span>
            <span className="smallcaps text-muted-foreground">Proyecto</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {items.map((it) => (
            <NavLink
              key={it.key}
              to={it.to}
              end={it.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm tracking-wide transition-colors",
                  isActive
                    ? "text-foreground after:content-[''] after:block after:h-px after:bg-accent after:mt-1"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {t(lang, copy.nav[it.key])}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center text-xs font-medium tracking-wider" role="group" aria-label="Language">
            <button
              type="button"
              onClick={() => setLang("es")}
              className={cn("px-1.5 transition-colors", lang === "es" ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
              aria-pressed={lang === "es"}
            >
              ES
            </button>
            <span className="text-border">/</span>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={cn("px-1.5 transition-colors", lang === "en" ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            className="md:hidden grid place-items-center h-9 w-9 rounded-sm border border-border text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background" aria-label="Mobile">
          <div className="container-prose py-4 flex flex-col gap-3">
            {items.map((it) => (
              <NavLink
                key={it.key}
                to={it.to}
                end={it.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn("py-1 text-base", isActive ? "text-foreground" : "text-muted-foreground")
                }
              >
                {t(lang, copy.nav[it.key])}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}