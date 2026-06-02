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

export function aviasalesUrl(destination: Pick<Destination, "iata">, options: { departDate?: string; returnDate?: string; origin?: string; currency?: string } = {}) {
  const departDate = options.departDate || isoDate(18);
  const returnDate = options.returnDate || addDays(departDate, 3);
  const params = new URLSearchParams({
    origin_iata: options.origin || ORIGIN,
    destination_iata: destination.iata,
    depart_date: departDate,
    return_date: returnDate,
    adults: "1",
    children: "0",
    infants: "0",
    trip_class: "0",
    one_way: "false",
    oneway: "0",
    locale: "en",
    currency: options.currency || DEFAULT_CURRENCY,
    marker: affiliateMarker(),
  });

  return `https://search.aviasales.com/flights/?${params.toString()}`;
}

export function partnerUrl(partner: Exclude<Partner, "aviasales">, destination: Destination) {
  const campaign = `utm_source=voltescape&utm_medium=affiliate&utm_campaign=${destination.slug}`;
  const query = encodeURIComponent(destination.name);
  const urls = {
    klook: `https://www.klook.com/en-US/search/result/?query=${query}&${campaign}`,
    yesim: `https://yesim.app/?${campaign}`,
    kiwitaxi: `https://kiwitaxi.com/en/search?to=${query}&${campaign}`,
  };
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
