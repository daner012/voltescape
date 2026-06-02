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
    title: `Cheap Flights to ${destination.name} From Tel Aviv`,
    description: `${destination.description} Check live Aviasales results and premium Voltescape trip add-ons.`,
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
          <h1>Cheap flights to {destination.name} from Tel Aviv</h1>
          <p className="lead">{destination.description}</p>
          <div className="actions">
            <a className="button primary" href={flightUrl} target="_blank" rel="nofollow sponsored noopener">
              {routeDeal?.livePrice ? `View live fare from €${routeDeal.livePrice}` : "Check live deal"}
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
              Hotels + activities
            </a>
          </div>
        </section>

        <section className="shell">
          <div className="stats-grid">
            <article className="stat-card">
              <span className="kicker">Price signal</span>
              <h3>{routeDeal?.livePrice ? `Live from €${routeDeal.livePrice}` : `Target €${destination.targetRange[0]}-${destination.targetRange[1]}`}</h3>
              <p>{routeDeal ? `${routeDeal.dealTag}. ${routeDeal.savingsSignal}.` : "Fallback target range. Verify current fare on Aviasales."}</p>
            </article>
            <article className="stat-card">
              <span className="kicker">Flight shape</span>
              <h3>{destination.direct ? "Direct preferred" : "Flexible routing"}</h3>
              <p>{destination.flightTime} typical trip feel. {routeDeal?.urgencyLabel || "Availability changes by season and airline."}</p>
            </article>
            <article className="stat-card">
              <span className="kicker">Deal score</span>
              <h3>{destination.score}/100</h3>
              <div className="meter">
                <span style={{ width: `${destination.score}%` }} />
              </div>
            </article>
          </div>
        </section>

        <section className="shell">
          <div className="section-head">
            <span className="kicker">Trip intelligence</span>
            <h2>{destination.name} travel tips</h2>
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
                Flight deal
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
                Transfer
              </a>
            </div>
          </article>
        </section>

        <section className="shell">
          <div className="section-head">
            <span className="kicker">FAQ</span>
            <h2>Before you book {destination.name}</h2>
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
            <span className="kicker">Price alerts</span>
            <h2>Watch TLV → {destination.name}</h2>
            <p>Save the route now and return through Voltescape when the fare is worth checking.</p>
          </div>
          <AlertForm destinations={destinations} defaultDestination={destination.iata} />
        </section>

        <div className="sticky-mobile-cta">
          <a className="button primary" href={flightUrl} target="_blank" rel="nofollow sponsored noopener">
            Check {destination.name} live deal
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
