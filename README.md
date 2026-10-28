# Sea Craft — e-commerce homepage preview

A static preview of a shop front for a Mauritian artisan craft studio:
shells, model ships, resin and island wood.

## Viewing it

Open `index.html` in a browser. No server, no build step, no network calls.

Three palettes ship on the same layout. Use the switcher at the bottom of the
page, or load directly:

- `index.html?theme=client` — blue & grey, as briefed
- `index.html?theme=balanced` — blue, grey & sand (recommended)
- `index.html?theme=lagoon` — lagoon & driftwood, from the reference photo

Add `&ui=0` to hide the switcher for clean screenshots.

## What's in here

```
index.html              the homepage
assets/css/style.css    all styling; palettes are at the top
assets/css/fonts.css    self-hosted Fraunces + Jost
assets/js/preview.js    sticky header + palette switcher (preview only)
assets/img/             product photography, turtle watermark, logo
previews/               rendered screenshots for the client
WORDPRESS-NOTES.md      how this maps onto a WordPress + WooCommerce build
```

## Status

This is a design preview, not a shop. The product photographs are the client's
own, but nothing is wired up: the cart, the prices, the stock counts, the
review quotes and the product descriptions are all placeholder.

Two images carried the old "Sea Power" branding (the storefront neon and one
product shot) and have been cropped to remove it, since the business is being
rebranded as Sea Craft Ltd. See WORDPRESS-NOTES.md section 5.
