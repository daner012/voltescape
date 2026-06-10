import { NextResponse } from "next/server";
import { addBrevoContact } from "@/lib/brevo";
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
    return NextResponse.json({ ok: false, error: "נדרשת כתובת אימייל תקינה" }, { status: 400 });
  }

  if (!body.destination || !getDestination(body.destination)) {
    return NextResponse.json({ ok: false, error: "צריך לבחור יעד נתמך" }, { status: 400 });
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

  // Mirror the contact to Brevo (email service) so the welcome automation fires.
  // Runs regardless of Supabase result: even if cloud storage is briefly down,
  // the contact is captured. Never blocks or fails the signup (no-op without config).
  await addBrevoContact({
    email: body.email,
    destination: body.destination,
    origin: body.origin || ORIGIN,
  });

  if (!result.ok) {
    // Cloud storage not ready yet (missing config or RLS not permitting inserts).
    // Degrade gracefully: let the client save the alert on-device and show a friendly Hebrew message,
    // instead of surfacing a hard error to the visitor.
    return NextResponse.json(
      {
        ok: false,
        fallback: "local",
        error: "שמרנו את ההתראה במכשיר שלך. התראות המייל יופעלו בקרוב.",
      },
      { status: 202 },
    );
  }

  return NextResponse.json({ ok: true, mode: "cloud" });
}
