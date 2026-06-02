import Link from "next/link";
import type { DealCard } from "@/lib/travelpayouts";

function priceLabel(deal: DealCard) {
  if (deal.livePrice) return `Live from €${deal.livePrice}`;
  return `Target €${deal.targetRange[0]}-${deal.targetRange[1]}`;
}

function sourceLabel(deal: DealCard) {
  return deal.source === "travelpayouts" ? "Live price" : "Target range";
}

function dateLabel(deal: DealCard) {
  if (deal.departDate && deal.returnDate) return `${deal.departDate} → ${deal.returnDate}`;
  if (deal.departDate) return `Depart ${deal.departDate}`;
  return "Flexible dates";
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
            <p className="deal-meta">{dateLabel(deal)}</p>
          </div>
          <div>
            <div className="row">
              <span className="chip">Deal score {deal.score}/100</span>
              <span className="chip">{deal.direct ? "Direct preferred" : "Flexible route"}</span>
              <span className="chip">{deal.savingsSignal}</span>
            </div>
            <div className="meter" aria-label={`Deal score ${deal.score} out of 100`}>
              <span style={{ width: `${deal.score}%` }} />
            </div>
          </div>
          <a className="button primary" href={deal.affiliateUrl} target="_blank" rel="nofollow sponsored noopener">
            {deal.livePrice ? "View live deal" : "Check live deal"}
          </a>
          <Link className="small-link" href={`/destinations/${deal.slug}`}>
            Open city guide
          </Link>
        </article>
      ))}
    </div>
  );
}
