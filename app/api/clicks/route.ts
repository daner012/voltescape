import { NextResponse } from "next/server";
import type { Partner } from "@/lib/affiliate";
import { insertSupabase } from "@/lib/supabase";

const partners = new Set<Partner>(["aviasales", "klook", "yesim", "kiwitaxi"]);

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        partner?: Partner;
        origin?: string;
        destination?: string;
        pagePath?: string;
        ctaId?: string;
        outboundUrl?: string;
      }
    | null;

  if (!body?.partner || !partners.has(body.partner) || !body.outboundUrl) {
    return NextResponse.json({ ok: false, error: "partner and outboundUrl are required" }, { status: 400 });
  }

  const result = await insertSupabase("affiliate_clicks", {
    partner: body.partner,
    origin: body.origin || null,
    destination: body.destination || null,
    page_path: body.pagePath || null,
    cta_id: body.ctaId || null,
    outbound_url: body.outboundUrl,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error || "Supabase insert failed" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
