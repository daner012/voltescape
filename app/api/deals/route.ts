import { NextResponse } from "next/server";
import { DEFAULT_CURRENCY, ORIGIN } from "@/lib/destinations";
import { getDeals } from "@/lib/travelpayouts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin") || ORIGIN;
  const currency = searchParams.get("currency") || DEFAULT_CURRENCY;
  const requestedLimit = Number(searchParams.get("limit") || 24);
  const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 48) : 24;
  const deals = await getDeals(origin, currency, limit);
  return NextResponse.json({ deals });
}
