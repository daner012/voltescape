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
          <span className="kicker">טיסות זולות מתל אביב</span>
          <h1>{page.heading}</h1>
          <p className="lead">{page.body}</p>
          <div className="actions">
            <a className="button primary" href="#deals">
              לדילים
            </a>
            <a className="button secondary" href="#alerts">
              שמור התראת מחיר
            </a>
          </div>
        </section>

        <section className="shell" id="deals">
          <div className="section-head">
            <span className="kicker">מסלולים נבחרים</span>
            <h2>מחירים חיים וטווחי יעד</h2>
            <p>כל דיל פותח חיפוש טיסה מתל אביב עם היעד שלך כבר ממולא.</p>
          </div>
          <DealCards deals={trackedDeals} />
        </section>

        <section className="shell">
          <div className="section-head">
            <span className="kicker">עוד יעדים</span>
            <h2>מדריכי ערים נוספים</h2>
          </div>
          <div className="city-grid">
            {relevantDestinations.map((destination) => (
              <Link className="city-card" href={`/destinations/${destination.slug}`} key={destination.slug}>
                <div className="row">
                  <span className="chip">{destination.iata}</span>
                  <span className="chip">
                    בסביבות ₪{destination.targetRange[0]}-{destination.targetRange[1]}
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
            <span className="kicker">התראות מחיר</span>
            <h2>קבל התראה כשהמחיר יורד</h2>
            <p>שמור מסלול ונשלח לך מייל כשהמחיר שווה הזמנה.</p>
          </div>
          <AlertForm destinations={destinations} />
        </section>
      </main>
      <Footer />
    </>
  );
}
