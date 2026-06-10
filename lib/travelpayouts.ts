import { DEFAULT_CURRENCY, ORIGIN, destinations, getDestination, type Destination } from "./destinations";
import { aviasalesUrl } from "./affiliate";
import { insertSupabase } from "./supabase";

export type DealCard = {
  destination: string;
  slug: string;
  iata: string;
  livePrice: number | null;
  departDate?: string;
  returnDate?: string;
  targetRange: [number, number];
  score: number;
  dealTag: string;
  savingsSignal: string;
  urgencyLabel: string;
  direct: boolean;
  updatedAt: string;
  source: "travelpayouts" | "target-range";
  affiliateUrl: string;
  dateOptions: { departDate?: string; returnDate?: string; price: number | null; url: string }[];
};

type CacheEntry = { expiresAt: number; value: DealCard[] };
type PriceCandidate = { livePrice: number; departDate?: string; returnDate?: string; direct?: boolean };
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

function records(data: unknown): Record<string, unknown>[] {
  if (!data || typeof data !== "object") return [];
  const objectData = data as Record<string, unknown>;
  const dataField = objectData.data;
  if (Array.isArray(dataField)) return dataField.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object");
  if (dataField && typeof dataField === "object") {
    const values = Object.values(dataField as Record<string, unknown>);
    return values
      .flatMap((value) => (Array.isArray(value) ? value : [value]))
      .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object");
  }
  return [];
}

function normalizeDate(value: unknown) {
  if (typeof value !== "string" || !value) return undefined;
  return value.slice(0, 10);
}

function normalizeBoolean(value: unknown) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true" || value === "1";
  return undefined;
}

function isWeekendTrip(departDate?: string, returnDate?: string) {
  if (!departDate || !returnDate) return false;
  const departDay = new Date(`${departDate}T12:00:00Z`).getUTCDay();
  const returnDay = new Date(`${returnDate}T12:00:00Z`).getUTCDay();
  return [4, 5, 6].includes(departDay) && [0, 1, 6].includes(returnDay);
}

function clampScore(value: number) {
  return Math.max(60, Math.min(99, Math.round(value)));
}

function scoreDeal(destination: Destination, candidate: PriceCandidate | null) {
  // Base score leaves headroom so only genuinely exceptional prices reach 97-99.
  let score = destination.score - 6;
  const floor = destination.targetRange[0];
  const ceiling = destination.targetRange[1];

  if (candidate) {
    if (candidate.livePrice <= floor) {
      score += 10;
    } else if (candidate.livePrice <= ceiling) {
      // Graded 0-7 by where the price sits inside the target range (lower = better).
      const position = (ceiling - candidate.livePrice) / Math.max(1, ceiling - floor);
      score += Math.round(7 * position);
    } else {
      // Above range: penalty grows with the overshoot.
      const overshoot = (candidate.livePrice - ceiling) / ceiling;
      score -= Math.min(12, 4 + Math.round(10 * overshoot));
    }

    if (candidate.livePrice <= 320) score += 2;
    if (candidate.direct ?? destination.direct) score += 2;
    if (isWeekendTrip(candidate.departDate, candidate.returnDate)) score += 2;
  } else {
    if (floor <= 280) score += 2;
    if (destination.direct) score += 1;
  }

  return clampScore(score);
}

function savingsSignal(destination: Destination, candidate: PriceCandidate | null) {
  if (!candidate) return `טווח ₪${destination.targetRange[0]}-${destination.targetRange[1]}`;
  if (candidate.livePrice <= destination.targetRange[0]) return "מתחת לטווח";
  if (candidate.livePrice <= destination.targetRange[1]) return "בתוך הטווח";
  return "מעל הטווח";
}

function dealTag(destination: Destination, candidate: PriceCandidate | null) {
  const lowSignal = candidate?.livePrice ?? destination.targetRange[0];
  if (lowSignal <= 320) return "מתחת ל-₪320";
  if (candidate && isWeekendTrip(candidate.departDate, candidate.returnDate)) return "מציאת סופ״ש";
  if (candidate?.direct ?? destination.direct) return "ישיר מתל אביב";
  if (destination.tags.some((tag) => ["יוקרה", "אופנה", "פרימיום", "עיצוב"].includes(tag))) return "יוקרה משתלמת";
  return candidate ? "נבדק עכשיו" : "יעד חכם";
}

function urgencyLabel(destination: Destination, candidate: PriceCandidate | null) {
  if (!candidate) return "מחיר עדכני";
  if (candidate.livePrice <= destination.targetRange[0]) return "מחיר נמוך נדיר";
  if (isWeekendTrip(candidate.departDate, candidate.returnDate)) return "חלון סופ״ש";
  return "נבדק עכשיו";
}

function candidateFromRecord(record: Record<string, unknown>): PriceCandidate | null {
  const livePrice = normalizePrice(record);
  if (!livePrice) return null;

  return {
    livePrice,
    departDate: normalizeDate(record.depart_date ?? record.departure_at),
    returnDate: normalizeDate(record.return_date ?? record.return_at),
    direct: normalizeBoolean(record.direct),
  };
}

async function fetchLiveCandidates(destination: Destination, origin: string, currency: string, limit = 5): Promise<PriceCandidate[]> {
  if (!token()) return [];

  const params = new URLSearchParams({
    origin,
    destination: destination.iata,
    currency,
    one_way: "false",
    sorting: "price",
    limit: String(limit),
    page: "1",
    token: token() || "",
  });

  const response = await fetch(`https://api.travelpayouts.com/aviasales/v3/get_latest_prices?${params.toString()}`, {
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) return [];
  const data = await response.json();
  const recs = records(data);
  const maxAgeMs = 5 * 24 * 60 * 60 * 1000;
  const isFresh = (r: Record<string, unknown>) => {
    if (r.actual === false) return false;
    const f = r.found_at;
    if (typeof f === "string") {
      const ts = new Date(f).getTime();
      if (!Number.isNaN(ts) && Date.now() - ts > maxAgeMs) return false;
    }
    return true;
  };
  const fresh = recs.filter(isFresh);
  const pool = fresh.length ? fresh : recs;
  return pool
    .map(candidateFromRecord)
    .filter((candidate): candidate is PriceCandidate => Boolean(candidate))
    .sort((a, b) => a.livePrice - b.livePrice)
    .slice(0, limit);
}

function buildDeal(destination: Destination, origin: string, currency: string, candidate: PriceCandidate | null, candidates: PriceCandidate[] = []): DealCard {
  const score = scoreDeal(destination, candidate);
  const optionPool = candidates.length ? candidates : candidate ? [candidate] : [];
  return {
    destination: destination.name,
    slug: destination.slug,
    iata: destination.iata,
    livePrice: candidate?.livePrice ?? null,
    departDate: candidate?.departDate,
    returnDate: candidate?.returnDate,
    targetRange: destination.targetRange,
    score,
    dealTag: dealTag(destination, candidate),
    savingsSignal: savingsSignal(destination, candidate),
    urgencyLabel: urgencyLabel(destination, candidate),
    direct: candidate?.direct ?? destination.direct,
    updatedAt: new Date().toISOString(),
    source: candidate ? "travelpayouts" : "target-range",
    affiliateUrl: aviasalesUrl(destination, {
      origin,
      currency,
      departDate: candidate?.departDate,
      returnDate: candidate?.returnDate,
    }),
    dateOptions: optionPool.map((c) => ({
      departDate: c.departDate,
      returnDate: c.returnDate,
      price: c.livePrice ?? null,
      url: aviasalesUrl(destination, { origin, currency, departDate: c.departDate, returnDate: c.returnDate }),
    })),
  };
}

function sortDeals(a: DealCard, b: DealCard) {
  if (b.score !== a.score) return b.score - a.score;
  if (a.livePrice && b.livePrice) return a.livePrice - b.livePrice;
  if (a.livePrice) return -1;
  if (b.livePrice) return 1;
  return a.targetRange[0] - b.targetRange[0];
}

export async function getDeals(origin = ORIGIN, currency = DEFAULT_CURRENCY, limit = 24): Promise<DealCard[]> {
  const key = `${origin}:${currency}:${limit}`;
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && cached.expiresAt > now) return cached.value;

  const value = await Promise.all(
    destinations.map(async (destination) => {
      const candidates = await fetchLiveCandidates(destination, origin, currency, 5).catch(() => []);
      return buildDeal(destination, origin, currency, candidates[0] ?? null, candidates);
    }),
  );

  // Only show deals departing within the next ~6 months (keeps the list fresh).
  const horizonMs = 183 * 24 * 60 * 60 * 1000;
  const sorted = value
    .filter((deal) => {
      if (!deal.departDate) return true;
      const dep = new Date(deal.departDate).getTime();
      if (Number.isNaN(dep)) return true;
      return dep - now <= horizonMs;
    })
    .sort(sortDeals)
    .slice(0, limit);

  await Promise.all(
    sorted.map((deal) =>
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

  cache.set(key, { value: sorted, expiresAt: now + 1000 * 60 * 30 });
  return sorted;
}

export async function getRouteDeal(input: { origin?: string; destination: string; currency?: string; departDate?: string; returnDate?: string }) {
  const destination = getDestination(input.destination);
  if (!destination) return null;

  const origin = input.origin || ORIGIN;
  const currency = input.currency || DEFAULT_CURRENCY;
  const candidates = await fetchLiveCandidates(destination, origin, currency, 8).catch(() => []);
  const deal = buildDeal(destination, origin, currency, candidates[0] ?? null, candidates);
  const bookingUrl = aviasalesUrl(destination, {
    origin,
    currency,
    departDate: input.departDate || deal.departDate,
    returnDate: input.returnDate || deal.returnDate,
  });

  return {
    ...deal,
    departDate: input.departDate || deal.departDate,
    returnDate: input.returnDate || deal.returnDate,
    affiliateUrl: bookingUrl,
    bookingUrl,
  };
}
