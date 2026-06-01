import { NextResponse } from "next/server";
import { DEFAULT_CURRENCY, ORIGIN } from "@/lib/destinations";
import { getDeals } from "@/lib/travelpayouts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin") || ORIGIN;
  const currency = searchParams.get("currency") || DEFAULT_CURRENCY;
  const deals = await getDeals(origin, currency);
  return NextResponse.json({ deals });
}
