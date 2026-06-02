import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertForm } from "@/components/AlertForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { aviasalesUrl, partnerUrl, trackedUrl } from "@/lib/affiliate";
import { destinations, getDestination } from "@/lib/destinations";
import { getRouteDeal } from "@/lib/travelpayouts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};
  return {
    title: `טיסות זולות מתל אביב ל${destination.name}`,
    description: `${destination.description} בדוק מחירים חיים ב-Aviasales ותוספות טיול של Voltescape.`,
    alternates: { canonical: `/destinations/${destination.slug}` },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const routeDeal = await getRouteDeal({ destination: destination.iata });
  const flightUrl = trackedUrl({
    partner: "aviasales",
    destination,
    ctaId: `destination-primary-${destination.slug}`,
    pagePath: `/destinations/${destination.slug}`,
    outboundUrl: routeDeal?.bookingUrl || aviasalesUrl(destination),
  });

  return (
    <>
      <Header />
      <main>
        <section className="shell page-hero">
          <span className="kicker">TLV → {destination.iata}</span>
          <h1>טיסות זולות מתל אביב ל{destination.name}</h1>
          <p className="lead">{destination.description}</p>
          <div className="actions">
            <a className="button primary" href={flightUrl} target="_blank" rel="nofollow sponsored noopener">
              {routeDeal?.livePrice ? `מחיר חי החל מ-₪${routeDeal.livePrice}` : "בדוק את הדיל"}
            </a>
            <a
              className="button secondary"
              href={trackedUrl({
                partner: "klook",
                destination,
                ctaId: `destination-klook-${destination.slug}`,
                pagePath: `/destinations/${destination.slug}`,
                outboundUrl: partnerUrl("klook", destination),
              })}
              target="_blank"
              rel="nofollow sponsored noopener"
            >
              מלונות ופעילויות
            </a>
          </div>
        </section>

        <section className="shell">
          <div className="stats-grid">
            <article className="stat-card">
              <span className="kicker">מחיר</span>
              <h3>{routeDeal?.livePrice ? `החל מ-₪${routeDeal.livePrice}` : `בסביבות ₪${destination.targetRange[0]}-${destination.targetRange[1]}`}</h3>
              <p>{routeDeal ? `${routeDeal.dealTag}. ${routeDeal.savingsSignal}.` : "טווח יעד. המחיר העדכני זמין ב-Aviasales."}</p>
            </article>
            <article className="stat-card">
              <span className="kicker">סוג הטיסה</span>
              <h3>{destination.direct ? "עדיף ישיר" : "מסלול גמיש"}</h3>
              <p>זמן טיסה {destination.flightTime}. {routeDeal?.urgencyLabel || "הזמינות משתנה לפי עונה וחברה."}</p>
            </article>
            <article className="stat-card">
              <span className="kicker">ציון דיל</span>
              <h3>{destination.score}/100</h3>
              <div className="meter">
                <span style={{ width: `${destination.score}%` }} />
              </div>
            </article>
          </div>
        </section>

        <section className="shell">
          <div className="section-head">
            <span className="kicker">טוב לדעת</span>
            <h2>טיפים לטיול ל{destination.name}</h2>
          </div>
          <article className="guide-card">
            <p>{destination.mood}</p>
            <ul className="tips">
              {destination.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <div className="city-actions">
              <a href={flightUrl} target="_blank" rel="nofollow sponsored noopener">
                דיל טיסה
              </a>
              <a
                href={trackedUrl({
                  partner: "yesim",
                  destination,
                  ctaId: `destination-yesim-${destination.slug}`,
                  pagePath: `/destinations/${destination.slug}`,
                  outboundUrl: partnerUrl("yesim", destination),
                })}
                target="_blank"
                rel="nofollow sponsored noopener"
              >
                eSIM
              </a>
              <a
                href={trackedUrl({
                  partner: "kiwitaxi",
                  destination,
                  ctaId: `destination-transfer-${destination.slug}`,
                  pagePath: `/destinations/${destination.slug}`,
                  outboundUrl: partnerUrl("kiwitaxi", destination),
                })}
                target="_blank"
                rel="nofollow sponsored noopener"
              >
                הסעה
              </a>
            </div>
          </article>
        </section>

        <section className="shell">
          <div className="section-head">
            <span className="kicker">שאלות נפוצות</span>
            <h2>לפני שמזמינים את {destination.name}</h2>
          </div>
          <div className="faq-grid">
            {destination.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="shell alert-box" id="alerts">
          <div>
            <span className="kicker">התראות מחיר</span>
            <h2>עקוב אחרי תל אביב ← {destination.name}</h2>
            <p>שמור את המסלול עכשיו ונחזיר אותך כשהמחיר שווה בדיקה.</p>
          </div>
          <AlertForm destinations={destinations} defaultDestination={destination.iata} />
        </section>

        <div className="sticky-mobile-cta">
          <a className="button primary" href={flightUrl} target="_blank" rel="nofollow sponsored noopener">
            בדוק דיל ל{destination.name}
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
