# Deploy Voltescape

## Recommended Production Path

Use Vercel for hosting and Supabase for alerts/click tracking, as defined in the implementation plan.

1. Push this folder to a GitHub repo.
2. In Vercel, import the repo.
3. Set the framework preset to Next.js.
4. Add environment variables:
   - `TRAVELPAYOUTS_TOKEN`
   - `TRAVELPAYOUTS_MARKER`
   - `NEXT_PUBLIC_SITE_URL=https://voltescape.com`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Deploy.
6. In Vercel Project Settings → Domains, add:
   - `voltescape.com`
   - `www.voltescape.com`
7. In the domain registrar DNS:
   - Add Vercel's required `A` record for apex domain, as shown in Vercel.
   - Add Vercel's required `CNAME` for `www`, as shown in Vercel.
8. Keep `NEXT_PUBLIC_SITE_URL=https://voltescape.com`.

## Supabase Setup

Run `supabase/schema.sql` in the Supabase SQL editor.

The app writes:

- `price_alerts`
- `affiliate_clicks`
- `deal_snapshots`

## If You Mean MongoDB Atlas

The current implementation follows the approved Supabase plan. If Atlas means MongoDB Atlas, replace `lib/supabase.ts` and the SQL schema with MongoDB insert helpers and collections:

- `price_alerts`
- `affiliate_clicks`
- `deal_snapshots`

Do not put Atlas connection strings in client code. Use server-only env vars in Vercel.

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

## Production Smoke Test

After deploy:

1. Open `https://voltescape.com`.
2. Click a homepage flight deal.
3. Confirm it opens Aviasales with `origin_iata=TLV`, a destination IATA, `currency=EUR`, and `marker`.
4. Submit a price alert.
5. Confirm Supabase received one `price_alerts` row.
6. Confirm Supabase received one `affiliate_clicks` row.
7. Open `/sitemap.xml`.
8. Open `/robots.txt`.
