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
assets/img/             photograph, drawn product placeholders, logo
previews/               rendered screenshots for the client
WORDPRESS-NOTES.md      how this maps onto a WordPress + WooCommerce build
```

## Status

This is a design preview, not a shop. Nothing is wired up: the cart count, the
prices, the reviews and the product copy are placeholders, and every product
image except the terrarium photograph is an illustration we drew to stand in
for real photography.
