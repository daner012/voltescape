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
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

`TRAVELPAYOUTS_TOKEN` is used only in server routes. Do not expose it in client code.

## Supabase

Run `supabase/schema.sql` in your Supabase SQL editor.
