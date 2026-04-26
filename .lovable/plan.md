## Proyecto Estado Positivo — Website Plan

A bilingual (ES/EN) academic-style website for the research program, with 4 pages and a live Substack feed.

---

### 🎨 Design direction — Academic & institutional

- **Typography:** Serif headlines (e.g. Lora / Cormorant Garamond), clean sans-serif body (Inter). Restrained, dense, elegant — university research center feel.
- **Palette:** Deep navy/ink as primary, warm cream/off-white background, muted terracotta or burgundy accent. All defined as HSL design tokens.
- **Layout:** Generous margins, narrow text columns for readability, thin rules and small-caps labels, subtle section dividers.
- **Hero:** Abstract geometric/data-viz motif (animated SVG of intersecting lines, nodes, and soft gradient shapes) evoking governance + climate transitions — no stock photography.
- **Tone:** Serious, scholarly, internationally-oriented.

---

### 🌐 Bilingual support (ES / EN)

- Language toggle (ES | EN) in the top-right of the header, persisted in localStorage.
- Lightweight in-app i18n dictionary (no heavy library) — Spanish as default.
- All static copy translated; dynamic Substack content shown in its original language.

---

### 📄 Pages (4-page minimal structure)

**1. Inicio / Home**
- Hero: project name, tagline ("Hacia un nuevo Estado activista para la transición climática y la justicia social"), animated abstract graphic, two CTAs (Conoce el proyecto / Lee nuestro Substack).
- Brief intro paragraph on the "positive state" concept.
- Two-goals teaser cards (Mexico energy reform · Global post-neoliberal debates).
- Latest 3 Substack posts preview.
- Footer with contact + affiliations placeholder.

**2. Proyecto / Project** (about + goals + team merged)
- Mission and the "positive state" framing — full long-form section.
- The two goals laid out as numbered, in-depth sections (a) Mexico, (b) Global / IPCC.
- Methodology / approach block.
- Team grid: photo placeholders, names, roles, short bios (researchers, advisors, collaborators) — populated with realistic placeholders.
- Partners / affiliations strip (logo placeholders).

**3. Investigación / Research** (publications + Substack)
- Publications list: papers, policy briefs, reports — each with title, authors, year, type tag, abstract excerpt, download link (placeholders).
- Filter by type (Paper · Brief · Report) and year.
- **Substack feed section:** live preview of posts pulled from the Substack RSS feed — card grid with title, date, excerpt, cover image, link out to the post. Refreshes on each visit.

**4. Contacto / Contact**
- Short intro + institutional contact email.
- Simple contact form (name, email, affiliation, message) — submissions stored via Lovable Cloud and a confirmation toast shown.
- Links to Substack and any social channels.

---

### 🔌 Substack integration

- Fetch posts from the Substack RSS feed (`https://<yoursubstack>.substack.com/feed`) via a small Lovable Cloud edge function (avoids CORS issues and keeps the URL configurable).
- Parse the XML, return JSON (title, link, pubDate, description, enclosure image).
- Used in two places: Home (latest 3) and Research page (full grid).
- You'll provide the actual Substack URL after the plan — placeholder used until then.

---

### 🧱 Technical setup

- React + Tailwind + shadcn/ui, react-router for the 4 routes.
- Design tokens defined in `index.css` and `tailwind.config.ts` (no inline colors).
- Reusable components: `Header` (with lang toggle), `Footer`, `SectionHeader`, `GoalCard`, `TeamCard`, `PublicationItem`, `SubstackCard`, `LangProvider`.
- Lovable Cloud enabled for: contact form submissions table + Substack RSS proxy edge function.
- Fully responsive (mobile, tablet, desktop), accessible (semantic HTML, aria labels, keyboard nav).

---

### 📦 What ships in v1

✅ 4 pages, fully designed, bilingual ES/EN  
✅ Animated abstract hero  
✅ Substack RSS integration (you supply the URL)  
✅ Contact form persisted to Lovable Cloud  
✅ Placeholder team + publications you can replace later  

### 🔜 Easy follow-ups (not in v1)
- Replace placeholders with real team & publications
- Add news/events page when needed
- Newsletter signup integration
- CMS for non-developers to edit content