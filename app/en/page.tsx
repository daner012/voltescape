import type { Metadata } from "next";
import Link from "next/link";
import { getDeals } from "@/lib/travelpayouts";
import { AlertForm } from "@/components/AlertForm";
import { destinations } from "@/lib/destinations";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Voltescape | Cheap flights from Tel Aviv to Europe",
  description:
    "Live, hand-checked cheap flight deals from Tel Aviv to Europe, updated all day. Plus eSIM, airport transfers and attractions for your trip.",
  alternates: {
    canonical: "https://www.voltescape.com/en",
    languages: {
      "he-IL": "https://www.voltescape.com/",
      en: "https://www.voltescape.com/en",
    },
  },
};

const AIRALO = "https://airalo.tpo.lu/ptAvFjEM";
const KIWITAXI = "https://kiwitaxi.tpo.lu/wnzjfyjy";
const KLOOK = "https://klook.tpo.lu/D9kaX1Le";

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function fmtDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}`;
}

const faqs = [
  {
    q: "How do you find the cheapest flights?",
    a: "We scan live prices from the Aviasales search engine and surface the cheapest dates for every destination, refreshed throughout the day.",
  },
  {
    q: "Is baggage included in the price?",
    a: "The price shown is the base ticket fare. Baggage and extras are selected and priced on the booking page, depending on the airline.",
  },
  {
    q: "How long is the price valid?",
    a: "Flight prices change constantly. We filter out stale prices, but the final price is always confirmed on the search page before you book.",
  },
  {
    q: "Can I get an alert when the price drops?",
    a: "Yes — the Hebrew site lets you subscribe to price alerts and we'll let you know when a new deal appears for your destination.",
  },
];

export default async function EnglishHome() {
  const deals = await getDeals();

  return (
    <div dir="ltr" lang="en" style={{ textAlign: "left" }}>
      <header className="topbar" aria-label="Primary navigation">
        <Link className="brand" href="/en">
          <span className="brand-name">VOLTESCAPE</span>
        </Link>
        <Link className="nav-cta" href="/" hrefLang="he">
          עברית
        </Link>
      </header>

      <main>
        <section className="hero">
          <div className="hero-media" aria-hidden="true">
            <img src="/voltescape-hero.webp" alt="" fetchPriority="high" />
          </div>
          <div className="shell hero-grid">
            <div>
              <span className="kicker">Live deals to Europe from Tel Aviv, all day</span>
              <h1>
                The cheapest flights
                <br />
                from Tel Aviv
              </h1>
              <p className="lead">
                Cyprus, Greece, Italy and more — we find your cheapest flight from Tel Aviv. The
                most up-to-date prices, plus hotels, eSIM and transfers, all in one place.
              </p>
              <div className="actions">
                <Link className="button primary" href="#deals">
                  See hot deals
                </Link>
                <Link className="button" href="/" hrefLang="he">
                  Hebrew site
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="shell" id="deals">
          <div className="section-head">
            <span className="kicker">Best value today</span>
            <h2>The best deals we found today</h2>
            <p>Every deal opens a flight search from Tel Aviv with your destination pre-filled.</p>
          </div>
          <div className="deal-grid">
            {deals.map((deal) => (
              <article className="deal-card" key={deal.iata}>
                <div className="row">
                  <span className="live-badge">Live price</span>
                  <span className="iata">TLV → {deal.iata}</span>
                </div>
                <div>
                  <h3>{titleCase(deal.slug)}</h3>
                  <div className="price">
                    {deal.livePrice
                      ? `from ₪${deal.livePrice}`
                      : `around ₪${deal.targetRange[0]}-${deal.targetRange[1]}`}
                  </div>
                  <p className="deal-meta">
                    <bdi dir="ltr">
                      {deal.departDate ? fmtDate(deal.departDate) : ""}
                      {deal.returnDate ? ` → ${fmtDate(deal.returnDate)}` : ""}
                    </bdi>
                  </p>
                </div>
                {deal.dateOptions && deal.dateOptions.length > 1 && (
                  <details className="date-options" style={{ marginTop: 10 }}>
                    <summary style={{ cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, color: "#1d4ed8" }}>
                      {deal.dateOptions.length} available dates
                    </summary>
                    <ul style={{ listStyle: "none", margin: "8px 0 0", padding: 0, display: "grid", gap: 4 }}>
                      {deal.dateOptions.map((opt, i) => (
                        <li key={i}>
                          <a
                            href={opt.url}
                            target="_blank"
                            rel="nofollow sponsored noopener"
                            style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: "0.8rem", padding: "6px 8px", borderRadius: 8, background: "rgba(0,0,0,0.05)", color: "inherit", textDecoration: "none" }}
                          >
                            <bdi dir="ltr">
                              {opt.departDate ? fmtDate(opt.departDate) : ""}
                              {opt.returnDate ? ` → ${fmtDate(opt.returnDate)}` : ""}
                            </bdi>
                            <span>{opt.price ? `₪${opt.price}` : ""}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                <a
                  className="button primary"
                  href={deal.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                >
                  {deal.livePrice ? "View deal" : "Search flights"}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="shell">
          <div className="section-head">
            <span className="kicker">Before you fly</span>
            <h2>Complete your trip</h2>
          </div>
          <div className="affiliate-grid">
            <a className="affiliate-card" target="_blank" rel="nofollow sponsored noopener" style={{ textDecoration: "none", color: "inherit" }} href={AIRALO}>
              <span className="icon">📶</span>
              <h3>Travel eSIM</h3>
              <p>Get online the moment you land — no hunting for a local SIM card.</p>
            </a>
            <a className="affiliate-card" target="_blank" rel="nofollow sponsored noopener" style={{ textDecoration: "none", color: "inherit" }} href={KIWITAXI}>
              <span className="icon">🚕</span>
              <h3>Airport transfer</h3>
              <p>A driver waiting at arrivals — a fixed price agreed in advance, no surprises.</p>
            </a>
            <a className="affiliate-card" target="_blank" rel="nofollow sponsored noopener" style={{ textDecoration: "none", color: "inherit" }} href={KLOOK}>
              <span className="icon">🎟️</span>
              <h3>Attractions &amp; tours</h3>
              <p>Tickets for attractions and guided tours — book ahead and skip the line.</p>
            </a>
          </div>
        </section>

        <section className="shell">
          <div className="section-head">
            <span className="kicker">FAQ</span>
            <h2>Questions &amp; answers</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.q} className="faq-item" style={{ borderTop: "1px solid rgba(0,0,0,0.08)", padding: "12px 0" }}>
                <summary style={{ cursor: "pointer", fontWeight: 600 }}>{f.q}</summary>
                <p style={{ marginTop: 8 }}>{f.a}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </section>

        <section className="shell" id="alerts">
          <div className="section-head">
            <span className="kicker">Price alerts</span>
            <h2>Get notified when prices drop</h2>
            <p>Tell us your destination and budget — we&apos;ll email you when a matching deal appears.</p>
          </div>
          <AlertForm
            destinations={destinations.map((d) => ({ ...d, name: titleCase(d.slug) }))}
            source="voltescape-en-alert"
            labels={{
              email: "Email",
              placeholder: "you@example.com",
              route: "Destination",
              budget: "Max budget",
              depart: "Departure",
              return: "Return",
              button: "Notify me of deals",
              saving: "Saving…",
              success: "You\u2019re in! We\u2019ll email you when prices drop.",
              fallback: "Something went wrong — please try again.",
            }}
          />
        </section>

        <footer className="shell" style={{ padding: "40px 0", opacity: 0.8 }}>
          <p>
            Voltescape — cheap flights from Tel Aviv. ·{" "}
            <Link href="/" hrefLang="he">
              עברית
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
