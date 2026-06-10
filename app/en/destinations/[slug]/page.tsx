import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations } from "@/lib/destinations";
import { partnerUrl } from "@/lib/affiliate";
import { getDeals } from "@/lib/travelpayouts";

export const revalidate = 1800;

type Props = { params: Promise<{ slug: string }> };

const AIRALO_COUNTRY: Record<string, string> = {
  ATH: "greece", SKG: "greece",
  ROM: "italy", MIL: "italy", NAP: "italy",
  BER: "germany", BUD: "hungary", OTP: "romania",
  WAW: "poland", KRK: "poland", PRG: "czech-republic",
  SOF: "bulgaria", PAR: "france", LCA: "cyprus",
  VIE: "austria", BEG: "serbia", TIA: "albania",
  BCN: "spain", MAD: "spain", IST: "turkey",
  TBS: "georgia", BUS: "georgia", EVN: "armenia",
};

const KIWITAXI = "https://kiwitaxi.tpo.lu/wnzjfyjy";
const KLOOK = "https://klook.tpo.lu/D9kaX1Le";

function airaloEsimUrl(iata: string) {
  const base = "https://airalo.tpo.lu/ptAvFjEM";
  const country = AIRALO_COUNTRY[iata];
  return country ? `${base}?u=${encodeURIComponent(`https://www.airalo.com/${country}-esim`)}` : base;
}

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

export async function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);
  if (!destination) return {};
  const city = titleCase(destination.slug);
  return {
    title: `Cheap Flights from Tel Aviv to ${city}`,
    description: `Cheap flights from Tel Aviv to ${city}, with live prices and the cheapest travel dates. Plus eSIM, transfers and attractions for your trip.`,
    alternates: {
      canonical: `https://www.voltescape.com/en/destinations/${slug}`,
      languages: {
        "he-IL": `https://www.voltescape.com/destinations/${slug}`,
        en: `https://www.voltescape.com/en/destinations/${slug}`,
      },
    },
  };
}

export default async function EnglishCityGuide({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);
  if (!destination) notFound();

  const city = titleCase(destination.slug);
  const allDeals = await getDeals();
  const deal = allDeals.find((d) => d.iata === destination.iata);

  const faqs = [
    {
      q: `How much does a flight from Tel Aviv to ${city} cost?`,
      a: `Prices change daily, but flights to ${city} often start around ₪${destination.targetRange[0]}. We track live fares and surface the cheapest dates for you.`,
    },
    {
      q: `Are there direct flights from Tel Aviv to ${city}?`,
      a: destination.direct
        ? `Yes — ${city} is usually served by direct flights from Tel Aviv, making it a quick and easy getaway.`
        : `${city} is often reached with a short connection. We show whichever option is cheapest for your dates.`,
    },
    {
      q: "Is the price final?",
      a: "The price shown is the base ticket fare. Baggage and extras are selected on the booking page, and the final price is always confirmed before you book.",
    },
  ];

  return (
    <div dir="ltr" lang="en" style={{ textAlign: "left" }}>
      <header className="topbar" aria-label="Primary navigation">
        <Link className="brand" href="/en">
          <span className="brand-name">VOLTESCAPE</span>
        </Link>
        <Link className="nav-cta" href={`/destinations/${slug}`} hrefLang="he">
          עברית
        </Link>
      </header>

      <main>
        <section className="shell page-hero">
          <span className="kicker">Cheap flights from Tel Aviv</span>
          <h1>Flights to {city}</h1>
          <p className="lead">
            {city} is one of the most popular escapes from Tel Aviv.{" "}
            {destination.direct
              ? "Direct flights make it an easy weekend getaway."
              : "A short connection makes it an easy getaway."}{" "}
            We track live prices and show you the cheapest dates to fly — fares often start around ₪
            {destination.targetRange[0]}.
          </p>
          <div className="actions">
            {deal && (
              <a
                className="button primary"
                href={deal.affiliateUrl}
                target="_blank"
                rel="nofollow sponsored noopener"
              >
                Search live flights
              </a>
            )}
            <Link className="button" href={`/destinations/${slug}`} hrefLang="he">
              Hebrew version
            </Link>
          </div>
        </section>

        {deal && (
          <section className="shell">
            <div className="section-head">
              <span className="kicker">Live price</span>
              <h2>Today&apos;s best fare to {city}</h2>
            </div>
            <div className="deal-grid">
              <article className="deal-card">
                <div className="row">
                  <span className="live-badge">Live price</span>
                  <span className="iata">TLV → {destination.iata}</span>
                </div>
                <div>
                  <h3>{city}</h3>
                  <div className="price">
                    {deal.livePrice
                      ? `from ₪${deal.livePrice}`
                      : `around ₪${destination.targetRange[0]}-${destination.targetRange[1]}`}
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
                <a className="button primary" href={deal.affiliateUrl} target="_blank" rel="nofollow sponsored noopener">
                  {deal.livePrice ? "View deal" : "Search flights"}
                </a>
              </article>
            </div>
          </section>
        )}

        <section className="shell">
          <div className="section-head">
            <span className="kicker">Before you fly</span>
            <h2>Complete your trip to {city}</h2>
          </div>
          <div className="affiliate-grid">
            <a className="affiliate-card" target="_blank" rel="nofollow sponsored noopener" style={{ textDecoration: "none", color: "inherit" }} href={airaloEsimUrl(destination.iata)}>
              <span className="icon">📶</span>
              <h3>eSIM for {city}</h3>
              <p>Get online the moment you land — no hunting for a local SIM card.</p>
            </a>
            <a className="affiliate-card" target="_blank" rel="nofollow sponsored noopener" style={{ textDecoration: "none", color: "inherit" }} href={KIWITAXI}>
              <span className="icon">🚕</span>
              <h3>Airport transfer</h3>
              <p>A driver waiting at arrivals — a fixed price agreed in advance, no surprises.</p>
            </a>
            <a className="affiliate-card" target="_blank" rel="nofollow sponsored noopener" style={{ textDecoration: "none", color: "inherit" }} href={partnerUrl("klook", destination)}>
              <span className="icon">🎟️</span>
              <h3>Attractions &amp; tours</h3>
              <p>Tickets for attractions and guided tours in {city} — book ahead and skip the line.</p>
            </a>
          </div>
        </section>

        <section className="shell">
          <div className="section-head">
            <span className="kicker">FAQ</span>
            <h2>Flights to {city} — questions &amp; answers</h2>
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

        <footer className="shell" style={{ padding: "40px 0", opacity: 0.8 }}>
          <p>
            Voltescape — cheap flights from Tel Aviv. ·{" "}
            <Link href="/en/destinations" hrefLang="en">
              All destinations
            </Link>{" "}
            ·{" "}
            <Link href={`/destinations/${slug}`} hrefLang="he">
              עברית
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
