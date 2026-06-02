import { NextResponse } from "next/server";
import { affiliateMarker, type Partner } from "@/lib/affiliate";
import { insertSupabase } from "@/lib/supabase";

const partners = new Set<Partner>(["aviasales", "klook", "yesim", "kiwitaxi"]);
const allowedHosts = [
  "www.aviasales.com",
  "aviasales.com",
  "search.aviasales.com",
  "www.klook.com",
  "klook.com",
  "yesim.app",
  "www.yesim.app",
  "kiwitaxi.com",
  "www.kiwitaxi.com",
];

function safeUrl(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (!["https:"].includes(url.protocol)) return null;
    if (!allowedHosts.includes(url.hostname)) return null;
    return url;
  } catch {
    return null;
  }
}

function safeAviasalesUrl(url: URL, requestParams: URLSearchParams) {
  const marker = url.searchParams.get("marker");
  const origin = url.searchParams.get("origin_iata");
  const destination = url.searchParams.get("destination_iata");
  const currency = url.searchParams.get("currency");
  const locale = url.searchParams.get("locale");
  const oneWay = url.searchParams.get("one_way");
  const legacyOneWay = url.searchParams.get("oneway");

  if (marker !== affiliateMarker()) return false;
  if (origin !== (requestParams.get("origin") || "TLV")) return false;
  if (destination !== requestParams.get("destination")) return false;
  if (currency !== "EUR") return false;
  if (locale !== "en-us") return false;
  if (oneWay !== "false") return false;
  if (legacyOneWay !== "0") return false;

  return true;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const partner = searchParams.get("partner") as Partner | null;
  const url = safeUrl(searchParams.get("url"));

  if (!partner || !partners.has(partner) || !url) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (partner === "aviasales" && !safeAviasalesUrl(url, searchParams)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  await insertSupabase("affiliate_clicks", {
    partner,
    origin: searchParams.get("origin"),
    destination: searchParams.get("destination"),
    page_path: searchParams.get("pagePath"),
    cta_id: searchParams.get("ctaId"),
    outbound_url: url.toString(),
  }).catch(() => null);

  return NextResponse.redirect(url);
}
