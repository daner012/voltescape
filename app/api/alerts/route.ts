import { NextResponse } from "next/server";
import { getDestination, ORIGIN } from "@/lib/destinations";
import { insertSupabase } from "@/lib/supabase";

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        email?: string;
        origin?: string;
        destination?: string;
        budgetEur?: number;
        departDate?: string;
        returnDate?: string;
        preferences?: Record<string, unknown>;
      }
    | null;

  if (!body?.email || !validEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }

  if (!body.destination || !getDestination(body.destination)) {
    return NextResponse.json({ ok: false, error: "Supported destination is required" }, { status: 400 });
  }

  const result = await insertSupabase("price_alerts", {
    email: body.email,
    origin: body.origin || ORIGIN,
    destination: body.destination,
    budget_eur: body.budgetEur || null,
    depart_date: body.departDate || null,
    return_date: body.returnDate || null,
    preferences: body.preferences || {},
    consent_at: new Date().toISOString(),
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error || "Supabase insert failed" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
