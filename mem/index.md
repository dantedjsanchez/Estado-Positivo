# Project Memory

## Core
Site: "Proyecto Estado Positivo" — bilingual (ES default, EN secondary) academic research program site.
Design: Academic/institutional. Cormorant Garamond serif headings, Inter body. Cream paper bg, navy ink primary, muted burgundy accent. Tight radius (0.25rem), thin rules, smallcaps labels.
4 routes: / (Inicio), /proyecto, /investigacion, /contacto. No backend (Lovable Cloud declined).
Substack feed pulled client-side from RSS via lib/substack.ts (direct + AllOrigins fallback). URL constant in src/i18n/content.ts (placeholder).
Contact form opens mailto: link (no DB). Email/Substack URL in src/i18n/content.ts.
i18n via src/i18n/LangProvider.tsx + content.ts dictionary. Use t(lang, copy.x) pattern.
