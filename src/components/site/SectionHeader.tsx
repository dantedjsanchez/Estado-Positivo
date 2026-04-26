import { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  kicker,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  kicker?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <header className={align === "center" ? "text-center" : ""}>
      {eyebrow && <div className="smallcaps text-accent mb-3">{eyebrow}</div>}
      <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight tracking-tight">{title}</h2>
      {kicker && <p className="mt-3 text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">{kicker}</p>}
      <div className={`mt-5 h-px w-16 bg-accent ${align === "center" ? "mx-auto" : ""}`} />
    </header>
  );
}