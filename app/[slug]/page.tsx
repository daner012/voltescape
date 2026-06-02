import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertForm } from "@/components/AlertForm";
import { DealCards } from "@/components/DealCards";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { trackedUrl } from "@/lib/affiliate";
import { destinations } from "@/lib/destinations";
import { getSeoPage, seoPages } from "@/lib/seo-pages";
import { getDeals } from "@/lib/travelpayouts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
  };
}

export default async function SeoLandingPage({ params }: Props) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  const relevantDestinations = destinations.filter((destination) => page.routes.includes(destination.name));
  const deals = (await getDeals()).filter((deal) => page.routes.includes(deal.destination));
  const trackedDeals = deals.map((deal) => {
    const destination = destinations.find((item) => item.iata === deal.iata)!;
    return {
      ...deal,
      affiliateUrl: trackedUrl({
        partner: "aviasales",
        destination,
        ctaId: `seo-${page.slug}-${destination.slug}`,
        pagePath: `/${page.slug}`,
        outboundUrl: deal.affiliateUrl,
      }),
    };
  });

  return (
    <>
      <Header />
      <main>
        <section className="shell page-hero">
          <span className="kicker">Cheap flights from Tel Aviv</span>
          <h1>{page.heading}</h1>
          <p className="lead">{page.body}</p>
          <div className="actions">
            <a className="button primary" href="#deals">
              View deals
            </a>
            <a className="button secondary" href="#alerts">
              Save price alert
            </a>
          </div>
        </section>

        <section className="shell" id="deals">
          <div className="section-head">
            <span className="kicker">Route picks</span>
            <h2>Live fares and target prices</h2>
            <p>Every deal opens a flight search from Tel Aviv with your destination already filled in.</p>
          </div>
          <DealCards deals={trackedDeals} />
        </section>

        <section className="shell">
          <div className="section-head">
            <span className="kicker">More destinations</span>
            <h2>Explore related city guides</h2>
          </div>
          <div className="city-grid">
            {relevantDestinations.map((destination) => (
              <Link className="city-card" href={`/destinations/${destination.slug}`} key={destination.slug}>
                <div className="row">
                  <span className="chip">{destination.iata}</span>
                  <span className="chip">
                    target €{destination.targetRange[0]}-{destination.targetRange[1]}
                  </span>
                </div>
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <div className="tags">
                  {destination.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="shell alert-box" id="alerts">
          <div>
            <span className="kicker">Price alerts</span>
            <h2>Get notified when the price drops</h2>
            <p>Save a route and we&apos;ll email you when the fare is worth booking.</p>
          </div>
          <AlertForm destinations={destinations} />
        </section>
      </main>
      <Footer />
    </>
  );
}
