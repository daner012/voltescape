import Link from "next/link";
import type { DealCard } from "@/lib/travelpayouts";

const DOW = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];

function fmtDate(iso: string) {
  const date = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  const day = DOW[date.getUTCDay()];
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${day}׳ ${dd}.${mm}`;
}

function priceLabel(deal: DealCard) {
  if (deal.livePrice) return `החל מ-₪${deal.livePrice}`;
  return `בסביבות ₪${deal.targetRange[0]}-${deal.targetRange[1]}`;
}

function sourceLabel(deal: DealCard) {
  return deal.source === "travelpayouts" ? "מחיר חי" : "טווח יעד";
}

function dateLabel(deal: DealCard) {
  if (deal.departDate && deal.returnDate) return `${fmtDate(deal.departDate)} → ${fmtDate(deal.returnDate)}`;
  if (deal.departDate) return `יציאה ${fmtDate(deal.departDate)}`;
  return "תאריכים גמישים";
}


function shareLinks(deal: DealCard) {
  const url = `https://www.voltescape.com/destinations/${deal.slug}`;
  const text = `✈️ טיסה זולה מתל אביב ל${deal.destination} ${priceLabel(deal)} 👇`;
  return {
    wa: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    tg: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  };
}

export function DealCards({ deals }: { deals: DealCard[] }) {
  return (
    <div className="deal-grid">
      {deals.map((deal) => (
        <article className="deal-card" key={deal.iata}>
          <div className="row">
            <span className="live-badge">{sourceLabel(deal)}</span>
            <span className="iata">TLV → {deal.iata}</span>
          </div>
          <div className="hot-row">
            <span className="hot-tag">{deal.dealTag}</span>
            <span>{deal.urgencyLabel}</span>
          </div>
          <div>
            <h3>{deal.destination}</h3>
            <div className="price">{priceLabel(deal)}</div>
            <p className="deal-meta">
              <bdi dir="ltr">{dateLabel(deal)}</bdi>
            </p>
          </div>
          <div>
            <div className="row">
              <span className="chip">ציון {deal.score}/100</span>
              <span className="chip">{deal.direct ? "עדיף ישיר" : "מסלול גמיש"}</span>
              <span className="chip">{deal.savingsSignal}</span>
            </div>
            <div className="meter" role="img" aria-label={`ציון דיל ${deal.score} מתוך 100`}>
              <span style={{ width: `${deal.score}%` }} />
            </div>
          </div>
          {deal.dateOptions && deal.dateOptions.length > 1 && (
            <details className="date-options" style={{ marginTop: 10 }}>
              <summary style={{ cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, color: "#1d4ed8" }}>
                {deal.dateOptions.length} תאריכים זמינים
              </summary>
              <ul style={{ listStyle: "none", margin: "8px 0 0", padding: 0, display: "grid", gap: 4 }}>
                {deal.dateOptions.map((opt, i) => (
                  <li key={i}>
                    <a href={opt.url} target="_blank" rel="nofollow sponsored noopener" style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: "0.8rem", padding: "6px 8px", borderRadius: 8, background: "rgba(0,0,0,0.05)", color: "inherit", textDecoration: "none" }}>
                      <bdi dir="ltr">{opt.departDate ? fmtDate(opt.departDate) : ""}{opt.returnDate ? ` → ${fmtDate(opt.returnDate)}` : ""}</bdi>
                      <span>{opt.price ? `₪${opt.price}` : ""}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}
          <a className="button primary" href={deal.affiliateUrl} target="_blank" rel="nofollow sponsored noopener">
            {deal.livePrice ? "לדיל" : "בדוק את הדיל"}
          </a>
          <Link className="small-link" href={`/destinations/${deal.slug}`}>
            למדריך העיר
          </Link>
          <div className="share-row" style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <a href={shareLinks(deal).wa} target="_blank" rel="noopener" aria-label={`שיתוף ${deal.destination} בוואטסאפ`} style={{ flex: 1, textAlign: "center", fontSize: "0.78rem", fontWeight: 700, padding: "7px 8px", borderRadius: 10, background: "#25D366", color: "#fff", textDecoration: "none" }}>
              שיתוף בוואטסאפ
            </a>
            <a href={shareLinks(deal).tg} target="_blank" rel="noopener" aria-label={`שיתוף ${deal.destination} בטלגרם`} style={{ flex: 1, textAlign: "center", fontSize: "0.78rem", fontWeight: 700, padding: "7px 8px", borderRadius: 10, background: "#229ED9", color: "#fff", textDecoration: "none" }}>
              שיתוף בטלגרם
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
