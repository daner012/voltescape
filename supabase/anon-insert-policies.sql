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
