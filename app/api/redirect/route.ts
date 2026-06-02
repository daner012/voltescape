import { NextResponse } from "next/server";
import { affiliateMarker, type Partner } from "@/lib/affiliate";
import { insertSupabase } from "@/lib/supabase";

const partners = new Set<Partner>(["aviasales", "klook", "yesim", "kiwitaxi"]);
const allowedHosts = [
  "www.aviasales.com",
  "aviasales.com",
  "www.klook.com",
  "klook.com",
  "yesim.app",
  "www.yesim.app",
  "kiwitaxi.com",
  "www.kiwitaxi.com",
  "klook.tpo.lu",
  "yesim.tpo.lu",
  "kiwitaxi.tpo.lu",
  "aviasales.tpo.lu",
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
  const currency = url.searchParams.get("currency");
  const locale = url.searchParams.get("locale");
  const origin = requestParams.get("origin") || "TLV";
  const destination = requestParams.get("destination");

  if (url.hostname !== "www.aviasales.com") return false;
  if (!url.pathname.startsWith("/search/")) return false;
  if (marker !== affiliateMarker()) return false;
  if (!currency) return false;
  if (locale !== "en") return false;

  // The round-trip route is ORIGIN + departDDMM + DESTINATION + returnDDMM + passengers.
  const route = url.pathname.slice("/search/".length);
  if (!route.startsWith(origin)) return false;
  if (destination && !route.includes(destination)) return false;
  // origin(3) + ddmm(4) + dest(3) + ddmm(4) + pax(1) = 15 chars; two date blocks => round trip.
  if (route.length < 14) return false;

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
