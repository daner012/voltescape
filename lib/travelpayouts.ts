import { DEFAULT_CURRENCY, ORIGIN, destinations, getDestination, type Destination } from "./destinations";
import { aviasalesUrl } from "./affiliate";
import { insertSupabase } from "./supabase";

export type DealCard = {
  destination: string;
  slug: string;
  iata: string;
  livePrice: number | null;
  targetRange: [number, number];
  score: number;
  direct: boolean;
  updatedAt: string;
  source: "travelpayouts" | "target-range";
  affiliateUrl: string;
};

type CacheEntry = { expiresAt: number; value: DealCard[] };
const cache = new Map<string, CacheEntry>();

function token() {
  return process.env.TRAVELPAYOUTS_TOKEN;
}

function normalizePrice(record: Record<string, unknown>) {
  const value = record.value ?? record.price ?? record.min_price;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function firstRecord(data: unknown): Record<string, unknown> | null {
  if (!data || typeof data !== "object") return null;
  const objectData = data as Record<string, unknown>;
  const dataField = objectData.data;
  if (Array.isArray(dataField)) return (dataField[0] as Record<string, unknown>) || null;
  if (dataField && typeof dataField === "object") {
    const values = Object.values(dataField as Record<string, unknown>);
    const first = Array.isArray(values[0]) ? values[0][0] : values[0];
    return first && typeof first === "object" ? (first as Record<string, unknown>) : null;
  }
  return null;
}

async function fetchLivePrice(destination: Destination, origin: string, currency: string): Promise<number | null> {
  if (!token()) return null;

  const params = new URLSearchParams({
    origin,
    destination: destination.iata,
    currency,
    one_way: "false",
    direct: destination.direct ? "true" : "false",
    sorting: "price",
    limit: "1",
    page: "1",
    token: token() || "",
  });

  const response = await fetch(`https://api.travelpayouts.com/aviasales/v3/get_latest_prices?${params.toString()}`, {
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) return null;
  const data = await response.json();
  const record = firstRecord(data);
  return record ? normalizePrice(record) : null;
}

export async function getDeals(origin = ORIGIN, currency = DEFAULT_CURRENCY): Promise<DealCard[]> {
  const key = `${origin}:${currency}`;
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && cached.expiresAt > now) return cached.value;

  const value = await Promise.all(
    destinations.map(async (destination) => {
      const livePrice = await fetchLivePrice(destination, origin, currency).catch(() => null);
      return {
        destination: destination.name,
        slug: destination.slug,
        iata: destination.iata,
        livePrice,
        targetRange: destination.targetRange,
        score: destination.score,
        direct: destination.direct,
        updatedAt: new Date().toISOString(),
        source: livePrice ? ("travelpayouts" as const) : ("target-range" as const),
        affiliateUrl: aviasalesUrl(destination, { origin, currency }),
      };
    }),
  );

  await Promise.all(
    value.map((deal) =>
      insertSupabase("deal_snapshots", {
        origin,
        destination: deal.iata,
        live_price_eur: deal.livePrice,
        target_min_eur: deal.targetRange[0],
        target_max_eur: deal.targetRange[1],
        score: deal.score,
        source: deal.source,
      }).catch(() => ({ ok: false })),
    ),
  );

  cache.set(key, { value, expiresAt: now + 1000 * 60 * 30 });
  return value;
}

export async function getRouteDeal(input: { origin?: string; destination: string; currency?: string; departDate?: string; returnDate?: string }) {
  const destination = getDestination(input.destination);
  if (!destination) return null;

  const origin = input.origin || ORIGIN;
  const currency = input.currency || DEFAULT_CURRENCY;
  const livePrice = await fetchLivePrice(destination, origin, currency).catch(() => null);

  return {
    destination: destination.name,
    iata: destination.iata,
    livePrice,
    targetRange: destination.targetRange,
    source: livePrice ? "travelpayouts" : "target-range",
    bookingUrl: aviasalesUrl(destination, {
      origin,
      currency,
      departDate: input.departDate,
      returnDate: input.returnDate,
    }),
  };
}
