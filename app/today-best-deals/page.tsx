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
    title: "הדילים הכי שווים היום מתל אביב",
  description: "לוח הדילים היומי של Voltescape: טיסות הלוך-ושוב מתל אביב, מחירים חיים כשהם זמינים, וקישורי Aviasales במעקב.",
  alternates: { canonical: "/today-best-deals" },
};

export default async function TodayBestDealsPage() {
  const rawDeals = await getDeals("TLV", "ILS", 18);
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
          <span className="kicker">הדילים הכי שווים היום</span>
          <h1>דילי טיסות טריים מתל אביב, ממוינים לפעולה.</h1>
          <p className="lead">
            לוח דילים יומי: קודם המחירים הזולים ביותר, מחירים חיים מ-Travelpayouts כשהם זמינים, טווחי יעד כשלא, וכל
            קישור טיסה עובר דרך המעקב של Voltescape.
          </p>
          <div className="actions">
            <a className="button primary" href={topDeal.affiliateUrl} target="_blank" rel="nofollow sponsored noopener">
              בדוק {topDeal.destination}
            </a>
            <Link className="button secondary" href="/#search">
              בנה חיפוש מותאם
            </Link>
          </div>
        </section>

        <section className="shell">
          <div className="deal-board">
            {deals.slice(0, 4).map((deal, index) => (
              <a className="board-row" href={deal.affiliateUrl} target="_blank" rel="nofollow sponsored noopener" key={deal.iata}>
                <span>#{index + 1}</span>
                <strong>TLV → {deal.destination}</strong>
                <em>{deal.livePrice ? `החל מ-₪${deal.livePrice}` : `בסביבות ₪${deal.targetRange[0]}-${deal.targetRange[1]}`}</em>
                <small>{deal.dealTag} · ציון {deal.score}</small>
              </a>
            ))}
          </div>
        </section>

        <section className="shell" id="deals">
          <div className="section-head">
            <span className="kicker">מנוע הדילים</span>
            <h2>לחץ קודם על המסלול החזק ביותר.</h2>
            <p>כשאין מחיר חי, Voltescape מסמן את הכרטיס כטווח יעד ושולח אותך לבדוק את המחיר העדכני.</p>
          </div>
          <DealCards deals={deals} />
        </section>

        <section className="shell alert-box">
          <div>
            <span className="kicker">התראת מחיר</span>
            <h2>עקוב אחרי המסלול החזק של היום.</h2>
            <p>שמור אימייל, מסלול ותקציב — ונחזיר אותך כשהמחיר ישתנה.</p>
          </div>
          <AlertForm destinations={destinations} defaultDestination={topDestination.iata} source="today-best-deals" />
        </section>
      </main>
      <Footer />
    </>
  );
}
