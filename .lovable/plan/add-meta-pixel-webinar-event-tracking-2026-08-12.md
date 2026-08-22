# Add Meta Pixel + Webinar Event Tracking

## Goal
Install the Meta Pixel (ID: `1631441611994369`) across the GetIntoD2C site, track page views on every route change, and fire conversion events on the `/registerations` webinar flow.

## What will change

1. **Base pixel in `<head>`**
   - Inject the Meta Pixel base script in `src/routes/__root.tsx`.
   - Load `fbevents.js` and call `fbq('init', '1631441611994369')`.
   - Fire the initial `PageView` event.

2. **SPA page-view tracking**
   - Add a small helper that calls `fbq('track', 'PageView')` on every TanStack Router route change.
   - Attach it in `__root.tsx` via `useRouter().subscribe` or a `useEffect` watching `location.pathname`.

3. **Webinar conversion events on `/registerations`**
   - Fire `fbq('track', 'InitiateCheckout', { value: 59, currency: 'INR' })` when the user clicks the Razorpay "Reserve My Seat" button.
   - Fire `fbq('track', 'Purchase', { value: 59, currency: 'INR' })` on the `/thank-you` page (post-payment confirmation page).
   - Fire `fbq('track', 'Lead')` as a fallback on the button click if Razorpay confirmation cannot be observed directly.

4. **No external secrets required**
   - The Pixel ID is public by design and can live in the browser bundle.

## Verification
- Build the project successfully.
- Use the Meta Pixel Helper browser extension to confirm the pixel loads and fires `PageView` on navigation.
- Confirm `InitiateCheckout` and `Purchase` events fire on the registration and thank-you pages.
