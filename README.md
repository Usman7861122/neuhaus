# Neuhaus Foot & Ankle website

Astro + React (islands) + Tailwind CSS 4 + Motion.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in /dist
```

## Where things live
- `src/data/site.ts` phone numbers, 16 locations (map coordinates are approximate), providers, insurances, testimonials
- `src/content/services/*.md` one file per service (set `featured: true` to show on the homepage, first 6 by `order`)
- `src/content/blog/*.md` blog posts
- `src/components/sections/` homepage sections, `src/components/react/` interactive parts (form, map, slider, mobile menu)
- `src/styles/global.css` brand colors and fonts

## Before launch
- Contact form: set `PUBLIC_FORM_ENDPOINT` in `.env` (Formspree, CRM, etc.). Without it the form only shows a success message.
- Check map pin positions in `src/data/site.ts`.
- Provider photos load from the old PatientPop site. Download them into `public/images/doctors/` before the old site goes away.
- Add privacy policy and terms text.

## Photos
Run `npm run images` once (and again whenever you add a new Unsplash photo). It downloads every photo into
`public/images/photos` and `public/images/remote`, and the site uses those local copies automatically.
If a local copy is missing, the site falls back to the online link.
