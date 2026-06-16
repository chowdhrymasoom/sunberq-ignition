## Goal

Move SunBERQ away from the current dark, Goyama-style industrial theme to a **light, airy, conversion-focused design** in the spirit of solaroorja.com — but elevated to feel premium and global (Tesla-clean, not WordPress-templated). Keep all existing routes and content; replace the visual system end-to-end.

## New design direction

- **Palette**: white / warm off-white dominant background, deep charcoal text, **orange (#F26B1F)** as the single energetic accent, solar yellow used sparingly for highlights and data. No dark hero, no neon glows.
- **Type**: large modern sans display (e.g. Sora or Urbanist) + clean body (Inter / Manrope). Big headlines, generous line-height, lots of whitespace.
- **Surfaces**: soft shadows, 1px hairline borders, rounded-2xl cards on white, subtle warm-gray section dividers instead of the current "energy divider" lines.
- **Imagery**: bright daytime rooftop and lifestyle photography (homeowner-facing), not dark industrial farms in the hero.
- **Motion**: restrained — fade/slide on scroll, subtle hover lifts, no glow pulses or animated grids.

## Structural moves (Solar Oorja-inspired, premium-ified)

1. **Sticky white navbar** with charcoal links, a phone number, and a solid orange "Get Free Quote" CTA on the right. Logo sits comfortably at current larger size.
2. **Hero**: light background, oversized headline ("Rooftop solar that pays for itself"), supporting line, two CTAs (Get Free Site Survey / Check Subsidy), trust row (rating, installs, warranty). Photo of a real rooftop install on the right (desktop) / below (mobile). No dark overlay.
3. **Why switch / benefits**: 3–4 column icon grid on white with orange icons.
4. **Savings/Subsidy calculator teaser strip** in a warm cream band — single input + CTA.
5. **Product range**: clean 3-card grid (Panels / Inverters / Storage) with white cards, product image, spec chips, "Learn more" link. Replaces the current dark product section.
6. **How it works**: 4-step numbered horizontal flow with orange step numbers.
7. **Stats band**: large orange numerals on cream background (MW installed, projects, states, warranty years).
8. **Gallery**: bento-style image grid, rounded, light captions.
9. **Testimonials**: white cards with star rating, quote, name, location.
10. **FAQ accordion** (homeowner questions: subsidy, payback, warranty, net metering).
11. **Final CTA band**: orange background, white headline, white outline + solid CTAs.
12. **Footer**: light gray, multi-column, newsletter, social, compliance row.

## Pages (all kept, restyled to the new system)

- Home, Products, About, Contact, Dealers, Blog, Quote — each gets the new light theme, new PageHeader (white with thin orange underline accent instead of dark hero), and updated section components.

## Technical changes

- **`src/styles.css`**: rewrite token layer.
  - `--background` warm white, `--foreground` deep charcoal, `--primary` orange `#F26B1F` (oklch), `--accent` solar yellow, new `--surface-cream`, `--border-hairline`.
  - Remove dark hero gradients, glow shadows, neon ring tokens; add `--shadow-soft`, `--shadow-lift`.
  - Default to light mode (drop the dark `:root` baseline).
- **`src/components/Navbar.tsx`**: always-light variant; logo always uses the dark variant; orange CTA button.
- **`src/components/Logo.tsx`**: keep current sizing; default to dark variant.
- **`src/components/Footer.tsx`**: light footer; logo dark variant.
- **`src/components/PageHeader.tsx`**: light header (white/cream bg, charcoal title, orange rule).
- **`src/components/EnergyDivider.tsx`**: replace with a quieter hairline/cream divider.
- **`src/components/FloatingCTA.tsx`**: solid orange pill, white text, soft shadow.
- **`src/components/Reveal.tsx` / `AnimatedCounter.tsx`**: keep; tone motion down.
- **`src/routes/index.tsx`**: rebuild sections in the order above; new hero, subsidy strip, how-it-works, stats, FAQ, final CTA.
- **`src/routes/{products,about,contact,dealers,blog,quote}.tsx`**: re-skin to the light system; keep copy and data, swap section backgrounds, card styles, buttons.
- Add a small **FAQ accordion** (shadcn `accordion`) and **Testimonials** card on home.
- New generated hero image: bright daytime Indian rooftop install (replacing the current dark solar farm hero).

## What stays

- All routes, copy, product specs, vision text, blog/news structure, quote form fields, dealer inquiry form.
- Logo files, favicon, SEO meta per route.
- TanStack Start routing and head() metadata.

## Out of scope

- Backend / Lovable Cloud (not requested).
- New pages beyond the existing seven.
- Animations beyond subtle reveal/hover.

## Result

A light, premium, homeowner-friendly SunBERQ site that reads like Solar Oorja's structure with Tesla-grade polish — clearly distinct from Goyama and the previous dark theme.
