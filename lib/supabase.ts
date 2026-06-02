type InsertResult = { ok: boolean; status?: number; error?: string; missingConfig?: boolean };

const fallbackSupabaseUrl = "https://ihmyqhbujomjxitzkcdo.supabase.co";
const fallbackSupabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobXlxaGJ1am9tanhpdHprY2RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzY3NTQsImV4cCI6MjA5NTcxMjc1NH0.WItHdOcapuB5TboNJm2wDK_yPaalPbkSyDXqLHelorM";

function supabaseConfig() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackSupabaseAnonKey;

  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackSupabaseUrl,
    key: serviceKey || anonKey,
  };
}

export async function insertSupabase(table: string, payload: Record<string, unknown>): Promise<InsertResult> {
  const { url, key } = supabaseConfig();
  if (!url || !key) {
    return { ok: false, error: "Storage is not configured", missingConfig: true };
  }

  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
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
