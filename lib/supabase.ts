type InsertResult = { ok: boolean; status?: number; error?: string; missingConfig?: boolean };

function supabaseConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

export async function insertSupabase(table: string, payload: Record<string, unknown>): Promise<InsertResult> {
  const { url, serviceKey } = supabaseConfig();
  if (!url || !serviceKey) {
    return { ok: false, error: "Storage is not configured", missingConfig: true };
  }

  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return { ok: false, status: response.status, error: await response.text() };
  }

  return { ok: true, status: response.status };
}
