import { NextResponse } from "next/server";
import { trackedUrl } from "@/lib/affiliate";
import { getDestination, ORIGIN } from "@/lib/destinations";
import { getRouteDeal } from "@/lib/travelpayouts";

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

function validIsoDate(value: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : value;
}

function roundTripDates(departDateParam: string | null, returnDateParam: string | null) {
  const departDate = validIsoDate(departDateParam) || isoDate(18);
  const requestedReturn = validIsoDate(returnDateParam);
  const returnDate = requestedReturn && requestedReturn > departDate ? requestedReturn : addDays(departDate, 3);

  return { departDate, returnDate };
}

function passengerCount(value: string | null) {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n)) return 1;
  return Math.min(9, Math.max(1, n));
}

function withPassengers(bookingUrl: string, passengers: number) {
  if (passengers <= 1) return bookingUrl;
  try {
    const url = new URL(bookingUrl);
    // Aviasales path encodes the trip as ORIGIN + DDMM + DEST + DDMM + passengers.
    const updated = url.pathname.replace(/^(\/search\/.*[A-Za-z]{3}\d{4})\d+$/, `$1${passengers}`);
    if (updated !== url.pathname) {
      url.pathname = updated;
      return url.toString();
    }
  } catch {
    // fall through to the original url
  }
  return bookingUrl;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin") || ORIGIN;
  const destinationCode = searchParams.get("destination");
  const passengers = passengerCount(searchParams.get("passengers"));
  const { departDate, returnDate } = roundTripDates(searchParams.get("departDate"), searchParams.get("returnDate"));

  if (!destinationCode) {
    return NextResponse.json({ error: "destination is required" }, { status: 400 });
  }

  const destination = getDestination(destinationCode);
  if (!destination) {
    return NextResponse.json({ error: "unsupported destination" }, { status: 404 });
  }

  const deal = await getRouteDeal({ origin, destination: destinationCode, departDate, returnDate });
  if (!deal) {
    return NextResponse.json({ error: "route unavailable" }, { status: 404 });
  }

  return NextResponse.json({
    ...deal,
    departDate,
    returnDate,
    passengers,
    bookingUrl: trackedUrl({
      partner: "aviasales",
      destination,
      ctaId: "search-submit",
      pagePath: "/",
      outboundUrl: withPassengers(deal.bookingUrl, passengers),
      origin,
    }),
  });
}
