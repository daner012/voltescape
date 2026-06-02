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

1. Run `node scripts/validate-source.mjs`.
2. Run `git diff --check`.
3. Push to `main` and wait for Vercel status `success`.
4. Run `node scripts/validate-live.mjs`.
5. Open `https://voltescape.com`.
6. Click a homepage flight deal.
7. Confirm it opens `search.aviasales.com/flights/` with `origin_iata=TLV`, a destination IATA, `one_way=false`, `oneway=0`, `currency=EUR`, `locale=en`, and `marker=734712`.
8. Submit a price alert.
9. Confirm Supabase received one `price_alerts` row when Supabase env vars are configured.
10. Confirm Supabase received one `affiliate_clicks` row when Supabase env vars are configured.
11. Open `/sitemap.xml`.
12. Open `/robots.txt`.

## Mandatory Release Flow

Every future change follows this path:

1. Update the Next.js app locally.
2. Run source validation and whitespace checks.
3. Commit with a clear message.
4. Push to GitHub `main`.
5. Wait for Vercel deployment success.
6. Run the live validation script.
7. Smoke test the visible site.

Flight-related changes must preserve all affiliate constraints:

- Aviasales CTAs go through `/api/redirect`.
- No direct Aviasales `href` bypasses click tracking.
- Outbound Aviasales URLs include `marker=734712`.
- Outbound Aviasales URLs include `one_way=false` and `oneway=0`.
- Missing return dates are generated automatically by `/api/search`.
