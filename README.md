# Voltescape Revenue App

Premium Next.js travel-deals app for Voltescape, optimized for affiliate clicks, server-side Travelpayouts pricing, Supabase alert capture, and SEO route pages.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and fill:

- `TRAVELPAYOUTS_TOKEN`
- `TRAVELPAYOUTS_MARKER`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

`TRAVELPAYOUTS_TOKEN` is used only in server routes. Do not expose it in client code.

`NEXT_PUBLIC_META_PIXEL_ID` enables Meta Pixel tracking for page views, affiliate clicks, flight searches, quiz deal opens and price-alert leads.

## Supabase

Run `supabase/schema.sql` in your Supabase SQL editor.

## Release Guard

Every production change should keep the affiliate path locked:

```bash
npm run validate
npm run validate:live
```

`validate` checks source-level rules: 23 destinations, server-only Travelpayouts token usage, English Aviasales host, round-trip flags, and marker fallback `734712`.

`validate:live` checks the deployed site: homepage status, Hot Deals rendering, destination-specific Aviasales links, auto-generated return dates, good redirect behavior, and blocking Aviasales redirects that are missing the affiliate marker.

When `npm` is unavailable in this environment, run the same checks directly:

```bash
node scripts/validate-source.mjs
git diff --check
node scripts/validate-live.mjs
```
