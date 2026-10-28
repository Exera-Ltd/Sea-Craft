# Sea Craft — notes for the WordPress build

This preview was written so it can be rebuilt in WordPress without redesigning
anything. Nothing here depends on a build step, a framework or a CDN.

---

## 1. Colour: what we did and why

The client asked for **blue and grey**, and for the blue to be the light
turquoise inside the terrarium rather than a navy. That is what the page now
uses.

The blue is `#0E7A8C`, a lagoon turquoise sampled from the sea-glass in the
reference photograph. It holds **5.0:1 against white**, so it is still safe for
button labels and small type — important, because the obvious lighter
turquoises (`#27A3B5` and up) fall to 3:1 and fail WCAG AA.

What we changed beyond the brief is the **neutral**. Every piece in the shop is
shell, sand, teak and driftwood. On a cool grey background those warm tones
read as slightly dirty and the photographs fight the page. On a sand neutral
the same photographs look expensive, and the blue has something to be blue
against.

So the page ships with three palettes on identical layout, switchable live:

| Key | Name | Use |
|---|---|---|
| `client` | Blue & grey | The brief, exactly as asked |
| `balanced` | Blue, grey & sand | **Recommended** — same blue, warm neutral |
| `lagoon` | Lagoon & driftwood | Greener, drawn from the reference photo |

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
        { "slug": "ink",         "name": "Ink",         "color": "#0C2630" },
        { "slug": "brand",       "name": "Lagoon Blue", "color": "#0E7A8C" },
        { "slug": "brand-deep",  "name": "Deep Lagoon", "color": "#0A3F4B" },
        { "slug": "accent",      "name": "Shallows",    "color": "#3BA7B5" },
        { "slug": "accent-soft", "name": "Sea Glass",   "color": "#BFE4E3" },
        { "slug": "surface",     "name": "Shell White", "color": "#FBF8F3" },
        { "slug": "band",        "name": "Mist",        "color": "#EAF3F2" },
        { "slug": "band-2",      "name": "Sand Light",  "color": "#F6F1E8" },
        { "slug": "line",        "name": "Hairline",    "color": "#E3DCCF" },
        { "slug": "muted",       "name": "Slate",       "color": "#4F6E78" },
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

## 3. The turtle watermark

The shop sells a lot of turtles, so a scatter of small turtle silhouettes sits
behind the hero, the shop band and the newsletter block at 4–5% opacity. It is
deliberately almost invisible — it should register as texture, not decoration.

Mechanically it is one `<div class="turtle-layer">` placed first inside a
`.has-turtles` block. The artwork is a CSS `mask-image`, so it takes its colour
from `var(--brand)` and follows whichever palette is active; `--light` flips it
to white for use on the dark band.

The mask is **inlined as a data URI** in `style.css`. That is not a style
choice: browsers block `mask-image` from an external file when a page is opened
from disk (`file://`), which is how the client will open this preview. The same
artwork is kept at `assets/img/pattern-turtles.svg` for editing — if you change
it, re-inline it rather than linking it.

In WordPress this travels as-is: it is plain CSS on a plain div, so it can live
in a Group block's extra class, or in the theme's `style.css`.

---

## 4. Section → block mapping

| Preview section | WordPress |
|---|---|
| Announcement bar | Template part, or the theme's own notice bar |
| Header + nav + cart | Template part `header.html`, WooCommerce mini-cart block |
| Hero | Cover / Columns block, or an ACF flexible-content row |
| Trust strip | Columns block ×4, icons as inline SVG |
| Collections | **Product Categories** block (WooCommerce), 4 columns |
| On the shelves this week | **Products (Latest)** block, 4 columns, 8 items |
| Our shop | Columns block inside a full-width group, dark background |
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
· ACF for the hero and shop rows · WP Rocket · a Mauritius-friendly gateway
(MCB Juice / MyT Money alongside Stripe or PayPal).

---

## 5. Photography

All product images are now the client's own photographs, cropped to square and
colour-matched where the backdrop needed it.

| File | Source | Treatment |
|---|---|---|
| `hero-terrarium.jpg` | client | as supplied |
| `p-turtle.jpg` | client | cropped square |
| `p-tallship.jpg` | client | padded to square in its own backdrop |
| `p-riva.jpg` | client | padded to square, edge feathered (the original has a heavy vignette that seams if you pad it flat) |
| `p-dolphins.jpg` | client | padded to square on white |
| `p-diorama.jpg` | client | cropped to one shell, **below the old logo and watermarks** |
| `p-baskets.jpg` | client | cropped square |
| `p-bracelets.jpg` | client | cropped square |
| `shop-front.jpg` | client | **cropped to exclude the old "Sea Power" neon**, since the shop is being rebranded as Sea Craft |

### Worth raising with the client

1. **Two images carry the old brand.** The storefront neon and the diorama
   product shot both said "Sea Power". Both are cropped out here, but the
   originals cannot be used as supplied, and new signage will need a reshoot of
   the storefront eventually.
2. **`p-turtle.jpg` is an in-store shot** — mall background, a pink price
   sticker on the shell, reflections in the counter. It reads as authentic but
   it is the weakest image in the grid.
3. **Backgrounds are inconsistent** (white, cream, grey, wood, stone). The grid
   tolerates it, but a single backdrop across the catalogue is the cheapest
   thing they can do to make the shop look twice as expensive. One afternoon
   with a sheet of warm-white card would cover most of the range.

Other assets: `logo.svg` is a scallop-and-wave mark drawn as a starting point —
it uses `currentColor` so it takes the palette automatically. Treat it as a
sketch, not a finished identity. Fonts (Fraunces, Jost) are self-hosted in
`assets/fonts/`, so no request ever goes to Google. Keep it that way for GDPR.

## 6. Still to decide with the client

1. Which palette.
2. The rebrand itself: new signage, new logo, and whether `seacraft.mu` or
   similar is secured. Nothing on the site should say Sea Power at launch.
3. Currency: prices are in Rs (MUR) with a currency chip in the header. If a
   large share of orders are from Europe, add EUR/GBP switching at build time.
4. Languages: the header shows EN / FR. If French is really needed, budget for
   WPML or Polylang now — retrofitting is expensive.
5. One-of-a-kind stock: several pieces are unique. Woo handles this with stock
   quantity 1, but the "Only 2 left" / "One of a kind" badges need a small
   snippet to display automatically.
6. Shipping: fragile glass, resin and rigged model ships to 24 countries needs
   real rules, not a flat rate.
