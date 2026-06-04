import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations } from "@/lib/destinations";
import { partnerUrl } from "@/lib/affiliate";
import { getSeoPage, seoPages } from "@/lib/seo-pages";
import { getSeoCopyEn, seoCopyEn } from "@/lib/seo-en";
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

export async function generateStaticParams() {
  return Object.keys(seoCopyEn).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const en = getSeoCopyEn(slug);
  if (!en) return {};
  return {
    title: en.title,
    description: en.description,
    alternates: { canonical: `https://www.voltescape.com/en/${slug}` },
  };
}

export default async function EnglishSeoPage({ params }: Props) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  const en = getSeoCopyEn(slug);
  if (!page || !en) notFound();

  const relevantDestinations = destinations.filter((destination) =>
    page.routes.includes(destination.name),
  );
  const primaryDest =
    relevantDestinations.find((destination) => destination.name === page.routes[0]) ??
    relevantDestinations[0];

  const allDeals = await getDeals();
  const deals = allDeals.filter((deal) => page.routes.includes(deal.destination));

  return (
    <div dir="ltr" lang="en" style={{ textAlign: "left" }}>
      <header className="topbar" aria-label="Primary navigation">
        <Link className="brand" href="/en">
          <span className="brand-name">VOLTESCAPE</span>
        </Link>
        <Link className="nav-cta" href={`/${slug}`} hrefLang="he">
          עברית
        </Link>
      </header>

      <main>
        <section className="shell page-hero">
          <span className="kicker">Cheap flights from Tel Aviv</span>
          <h1>{en.heading}</h1>
          <p className="lead">{en.body}</p>
          <div className="actions">
            <Link className="button primary" href="#deals">
              See live deals
            </Link>
            <Link className="button" href={`/${slug}`} hrefLang="he">
              Hebrew version
            </Link>
          </div>
        </section>

        <section className="shell" id="deals">
          <div className="section-head">
            <span className="kicker">Live prices</span>
            <h2>The cheapest dates we found</h2>
            <p>Each deal opens a flight search from Tel Aviv with your destination pre-filled.</p>
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
                <a className="button primary" href={deal.affiliateUrl} target="_blank" rel="nofollow sponsored noopener">
                  {deal.livePrice ? "View deal" : "Search flights"}
                </a>
              </article>
            ))}
          </div>
        </section>

        {primaryDest && (
          <section className="shell">
            <div className="section-head">
              <span className="kicker">Before you fly</span>
              <h2>Complete your trip</h2>
            </div>
            <div className="affiliate-grid">
              <a className="affiliate-card" target="_blank" rel="nofollow sponsored noopener" style={{ textDecoration: "none", color: "inherit" }} href={airaloEsimUrl(primaryDest.iata)}>
                <span className="icon">📶</span>
                <h3>eSIM for {titleCase(primaryDest.slug)}</h3>
                <p>Get online the moment you land — no hunting for a local SIM card.</p>
              </a>
              <a className="affiliate-card" target="_blank" rel="nofollow sponsored noopener" style={{ textDecoration: "none", color: "inherit" }} href={KIWITAXI}>
                <span className="icon">🚕</span>
                <h3>Airport transfer</h3>
                <p>A driver waiting at arrivals — a fixed price agreed in advance, no surprises.</p>
              </a>
              <a className="affiliate-card" target="_blank" rel="nofollow sponsored noopener" style={{ textDecoration: "none", color: "inherit" }} href={partnerUrl("klook", primaryDest)}>
                <span className="icon">🎟️</span>
                <h3>Attractions &amp; tours</h3>
                <p>Tickets for attractions and guided tours — book ahead and skip the line.</p>
              </a>
            </div>
          </section>
        )}

        <section className="shell">
          <div className="section-head">
            <span className="kicker">More destinations</span>
            <h2>Other cheap flights from Tel Aviv</h2>
          </div>
          <div className="city-grid">
            {seoPages
              .filter((p) => p.slug !== slug && seoCopyEn[p.slug])
              .slice(0, 6)
              .map((p) => (
                <Link className="city-card" href={`/en/${p.slug}`} key={p.slug}>
                  <h3>{seoCopyEn[p.slug].heading}</h3>
                </Link>
              ))}
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

        <footer className="shell" style={{ padding: "40px 0", opacity: 0.8 }}>
          <p>
            Voltescape — cheap flights from Tel Aviv. ·{" "}
            <Link href={`/${slug}`} hrefLang="he">
              עברית
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
