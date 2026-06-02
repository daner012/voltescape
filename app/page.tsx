import Link from "next/link";
import { AlertForm } from "@/components/AlertForm";
import { ConversionCapture } from "@/components/ConversionCapture";
import { DealCards } from "@/components/DealCards";
import { DealQuiz } from "@/components/DealQuiz";
import { DealSearch } from "@/components/DealSearch";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { aviasalesUrl, partnerUrl, trackedUrl } from "@/lib/affiliate";
import { destinations } from "@/lib/destinations";
import { getDeals } from "@/lib/travelpayouts";

export const revalidate = 1800;

export default async function HomePage() {
  const rawDeals = await getDeals();
  const deals = rawDeals.map((deal) => {
    const destination = destinations.find((item) => item.iata === deal.iata)!;
    return {
      ...deal,
      affiliateUrl: trackedUrl({
        partner: "aviasales",
        destination,
        ctaId: `home-deal-${destination.slug}`,
        pagePath: "/",
        outboundUrl: deal.affiliateUrl,
      }),
    };
  });
  const top = deals[0];
  const topDestination = destinations.find((item) => item.iata === top.iata) || destinations[0];

  return (
    <>
      <Header />
      <main id="top">
        <section className="hero">
          <div className="hero-media" aria-hidden="true">
            <img src="/voltescape-hero.png" alt="" />
          </div>
          <div className="shell hero-grid">
            <div>
              <div className="eyebrow">
                <span className="pulse" />
                Live-style Europe deals from Israel
              </div>
              <h1>VOLTESCAPE</h1>
              <p className="lead">
                Premium travel discovery with a deal-engine brain: live flight checks from Tel Aviv, high-intent city
                escapes, hotels, activities, eSIMs and transfers in one monetized flow.
              </p>
              <div className="actions">
                <Link className="button primary" href="#cheapest-flights">
                  View live deals
                </Link>
                <Link className="button secondary" href="#search">
                  Build a trip
                </Link>
                <Link className="button secondary" href="/today-best-deals">
                  Today&apos;s best
                </Link>
              </div>
              <div className="trust" aria-label="Platform highlights">
                <span>TLV origin</span>
                <span>Affiliate tracked</span>
                <span>Live price when available</span>
              </div>
            </div>
            <aside className="hero-panel" aria-label="Featured deal snapshot">
              <span className="panel-label">Top signal</span>
              <strong>Tel Aviv → {top.destination}</strong>
              <div className="panel-price">
                {top.livePrice ? `Live from €${top.livePrice}` : `Target €${top.targetRange[0]}-${top.targetRange[1]}`}
              </div>
              <p className="deal-meta">{top.dealTag} · {top.urgencyLabel}</p>
              <div className="meter" aria-label={`Deal score ${top.score} out of 100`}>
                <span style={{ width: `${top.score}%` }} />
              </div>
              <a className="small-link" href={top.affiliateUrl} target="_blank" rel="nofollow sponsored noopener">
                {top.livePrice ? "Open live flight deal" : "Check live deal"}
              </a>
            </aside>
          </div>
        </section>

        <section className="top-strip" aria-label="Trending deals">
          <div className="shell">
            <div>
              <span className="kicker">Trending now</span>
              <h2>Hot Deals strip</h2>
            </div>
            <div className="strip-track">
              {deals.slice(0, 6).map((deal) => (
                <a className="strip-card" href={deal.affiliateUrl} target="_blank" rel="nofollow sponsored noopener" key={deal.iata}>
                  <strong>TLV → {deal.iata}</strong>
                  <span>
                    {deal.destination} · {deal.livePrice ? `from €${deal.livePrice}` : `target €${deal.targetRange[0]}-${deal.targetRange[1]}`} · {deal.dealTag} · score {deal.score}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="shell" id="today-best-deals" aria-labelledby="today-title">
          <div className="section-head">
            <span className="kicker">Today&apos;s best deals</span>
            <h2 id="today-title">A cleaner daily board for paid traffic.</h2>
            <p>
              Send ads to a sharper deal page when you want one focused conversion path: top route, target price, score
              and tracked CTA.
            </p>
          </div>
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
          <div className="section-actions">
            <Link className="button secondary" href="/today-best-deals">
              Open full deal board
            </Link>
          </div>
        </section>

        <section className="shell" id="search" aria-labelledby="search-title">
          <div className="section-head">
            <span className="kicker">Search engine</span>
            <h2 id="search-title">Find the next sharp escape</h2>
            <p>
              Round-trip by default, cheapest-first energy, weekend and carry-on preferences, with Aviasales opening on
              the selected destination through a tracked URL.
            </p>
          </div>
          <DealSearch destinations={destinations} />
        </section>

        <section className="shell" id="quiz" aria-labelledby="quiz-title">
          <DealQuiz destinations={destinations} />
        </section>

        <section className="shell" id="cheapest-flights" aria-labelledby="cheapest-title">
          <div className="section-head">
            <span className="kicker">Cheapest flights from Israel</span>
            <h2 id="cheapest-title">TLV → hot Europe deal engine</h2>
            <p>
              The strongest routes rise first by price signal, direct-flight shape, weekend potential and target-range
              value. Every click opens a destination-specific Aviasales search in English.
            </p>
          </div>
          <DealCards deals={deals} />
        </section>

        <section className="shell" id="destinations" aria-labelledby="destinations-title">
          <div className="section-head">
            <span className="kicker">Destination intelligence</span>
            <h2 id="destinations-title">City escapes built for conversion</h2>
          </div>
          <div className="city-grid">
            {destinations.map((city) => (
              <article className="city-card" key={city.slug}>
                <div className="row">
                  <span className="chip">{city.iata}</span>
                  <span className="chip">
                    target €{city.targetRange[0]}-{city.targetRange[1]}
                  </span>
                </div>
                <h3>{city.name}</h3>
                <p>{city.mood}</p>
                <div className="tags">
                  {city.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="city-actions">
                  <Link href={`/destinations/${city.slug}`}>Guide</Link>
                  <a
                    href={trackedUrl({
                      partner: "aviasales",
                      destination: city,
                      ctaId: `city-card-flight-${city.slug}`,
                      pagePath: "/",
                      outboundUrl: aviasalesUrl(city),
                    })}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                  >
                    Flights
                  </a>
                  <a
                    href={trackedUrl({
                      partner: "klook",
                      destination: city,
                      ctaId: `city-card-klook-${city.slug}`,
                      pagePath: "/",
                      outboundUrl: partnerUrl("klook", city),
                    })}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                  >
                    Klook
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="shell" id="deals" aria-labelledby="affiliate-title">
          <div className="section-head">
            <span className="kicker">Affiliate stack</span>
            <h2 id="affiliate-title">Flights, stays, activities, eSIM, transfers</h2>
          </div>
          <div className="affiliate-grid">
            <article className="affiliate-card">
              <span className="icon">✈</span>
              <h3>Flights</h3>
              <p>Aviasales deep links use TLV origin, destination prefill, EUR currency and marker tracking.</p>
            </article>
            <article className="affiliate-card">
              <span className="icon">⌂</span>
              <h3>Hotels + Activities</h3>
              <p>Klook-led monetization for stays, tours and attraction intent on each destination page.</p>
            </article>
            <article className="affiliate-card">
              <span className="icon">▣</span>
              <h3>eSIM</h3>
              <p>Yesim placement close to the commitment moment, especially after flight search.</p>
            </article>
            <article className="affiliate-card">
              <span className="icon">▻</span>
              <h3>Airport Transfer</h3>
              <p>KiwiTaxi CTAs turn arrival anxiety into a second conversion surface.</p>
            </article>
          </div>

          <section className="alert-box" id="alerts" aria-labelledby="alerts-title">
            <div>
              <span className="kicker">Money mode</span>
              <h2 id="alerts-title">Price alerts that bring people back</h2>
              <p>
                Capture high-intent travelers before they are ready to book, then route them back into affiliate clicks
                when the fare moves.
              </p>
            </div>
            <AlertForm destinations={destinations} defaultDestination={topDestination.iata} />
          </section>
        </section>

        <ConversionCapture
          destinations={destinations}
          defaultDestination={topDestination.iata}
          topDealUrl={top.affiliateUrl}
          topDealLabel={top.livePrice ? `View ${top.destination} from €${top.livePrice}` : `Check ${top.destination} live deal`}
        />
      </main>
      <Footer />
    </>
  );
}
