import { Link } from "react-router-dom";
import { useLang, t } from "@/i18n/LangProvider";
import { copy, CONTACT_EMAIL, SUBSTACK_URL } from "@/i18n/content";

export function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-prose py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="font-serif text-2xl text-foreground">{t(lang, copy.brand.full)}</div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">{t(lang, copy.brand.tagline)}</p>
        </div>
        <div>
          <div className="smallcaps text-muted-foreground mb-3">{t(lang, copy.nav.contact)}</div>
          <a href={`mailto:${CONTACT_EMAIL}`} className="editorial-link text-foreground text-sm">
            {CONTACT_EMAIL}
          </a>
          <div className="mt-2 text-sm">
            <a href={SUBSTACK_URL} target="_blank" rel="noreferrer" className="editorial-link text-foreground">
              Substack →
            </a>
          </div>
        </div>
        <div>
          <div className="smallcaps text-muted-foreground mb-3">{lang === "es" ? "Navegar" : "Navigate"}</div>
          <ul className="space-y-1.5 text-sm">
            <li><Link to="/" className="editorial-link text-foreground">{t(lang, copy.nav.home)}</Link></li>
            <li><Link to="/proyecto" className="editorial-link text-foreground">{t(lang, copy.nav.project)}</Link></li>
            <li><Link to="/investigacion" className="editorial-link text-foreground">{t(lang, copy.nav.research)}</Link></li>
            <li><Link to="/contacto" className="editorial-link text-foreground">{t(lang, copy.nav.contact)}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-prose py-5 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {year} {t(lang, copy.footer.copy)}. {t(lang, copy.footer.rights)}</span>
          <span className="font-serif italic">Estado<span className="text-accent">+</span></span>
        </div>
      </div>
    </footer>
  );
}