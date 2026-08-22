# Webinar offer pricing, homepage popup, and pixel backup

## Thank-you page link

Your thank-you page lives at `/thank-you`:

- Preview: `https://id-preview--c3a258f8-89f5-4e37-aee4-a5b4753c6975.lovable.app/thank-you`
- After publishing: `https://<your-domain>/thank-you`

Paste that URL into the Razorpay payment button's post-payment redirect/callback setting so buyers come back to our site and the conversion event fires.

## 1. Meta Pixel backup snippet

Add the exact base pixel code (and the `<noscript>` tracking image) directly into the page HTML head/body via the root route, alongside the existing JS-based pixel, guarded so the pixel only initializes once and `PageView` is not double-counted. This gives a hardcoded fallback if the module-based init ever fails.

## 2. Offer pricing: strike ₹200, show ₹59

Everywhere the price appears on `/registerations`:

- Show `₹200` struck through, next to `₹59` as the live price, with a small "Limited time offer" style label.
- CTA buttons read "Reserve My Seat — ₹59" with the ₹200 struck through beside the price.
- FAQ copy referencing ₹59 stays accurate.

Only the displayed price changes; the actual amount charged stays ₹59.

## 3. Webinar popup on the landing page

A modal that appears shortly after someone lands on the homepage:

- Auto-opens ~2 seconds after page load, once per session (dismissed state stored in `sessionStorage`, so it doesn't nag on every navigation).
- Content: workshop name, 26th August date, the ₹200 struck / ₹59 offer price, one line of value, and a primary "Reserve My Seat — ₹59" button linking to `/registerations`.
- Closeable with the X, backdrop click, or Escape; matches the site's white/black/red styling with serif heading.
- Fires an `InitiateCheckout` pixel event when the popup CTA is clicked.

## Technical notes

- `src/routes/__root.tsx`: inline pixel `<script>` + `<noscript>` via the route `scripts`/`shellComponent`, with a guard against duplicate init.
- `src/routes/registerations.tsx`: price display updates in hero badge, pricing card, and both CTAs.
- New `src/components/site/WebinarPopup.tsx`, rendered from `src/routes/index.tsx`.
- No backend or database changes.
