import type { Metadata } from "next";
import Link from "next/link";
import { AlertForm } from "@/components/AlertForm";
import { DealCards } from "@/components/DealCards";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { trackedUrl } from "@/lib/affiliate";
import { destinations } from "@/lib/destinations";
import { getDeals } from "@/lib/travelpayouts";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Today's Best Flight Deals From Israel | Voltescape",
  description: "Daily Voltescape deal board for TLV round-trip flight targets, live prices when available, and affiliate-tracked Aviasales CTAs.",
  alternates: { canonical: "/today-best-deals" },
};

export default async function TodayBestDealsPage() {
  const rawDeals = await getDeals("TLV", "EUR", 18);
  const deals = rawDeals.map((deal) => {
    const destination = destinations.find((item) => item.iata === deal.iata)!;
    return {
      ...deal,
      affiliateUrl: trackedUrl({
        partner: "aviasales",
        destination,
        ctaId: `today-best-${destination.slug}`,
        pagePath: "/today-best-deals",
        outboundUrl: deal.affiliateUrl,
      }),
    };
  });
  const topDeal = deals[0];
  const topDestination = destinations.find((destination) => destination.iata === topDeal.iata) || destinations[0];

  return (
    <>
      <Header />
      <main>
        <section className="page-hero shell">
          <span className="kicker">Today&apos;s best deals</span>
          <h1>Fresh TLV flight targets, sorted for action.</h1>
          <p className="lead">
            A daily deal board built for affiliate conversion: cheapest signals first, live Travelpayouts prices when
            available, target ranges when not, and every flight CTA routed through Voltescape tracking.
          </p>
          <div className="actions">
            <a className="button primary" href={topDeal.affiliateUrl} target="_blank" rel="nofollow sponsored noopener">
              Check {topDeal.destination}
            </a>
            <Link className="button secondary" href="/#search">
              Build custom search
            </Link>
          </div>
        </section>

        <section className="shell">
          <div className="deal-board">
            {deals.slice(0, 4).map((deal, index) => (
              <a className="board-row" href={deal.affiliateUrl} target="_blank" rel="nofollow sponsored noopener" key={deal.iata}>
                <span>#{index + 1}</span>
                <strong>TLV → {deal.destination}</strong>
                <em>{deal.livePrice ? `Live from €${deal.livePrice}` : `Target €${deal.targetRange[0]}-${deal.targetRange[1]}`}</em>
                <small>{deal.dealTag} · score {deal.score}</small>
              </a>
            ))}
          </div>
        </section>

        <section className="shell" id="deals">
          <div className="section-head">
            <span className="kicker">Deal engine</span>
            <h2>Click the strongest route first.</h2>
            <p>When a live price is unavailable, Voltescape labels the card as a target range and sends users to check the current fare.</p>
          </div>
          <DealCards deals={deals} />
        </section>

        <section className="shell alert-box">
          <div>
            <span className="kicker">Price alert</span>
            <h2>Watch today&apos;s strongest route.</h2>
            <p>Save an email, route and budget so high-intent visitors become repeat traffic.</p>
          </div>
          <AlertForm destinations={destinations} defaultDestination={topDestination.iata} source="today-best-deals" />
        </section>
      </main>
      <Footer />
    </>
  );
}
