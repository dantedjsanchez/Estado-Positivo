import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "es" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangCtx = createContext<Ctx | null>(null);

const STORAGE_KEY = "pep-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) as Lang | null;
    if (stored === "es" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  };

  const toggle = () => setLang(lang === "es" ? "en" : "es");

  return <LangCtx.Provider value={{ lang, setLang, toggle }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

export function t<T>(lang: Lang, dict: { es: T; en: T }): T {
  return dict[lang];
}