import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLang, t } from "@/i18n/LangProvider";
import { copy, SUBSTACK_URL } from "@/i18n/content";
import { HeroGraphic } from "@/components/site/HeroGraphic";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SubstackFeed } from "@/components/site/SubstackFeed";

const Index = () => {
  const { lang } = useLang();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-prose pt-16 pb-20 md:pt-24 md:pb-28 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="animate-fade-up">
            <div className="smallcaps text-accent mb-5">{t(lang, copy.home.eyebrow)}</div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-foreground">
              {lang === "es" ? (
                <>
                  Hacia un Estado<br />
                  <em className="text-accent not-italic">positivo</em> para la
                  <br /> transición climática.
                </>
              ) : (
                <>
                  Towards a <em className="text-accent not-italic">positive</em>
                  <br /> state for the climate
                  <br /> transition.
                </>
              )}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              {t(lang, copy.brand.tagline)}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/proyecto"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors"
              >
                {t(lang, copy.home.ctaProject)} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-foreground border-b border-accent/60 hover:border-accent pb-1 text-sm tracking-wide"
              >
                {t(lang, copy.home.ctaSubstack)} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative">
            <HeroGraphic className="w-full max-w-[560px] mx-auto" />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container-prose py-16 md:py-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="smallcaps text-accent">{lang === "es" ? "Premisa" : "Premise"}</div>
            <h2 className="font-serif text-3xl md:text-4xl mt-2 leading-tight">
              {lang === "es" ? "El Estado positivo" : "The positive state"}
            </h2>
          </div>
          <p className="md:col-span-8 text-lg leading-relaxed text-foreground/85 drop-cap">
            {t(lang, copy.home.intro)}
          </p>
        </div>
      </section>

      {/* GOALS */}
      <section className="container-prose py-20 md:py-24">
        <SectionHeader
          eyebrow={t(lang, copy.home.goalsTitle)}
          title={lang === "es" ? "México y el debate global" : "Mexico and the global debate"}
          kicker={t(lang, copy.home.goalsKicker)}
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {(["a", "b"] as const).map((k) => (
            <article
              key={k}
              className="border border-border bg-card p-8 md:p-10 rounded-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 font-serif text-[8rem] leading-none text-accent/10 select-none pointer-events-none -mr-4 -mt-6">
                {k === "a" ? "A" : "B"}
              </div>
              <div className="smallcaps text-accent">{t(lang, copy.goals[k].label)}</div>
              <h3 className="font-serif text-2xl md:text-3xl mt-3 leading-tight">
                {t(lang, copy.goals[k].title)}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t(lang, copy.goals[k].body)}</p>
              <Link
                to="/proyecto"
                className="mt-6 inline-flex items-center gap-1 text-sm text-foreground border-b border-accent/50 pb-0.5 hover:border-accent w-fit"
              >
                {lang === "es" ? "Más sobre el proyecto" : "More about the project"} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* SUBSTACK PREVIEW */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container-prose py-20 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <SectionHeader
              eyebrow="Substack"
              title={t(lang, copy.home.latest)}
            />
            <Link to="/investigacion" className="editorial-link text-foreground text-sm">
              {t(lang, copy.home.viewAll)} →
            </Link>
          </div>
          <SubstackFeed limit={3} />
        </div>
      </section>
    </>
  );
};

export default Index;
