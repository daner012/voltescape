import { DEFAULT_CURRENCY, ORIGIN, type Destination } from "./destinations";

export type Partner = "aviasales" | "klook" | "yesim" | "kiwitaxi";

export function affiliateMarker() {
  return process.env.TRAVELPAYOUTS_MARKER || "734712";
}

function isoDate(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function addDays(value: string, days: number) {
  const date = new Date(`${value}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function ddmm(value: string) {
  const [, month, day] = value.split("-");
  return `${day}${month}`;
}

export function aviasalesUrl(destination: Pick<Destination, "iata">, options: { departDate?: string; returnDate?: string; origin?: string; currency?: string } = {}) {
  const departDate = options.departDate || isoDate(18);
  const returnDate = options.returnDate || addDays(departDate, 3);
  const origin = options.origin || ORIGIN;
  const currency = (options.currency || DEFAULT_CURRENCY).toLowerCase();

  // English, round-trip deep link on the international Aviasales domain.
  // Route encodes a round trip: ORIGIN + departDDMM + DESTINATION + returnDDMM + passengers.
  const route = `${origin}${ddmm(departDate)}${destination.iata}${ddmm(returnDate)}1`;
  const params = new URLSearchParams({
    marker: affiliateMarker(),
    currency,
    locale: "en",
  });

  return `https://www.aviasales.com/search/${route}?${params.toString()}`;
}

export function partnerUrl(partner: Exclude<Partner, "aviasales">, destination: Destination) {
  // Monetized Travelpayouts affiliate deep links (marker 734712 via tp.media short links).
  const urls = {
    klook: "https://klook.tpo.lu/D9kaX1Le",
    yesim: "https://yesim.tpo.lu/AU9x5GjB",
    kiwitaxi: "https://kiwitaxi.tpo.lu/wnzjfyjy",
  };
  if (partner === "klook" && destination) {
    const query = destination.slug.replace(/-/g, " ");
    return `${urls.klook}?u=${encodeURIComponent(`https://www.klook.com/en-US/search/result/?query=${encodeURIComponent(query)}`)}`;
  }
  return urls[partner];
}

export function trackedUrl(input: {
  partner: Partner;
  destination: Destination;
  ctaId: string;
  pagePath: string;
  outboundUrl: string;
  origin?: string;
}) {
  const params = new URLSearchParams({
    partner: input.partner,
    origin: input.origin || ORIGIN,
    destination: input.destination.iata,
    pagePath: input.pagePath,
    ctaId: input.ctaId,
    url: input.outboundUrl,
  });
  return `/api/redirect?${params.toString()}`;
}
