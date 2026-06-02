create table if not exists public.price_alerts (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  origin text not null default 'TLV',
  destination text not null,
  budget_eur numeric,
  depart_date date,
  return_date date,
  preferences jsonb not null default '{}'::jsonb,
  consent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.affiliate_clicks (
  id uuid primary key default gen_random_uuid(),
  partner text not null,
  origin text,
  destination text,
  page_path text,
  cta_id text,
  outbound_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.deal_snapshots (
  id uuid primary key default gen_random_uuid(),
  origin text not null default 'TLV',
  destination text not null,
  live_price_eur numeric,
  target_min_eur numeric,
  target_max_eur numeric,
  score integer,
  source text not null,
  fetched_at timestamptz not null default now()
);

create index if not exists price_alerts_email_idx on public.price_alerts (email);
create index if not exists price_alerts_route_idx on public.price_alerts (origin, destination);
create index if not exists affiliate_clicks_partner_idx on public.affiliate_clicks (partner);
create index if not exists affiliate_clicks_route_idx on public.affiliate_clicks (origin, destination);
create index if not exists deal_snapshots_route_idx on public.deal_snapshots (origin, destination, fetched_at desc);

alter table public.price_alerts enable row level security;
alter table public.affiliate_clicks enable row level security;
alter table public.deal_snapshots enable row level security;

drop policy if exists "service role can manage price alerts" on public.price_alerts;
create policy "service role can manage price alerts"
  on public.price_alerts
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

drop policy if exists "service role can manage affiliate clicks" on public.affiliate_clicks;
create policy "service role can manage affiliate clicks"
  on public.affiliate_clicks
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

drop policy if exists "service role can manage deal snapshots" on public.deal_snapshots;
create policy "service role can manage deal snapshots"
  on public.deal_snapshots
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

drop policy if exists "anon can insert price alerts" on public.price_alerts;
create policy "anon can insert price alerts"
  on public.price_alerts
  for insert
  to anon
  with check (true);

drop policy if exists "anon can insert affiliate clicks" on public.affiliate_clicks;
create policy "anon can insert affiliate clicks"
  on public.affiliate_clicks
  for insert
  to anon
  with check (true);

drop policy if exists "anon can insert deal snapshots" on public.deal_snapshots;
create policy "anon can insert deal snapshots"
  on public.deal_snapshots
  for insert
  to anon
  with check (true);
