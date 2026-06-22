import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { useLang, t } from "@/i18n/LangProvider";
import { copy, PUBLICATIONS, type PubType, SUBSTACK_URL } from "@/i18n/content";
import { SectionHeader } from "@/components/site/SectionHeader";
import { SubstackFeed } from "@/components/site/SubstackFeed";
import { cn } from "@/lib/utils";

const TYPES: PubType[] = ["paper", "brief", "report"];

export default function Research() {
  const { lang } = useLang();
  const [filter, setFilter] = useState<PubType | "all">("all");

  const items = useMemo(
    () =>
      PUBLICATIONS.filter((p) => filter === "all" || p.type === filter).sort((a, b) => b.year - a.year),
    [filter],
  );

  const typeLabel = (type: PubType) =>
    type === "paper" ? t(lang, copy.research.typePaper) : type === "brief" ? t(lang, copy.research.typeBrief) : t(lang, copy.research.typeReport);

  return (
    <>
      {/* HERO */}
      <section className="container-prose pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="smallcaps text-accent mb-4">{t(lang, copy.research.eyebrow)}</div>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
          {t(lang, copy.research.title)}
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl leading-relaxed">{t(lang, copy.research.lede)}</p>
      </section>

      {/* PUBLICATIONS */}
      <section className="border-t border-border">
        <div className="container-prose py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <SectionHeader eyebrow="§ 01" title={t(lang, copy.research.pubsTitle)} />
            <div className="flex flex-wrap items-center gap-1 text-sm">
              {(["all", ...TYPES] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-3 py-1.5 border transition-colors",
                    filter === f
                      ? "border-accent text-accent"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40",
                  )}
                >
                  {f === "all" ? t(lang, copy.research.filterAll) : typeLabel(f)}
                </button>
              ))}
            </div>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {items.map((p, i) => (
              <li key={i} className="grid gap-4 md:grid-cols-12 py-7 group">
                <div className="md:col-span-2 flex md:flex-col gap-3 md:gap-1 items-baseline">
                  <span className="font-serif text-3xl text-accent leading-none">{p.year > 0 ? p.year : "—"}</span>
                  <span className="smallcaps text-muted-foreground">{p.authors ? typeLabel(p.type) : "—"}</span>
                </div>
                <div className="md:col-span-8">
                  <h3 className="font-serif text-2xl leading-snug text-foreground group-hover:text-accent transition-colors">
                    {t(lang, p.title)}
                  </h3>
                  <div className="text-sm text-muted-foreground mt-1 italic">{p.authors}</div>
                  <p className="mt-3 text-foreground/80 leading-relaxed">{t(lang, p.abstract)}</p>
                </div>
                <div className="md:col-span-2 flex md:justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm border border-border px-3 py-2 hover:border-accent hover:text-accent transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" /> PDF
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SUBSTACK */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container-prose py-20 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <SectionHeader
              eyebrow="§ 02"
              title={t(lang, copy.research.substackTitle)}
              kicker={t(lang, copy.research.substackKicker)}
            />
            <a href={SUBSTACK_URL} target="_blank" rel="noreferrer" className="editorial-link text-foreground text-sm">
              {t(lang, copy.research.visit)} →
            </a>
          </div>
          <SubstackFeed />
        </div>
      </section>
    </>
  );
}