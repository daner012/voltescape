import { DEFAULT_CURRENCY, ORIGIN, type Destination } from "./destinations";

export type Partner = "aviasales" | "klook" | "yesim" | "kiwitaxi";

export function affiliateMarker() {
  return process.env.TRAVELPAYOUTS_MARKER || "734712";
}

export function aviasalesUrl(destination: Pick<Destination, "iata">, options: { departDate?: string; returnDate?: string; origin?: string; currency?: string } = {}) {
  const params = new URLSearchParams({
    origin_iata: options.origin || ORIGIN,
    destination_iata: destination.iata,
    adults: "1",
    children: "0",
    infants: "0",
    trip_class: "0",
    one_way: "false",
    oneway: "0",
    locale: "en-us",
    currency: options.currency || DEFAULT_CURRENCY,
    marker: affiliateMarker(),
  });

  if (options.departDate) params.set("depart_date", options.departDate);
  if (options.returnDate) params.set("return_date", options.returnDate);

  return `https://www.aviasales.com/?${params.toString()}`;
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
