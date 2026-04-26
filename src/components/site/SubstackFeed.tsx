import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { fetchSubstack, type SubstackPost } from "@/lib/substack";
import { useLang, t } from "@/i18n/LangProvider";
import { copy, SUBSTACK_URL } from "@/i18n/content";

function formatDate(d: string, lang: "es" | "en") {
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function SubstackFeed({ limit }: { limit?: number }) {
  const { lang } = useLang();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["substack", SUBSTACK_URL],
    queryFn: () => fetchSubstack(SUBSTACK_URL),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-3">
        {Array.from({ length: limit ?? 3 }).map((_, i) => (
          <div key={i} className="rounded-sm border border-border bg-card p-5 animate-pulse">
            <div className="h-3 w-20 bg-muted mb-4" />
            <div className="h-5 w-full bg-muted mb-2" />
            <div className="h-5 w-2/3 bg-muted mb-4" />
            <div className="h-3 w-full bg-muted mb-1" />
            <div className="h-3 w-5/6 bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-sm border border-border bg-secondary/40 p-6 text-sm text-muted-foreground">
        {t(lang, copy.research.error)}{" "}
        <a href={SUBSTACK_URL} target="_blank" rel="noreferrer" className="editorial-link text-foreground">
          {t(lang, copy.research.visit)} →
        </a>
      </div>
    );
  }

  const posts: SubstackPost[] = limit ? data.slice(0, limit) : data;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {posts.map((p) => (
        <a
          key={p.link}
          href={p.link}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col rounded-sm border border-border bg-card overflow-hidden transition-all hover:border-accent/60 hover:-translate-y-0.5"
        >
          {p.image && (
            <div className="aspect-[16/9] overflow-hidden bg-muted">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <div className="p-5 flex flex-col gap-3 flex-1">
            <div className="smallcaps text-muted-foreground">{formatDate(p.pubDate, lang)}</div>
            <h3 className="font-serif text-xl leading-snug text-foreground group-hover:text-accent transition-colors">
              {p.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{p.excerpt}</p>
            <div className="mt-auto inline-flex items-center gap-1 text-sm text-foreground">
              {t(lang, copy.research.readMore)} <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}