import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "לוח בקרה", robots: { index: false, follow: false } };

type Props = { searchParams: Promise<{ key?: string }> };

type ClickRow = { partner?: string; destination?: string; created_at?: string };
type AlertRow = { email?: string; destination?: string; budget_eur?: number | null; consent_at?: string; created_at?: string };

const C = {
  bg: "#f6f8fb", ink: "#13203a", muted: "#5d6b85", line: "#e6ebf2",
  blue: "#0a84ff", coral: "#ff5a5f", coralStrong: "#f0353b", aqua: "#0e9e8e", amber: "#d9870a",
};

function supa() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ihmyqhbujomjxitzkcdo.supabase.co";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return key ? { url: url.replace(/\/$/, ""), key } : null;
}

async function fetchRows<T>(table: string): Promise<T[]> {
  const cfg = supa();
  if (!cfg) return [];
  const res = await fetch(`${cfg.url}/rest/v1/${table}?select=*&order=created_at.desc&limit=2000`, {
    headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  return (await res.json()) as T[];
}

function within7d(value?: string) {
  if (!value) return false;
  return Date.now() - new Date(value).getTime() <= 7 * 24 * 60 * 60 * 1000;
}

function tally(rows: { k?: string }[]) {
  const map = new Map<string, number>();
  for (const r of rows) {
    const k = r.k || "—";
    map.set(k, (map.get(k) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

const wrap: React.CSSProperties = { fontFamily: "Heebo, system-ui, sans-serif", background: C.bg, color: C.ink, minHeight: "100vh", padding: "40px 24px", direction: "rtl" };
const shell: React.CSSProperties = { maxWidth: 1040, margin: "0 auto" };
const card: React.CSSProperties = { background: "#fff", border: `1px solid ${C.line}`, borderRadius: 18, padding: "22px 24px", boxShadow: "0 8px 24px rgba(19,32,58,.06)" };

export default async function AdminDashboard({ searchParams }: Props) {
  const { key } = await searchParams;
  const token = process.env.ADMIN_TOKEN;
  const cfg = supa();

  if (!cfg || !token) {
    return (
      <main style={wrap}><div style={{ ...shell, maxWidth: 680 }}>
        <h1 style={{ fontSize: 30, fontWeight: 900 }}>לוח הבקרה כמעט מוכן</h1>
        <p style={{ color: C.muted, marginTop: 10, lineHeight: 1.7 }}>
          כדי להפעיל, הוסף ב-Vercel (Project Settings → Environment Variables) שני משתנים:
        </p>
        <div style={{ ...card, marginTop: 16, fontFamily: "monospace", fontSize: 14, lineHeight: 2 }}>
          SUPABASE_SERVICE_ROLE_KEY = <span style={{ color: C.muted }}>(מ-Supabase → Settings → API → service_role)</span><br />
          ADMIN_TOKEN = <span style={{ color: C.muted }}>(סיסמה שתבחר, למשל מחרוזת אקראית)</span>
        </div>
        <p style={{ color: C.muted, marginTop: 16, lineHeight: 1.7 }}>
          אחרי Redeploy, היכנס לכתובת <b>voltescape.com/admin?key=הטוקן-שלך</b>.
        </p>
      </div></main>
    );
  }

  if (key !== token) {
    return (
      <main style={wrap}><div style={{ ...shell, maxWidth: 520 }}>
        <h1 style={{ fontSize: 26, fontWeight: 900 }}>גישה מוגבלת 🔒</h1>
        <p style={{ color: C.muted, marginTop: 10 }}>הוסף את הטוקן לכתובת: <b>/admin?key=...</b></p>
      </div></main>
    );
  }

  const [clicks, alerts] = await Promise.all([fetchRows<ClickRow>("affiliate_clicks"), fetchRows<AlertRow>("price_alerts")]);

  const clicks7 = clicks.filter((r) => within7d(r.created_at)).length;
  const alerts7 = alerts.filter((r) => within7d(r.created_at || r.consent_at)).length;
  const byPartner = tally(clicks.map((r) => ({ k: r.partner })));
  const byDest = tally(clicks.map((r) => ({ k: r.destination }))).slice(0, 8);

  const stat = (label: string, value: number | string, accent: string) => (
    <div style={{ ...card, flex: 1, minWidth: 180 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.muted }}>{label}</div>
      <div style={{ fontSize: 44, fontWeight: 900, color: accent, lineHeight: 1.1, marginTop: 6 }}>{value}</div>
    </div>
  );

  const bars = (rows: [string, number][], max: number) =>
    rows.map(([k, v]) => (
      <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, margin: "10px 0" }}>
        <div style={{ width: 110, fontWeight: 700, fontSize: 15 }}>{k}</div>
        <div style={{ flex: 1, background: C.line, borderRadius: 8, height: 18, overflow: "hidden" }}>
          <div style={{ width: `${Math.max(4, (v / max) * 100)}%`, height: "100%", background: `linear-gradient(90deg, ${C.blue}, ${C.coral})` }} />
        </div>
        <div style={{ width: 48, textAlign: "left", fontWeight: 800 }}>{v}</div>
      </div>
    ));

  const maxPartner = Math.max(1, ...byPartner.map((r) => r[1]));
  const maxDest = Math.max(1, ...byDest.map((r) => r[1]));

  return (
    <main style={wrap}>
      <div style={shell}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900 }}>לוח בקרה — Voltescape</h1>
          <span style={{ color: C.muted, fontSize: 14 }}>עודכן {new Date().toLocaleString("he-IL")}</span>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 20 }}>
          {stat("סך הקליקים", clicks.length, C.ink)}
          {stat("קליקים ב-7 ימים", clicks7, C.blue)}
          {stat("סך הלידים", alerts.length, C.coralStrong)}
          {stat("לידים ב-7 ימים", alerts7, C.aqua)}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div style={card}>
            <h2 style={{ fontSize: 19, fontWeight: 800, marginBottom: 8 }}>קליקים לפי שותף</h2>
            {byPartner.length ? bars(byPartner, maxPartner) : <p style={{ color: C.muted }}>אין נתונים עדיין</p>}
          </div>
          <div style={card}>
            <h2 style={{ fontSize: 19, fontWeight: 800, marginBottom: 8 }}>יעדים מובילים (קליקים)</h2>
            {byDest.length ? bars(byDest, maxDest) : <p style={{ color: C.muted }}>אין נתונים עדיין</p>}
          </div>
        </div>

        <div style={{ ...card, marginTop: 16 }}>
          <h2 style={{ fontSize: 19, fontWeight: 800, marginBottom: 12 }}>לידים אחרונים ({alerts.length})</h2>
          {alerts.length ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
                <thead>
                  <tr style={{ textAlign: "right", color: C.muted, borderBottom: `1px solid ${C.line}` }}>
                    <th style={{ padding: "8px 6px" }}>אימייל</th>
                    <th style={{ padding: "8px 6px" }}>יעד</th>
                    <th style={{ padding: "8px 6px" }}>תקציב ₪</th>
                    <th style={{ padding: "8px 6px" }}>תאריך</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.slice(0, 50).map((a, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.line}` }}>
                      <td style={{ padding: "8px 6px", fontWeight: 600 }}>{a.email || "—"}</td>
                      <td style={{ padding: "8px 6px" }}>{a.destination || "—"}</td>
                      <td style={{ padding: "8px 6px" }}>{a.budget_eur ?? "—"}</td>
                      <td style={{ padding: "8px 6px", color: C.muted }}>
                        {(a.created_at || a.consent_at) ? new Date(a.created_at || a.consent_at!).toLocaleDateString("he-IL") : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: C.muted }}>עדיין אין לידים. ברגע שמישהו נרשם להתראה — הוא יופיע כאן.</p>
          )}
        </div>
      </div>
    </main>
  );
}
