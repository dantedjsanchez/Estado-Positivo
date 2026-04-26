import { useLang, t } from "@/i18n/LangProvider";
import { copy, TEAM, PARTNERS } from "@/i18n/content";
import { SectionHeader } from "@/components/site/SectionHeader";

export default function Project() {
  const { lang } = useLang();

  return (
    <>
      {/* HERO */}
      <section className="container-prose pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="smallcaps text-accent mb-4">{t(lang, copy.project.eyebrow)}</div>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
          {t(lang, copy.project.title)}
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl leading-relaxed">{t(lang, copy.project.lede)}</p>
      </section>

      {/* BODY 1 — concept */}
      <section className="border-t border-border">
        <div className="container-prose py-16 md:py-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="smallcaps text-accent">§ 01</div>
            <h2 className="font-serif text-3xl md:text-4xl mt-2 leading-tight">{t(lang, copy.project.body1Title)}</h2>
          </div>
          <p className="md:col-span-8 text-lg leading-relaxed text-foreground/85">{t(lang, copy.project.body1)}</p>
        </div>
      </section>

      {/* GOALS — full */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container-prose py-20 md:py-24">
          <SectionHeader
            eyebrow={t(lang, copy.home.goalsTitle)}
            title={lang === "es" ? "Dos frentes de trabajo" : "Two fronts of work"}
          />
          <div className="mt-12 space-y-12">
            {(["a", "b"] as const).map((k, idx) => (
              <article key={k} className="grid gap-8 md:grid-cols-12 items-start">
                <div className="md:col-span-3">
                  <div className="font-serif text-7xl md:text-8xl leading-none text-accent/80">
                    {idx === 0 ? "a" : "b"}
                  </div>
                  <div className="smallcaps text-muted-foreground mt-2">{t(lang, copy.goals[k].label)}</div>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-serif text-2xl md:text-3xl leading-tight">{t(lang, copy.goals[k].title)}</h3>
                  <p className="mt-4 text-lg text-foreground/85 leading-relaxed">{t(lang, copy.goals[k].body)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="border-t border-border">
        <div className="container-prose py-16 md:py-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="smallcaps text-accent">§ 02</div>
            <h2 className="font-serif text-3xl md:text-4xl mt-2 leading-tight">{t(lang, copy.project.body2Title)}</h2>
          </div>
          <p className="md:col-span-8 text-lg leading-relaxed text-foreground/85">{t(lang, copy.project.body2)}</p>
        </div>
      </section>

      {/* TEAM */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container-prose py-20 md:py-24">
          <SectionHeader
            eyebrow={t(lang, copy.project.teamTitle)}
            title={lang === "es" ? "Quiénes hacen el programa" : "Who runs the program"}
            kicker={t(lang, copy.project.teamKicker)}
          />
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <article key={m.name} className="flex flex-col">
                <div className="aspect-[4/5] bg-gradient-to-br from-primary/10 to-accent/10 rounded-sm mb-4 grid place-items-center font-serif text-5xl text-primary/40 select-none">
                  {m.name
                    .split(" ")
                    .map((s) => s[0])
                    .filter((c) => /[A-ZÁÉÍÓÚÑ]/.test(c))
                    .slice(0, 2)
                    .join("")}
                </div>
                <h3 className="font-serif text-xl text-foreground">{m.name}</h3>
                <div className="smallcaps text-accent mt-1">{t(lang, m.role)}</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(lang, m.bio)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="border-t border-border">
        <div className="container-prose py-16 md:py-20">
          <div className="smallcaps text-accent mb-3">{t(lang, copy.project.partnersTitle)}</div>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight max-w-2xl">
            {lang === "es"
              ? "Trabajamos con instituciones públicas, redes académicas y procesos internacionales."
              : "We work with public institutions, academic networks, and international processes."}
          </h2>
          <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border">
            {PARTNERS.map((p) => (
              <li
                key={p}
                className="bg-background py-8 px-4 text-center font-serif text-foreground/70 text-sm"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}