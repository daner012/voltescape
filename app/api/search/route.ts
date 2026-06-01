import { NextResponse } from "next/server";
import { trackedUrl } from "@/lib/affiliate";
import { getDestination, ORIGIN } from "@/lib/destinations";
import { getRouteDeal } from "@/lib/travelpayouts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin") || ORIGIN;
  const destinationCode = searchParams.get("destination");
  const departDate = searchParams.get("departDate") || undefined;
  const returnDate = searchParams.get("returnDate") || undefined;

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
    bookingUrl: trackedUrl({
      partner: "aviasales",
      destination,
      ctaId: "search-submit",
      pagePath: "/",
      outboundUrl: deal.bookingUrl,
      origin,
    }),
  });
}
