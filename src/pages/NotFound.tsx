import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLang, t } from "@/i18n/LangProvider";
import { copy } from "@/i18n/content";

const NotFound = () => {
  const location = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="container-prose py-32 text-center">
      <div className="font-serif text-8xl text-accent">404</div>
      <h1 className="font-serif text-3xl mt-4">{t(lang, copy.notFound.title)}</h1>
      <p className="mt-3 text-muted-foreground">{t(lang, copy.notFound.body)}</p>
      <Link to="/" className="mt-8 inline-block editorial-link text-foreground">
        ← {t(lang, copy.notFound.back)}
      </Link>
    </section>
  );
};

export default NotFound;
