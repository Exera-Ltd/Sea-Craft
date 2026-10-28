# Sea Craft — notes for the WordPress build

This preview was written so it can be rebuilt in WordPress without redesigning
anything. Nothing here depends on a build step, a framework or a CDN.

---

## 1. Colour: what we did and why

The client asked for **blue and grey**. We think that instinct is right and we
have kept it — the primary blue, the structural greys and all the type colours
are exactly that. What we added is a **sand / driftwood neutral** instead of a
cool grey for backgrounds, cards and dividers.

The reason is in the product photography. Every piece is shell, sand, teak and
driftwood — warm materials. On a cool grey background those warm tones read as
slightly dirty, and the photos fight the page. On a sand background the same
photos look expensive, and the blue has something to be blue *against*.

So the page ships with three palettes on identical layout, switchable live:

| Key | Name | Use |
|---|---|---|
| `client` | Blue & grey | The brief, exactly as asked |
| `balanced` | Blue, grey & sand | **Recommended** — same blue, warm neutral |
| `lagoon` | Lagoon & driftwood | Drawn from the reference photo |

Open `index.html` and use the switcher at the bottom of the screen, or add
`?theme=client` / `?theme=balanced` / `?theme=lagoon` to the URL.

Once the client picks, delete the two unused blocks in `assets/css/style.css`
(section 1) and the `.pv` preview bar in section 16.

---

## 2. theme.json palette

Each palette is a flat list of CSS custom properties, so it maps straight onto
a block theme's `settings.color.palette`. The recommended set:

```json
{
  "version": 3,
  "settings": {
    "color": {
      "palette": [
        { "slug": "ink",         "name": "Ink",         "color": "#0B1F2A" },
        { "slug": "brand",       "name": "Brand Blue",  "color": "#1C5C79" },
        { "slug": "brand-deep",  "name": "Deep Navy",   "color": "#13384C" },
        { "slug": "accent",      "name": "Lagoon",      "color": "#3D93A8" },
        { "slug": "accent-soft", "name": "Sea Glass",   "color": "#BCDFD9" },
        { "slug": "surface",     "name": "Shell White", "color": "#FBF8F3" },
        { "slug": "band",        "name": "Mist",        "color": "#EFF3F3" },
        { "slug": "band-2",      "name": "Sand Light",  "color": "#F6F1E8" },
        { "slug": "line",        "name": "Hairline",    "color": "#E3DCCF" },
        { "slug": "muted",       "name": "Slate",       "color": "#5C6F79" },
        { "slug": "warm",        "name": "Sand",        "color": "#EADFC8" },
        { "slug": "warm-deep",   "name": "Deep Sand",   "color": "#D4BE9A" },
        { "slug": "wood",        "name": "Driftwood",   "color": "#9A7B5C" }
      ]
    },
    "typography": {
      "fontFamilies": [
        { "slug": "display", "name": "Fraunces", "fontFamily": "Fraunces, Georgia, serif" },
        { "slug": "body",    "name": "Jost",     "fontFamily": "Jost, system-ui, sans-serif" }
      ]
    }
  }
}
```

The slugs match the CSS variable names (`--brand` → `brand`), so a find/replace
of `var(--brand)` → `var(--wp--preset--color--brand)` converts the stylesheet.

---

## 3. Section → block mapping

| Preview section | WordPress |
|---|---|
| Announcement bar | Template part, or the theme's own notice bar |
| Header + nav + cart | Template part `header.html`, WooCommerce mini-cart block |
| Hero | Cover / Columns block, or an ACF flexible-content row |
| Trust strip | Columns block ×4, icons as inline SVG |
| Collections | **Product Categories** block (WooCommerce), 4 columns |
| Fresh off the workbench | **Products (Latest)** block, 4 columns, 8 items |
| Our atelier | Columns block inside a full-width group, dark background |
| Three slow steps | Columns block ×3 |
| Reviews | Query loop over a `testimonial` CPT, or a reviews plugin |
| From the bench | Instagram feed plugin, or a Gallery block |
| Newsletter | Mailchimp/Brevo form block, wrapped in a Group |
| Footer | Template part `footer.html` |

The product card markup deliberately mirrors WooCommerce's own structure
(`.card` ≈ `li.product`, `.card-media` ≈ the thumbnail link, `.quick` ≈
`.add_to_cart_button`), so the stylesheet can be pointed at Woo's classes with
mostly selector renaming rather than rewriting CSS.

**Suggested stack:** WooCommerce · a block theme (Twenty Twenty-Five or Blocksy)
· ACF for the hero and atelier rows · WP Rocket · a Mauritius-friendly gateway
(MCB Juice / MyT Money alongside Stripe or PayPal).

---

## 4. Assets in this repo

- `assets/img/hero-terrarium.jpg` — the client's own photograph.
- `assets/img/p-*.svg` — **placeholders we drew** so the grid reads like a real
  shop. They are not products. Replace each with real photography; keep them
  square (1:1) and on a light warm background for a consistent grid.
- `assets/img/logo.svg` — a scallop-and-wave mark, drawn as a starting point.
  It uses `currentColor`, so it takes the palette automatically. Treat it as a
  sketch, not a finished identity.
- `assets/fonts/*.woff2` — Fraunces (display) and Jost (body), self-hosted, so
  no request ever goes to Google. Keep it that way for GDPR.

## 5. Still to decide with the client

1. Which palette.
2. Currency: prices are in Rs (MUR) with a currency chip in the header. If a
   large share of orders are from Europe, add EUR/GBP switching at build time.
3. Languages: the header shows EN / FR. If French is really needed, budget for
   WPML or Polylang now — retrofitting is expensive.
4. One-of-a-kind stock: several pieces are unique. Woo handles this with stock
   quantity 1, but the "Only 4 left" / "One of a kind" badges need a small
   snippet to display automatically.
5. Shipping: fragile glass and resin to 24 countries needs real rules, not a
   flat rate.
