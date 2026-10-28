# Sea Craft — e-commerce homepage preview

A static preview of a shop front for a Mauritian artisan craft studio:
shells, model ships, resin and island wood.

## Viewing it

**Live:** published to GitHub Pages from this branch by
`.github/workflows/pages.yml` on every push.

- `/` — the shop, with a palette switcher at the bottom of the screen
- `/compare.html` — all three palettes side by side, scrolling together

Or open `index.html` straight off disk. No server, no build step, no network
calls — the one thing that needs a server is `compare.html`, which measures the
previews inside it and falls back to a fixed height over `file://`.

Three palettes ship on the same layout:

- `?theme=client` — blue & grey, as briefed
- `?theme=balanced` — blue, grey & sand (recommended)
- `?theme=lagoon` — lagoon & driftwood, from the reference photo

Add `&ui=0` to hide the switcher for clean screenshots.

Both pages carry `noindex, nofollow`: this is unreleased client work and should
not turn up in a search for the client's name.

## What's in here

```
index.html              the homepage
compare.html            all three palettes side by side
assets/css/style.css    all styling; palettes are at the top
assets/css/fonts.css    self-hosted Fraunces + Jost
assets/js/preview.js    sticky header + palette switcher (preview only)
assets/img/             product photography, turtle watermark, logo
previews/               rendered screenshots (not deployed)
.github/workflows/      GitHub Pages deploy
WORDPRESS-NOTES.md      how this maps onto a WordPress + WooCommerce build
```

## Status

This is a design preview, not a shop. The product photographs are the client's
own, but nothing is wired up: the cart, the prices, the stock counts, the
review quotes and the product descriptions are all placeholder.

Two images carried the old "Sea Power" branding (the storefront neon and one
product shot) and have been cropped to remove it, since the business is being
rebranded as Sea Craft Ltd. See WORDPRESS-NOTES.md section 5.
