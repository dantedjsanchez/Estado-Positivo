import { FormEvent, useState } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { useLang, t } from "@/i18n/LangProvider";
import { copy, CONTACT_EMAIL, SUBSTACK_URL } from "@/i18n/content";

export default function Contact() {
  const { lang } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [aff, setAff] = useState("");
  const [msg, setMsg] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`[Estado Positivo] ${name || "Mensaje"}`);
    const body = encodeURIComponent(
      `${name}${aff ? ` (${aff})` : ""}\n${email}\n\n${msg}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      {/* HERO */}
      <section className="container-prose pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="smallcaps text-accent mb-4">{t(lang, copy.contact.eyebrow)}</div>
        <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl">
          {t(lang, copy.contact.title)}
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl leading-relaxed">{t(lang, copy.contact.lede)}</p>
      </section>

      {/* CONTENT */}
      <section className="border-t border-border">
        <div className="container-prose py-16 md:py-20 grid gap-12 md:grid-cols-12">
          {/* Coordinates */}
          <aside className="md:col-span-4 space-y-8">
            <div>
              <div className="smallcaps text-accent mb-2">{t(lang, copy.contact.emailLabel)}</div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-serif text-2xl text-foreground inline-flex items-center gap-2 editorial-link"
              >
                <Mail className="h-5 w-5 text-accent" />
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <div className="smallcaps text-accent mb-2">{t(lang, copy.contact.follow)}</div>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-serif text-xl text-foreground editorial-link"
              >
                Substack <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
              {lang === "es"
                ? "Las consultas de prensa se atienden en un plazo aproximado de 48 horas hábiles."
                : "Press inquiries are typically answered within 48 working hours."}
            </p>
          </aside>

          {/* Form */}
          <form onSubmit={onSubmit} className="md:col-span-8 space-y-6 border border-border bg-card p-6 md:p-10 rounded-sm">
            <div className="smallcaps text-accent">{t(lang, copy.contact.formTitle)}</div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={t(lang, copy.contact.name)} value={name} onChange={setName} required />
              <Field label={t(lang, copy.contact.email)} type="email" value={email} onChange={setEmail} required />
            </div>
            <Field label={t(lang, copy.contact.affiliation)} value={aff} onChange={setAff} />
            <div>
              <label className="block smallcaps text-muted-foreground mb-2">{t(lang, copy.contact.message)}</label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                required
                rows={6}
                className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 text-foreground resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors"
            >
              {t(lang, copy.contact.send)} <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block smallcaps text-muted-foreground mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent border-b border-border focus:border-accent outline-none py-2 text-foreground"
      />
    </div>
  );
}