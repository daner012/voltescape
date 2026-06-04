import type { Metadata } from "next";
import Link from "next/link";
import { aviasalesUrl } from "@/lib/affiliate";
import { destinations } from "@/lib/destinations";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Destinations | Cheap flights from Tel Aviv | Voltescape",
  description:
    "Browse every destination you can reach cheaply from Tel Aviv — from Larnaca and Athens to Rome, Barcelona and beyond. Live flight search for each city.",
  alternates: { canonical: "https://www.voltescape.com/en/destinations" },
};

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function EnglishDestinations() {
  const sorted = [...destinations].sort((a, b) => a.targetRange[0] - b.targetRange[0]);

  return (
    <div dir="ltr" lang="en" style={{ textAlign: "left" }}>
      <header className="topbar" aria-label="Primary navigation">
        <Link className="brand" href="/en">
          <span className="brand-name">VOLTESCAPE</span>
        </Link>
        <Link className="nav-cta" href="/#destinations" hrefLang="he">
          עברית
        </Link>
      </header>

      <main>
        <section className="shell page-hero">
          <span className="kicker">Cheap flights from Tel Aviv</span>
          <h1>Destinations</h1>
          <p className="lead">
            Every city you can reach cheaply from Tel Aviv, sorted by typical price. Tap any
            destination to open a live flight search with your dates ready to go.
          </p>
        </section>

        <section className="shell">
          <div className="city-grid">
            {sorted.map((destination) => (
              <a
                className="city-card"
                key={destination.iata}
                href={aviasalesUrl(destination, { origin: "TLV" })}
                target="_blank"
                rel="nofollow sponsored noopener"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="row">
                  <span className="chip">TLV → {destination.iata}</span>
                  <span className="chip">
                    around ₪{destination.targetRange[0]}-{destination.targetRange[1]}
                  </span>
                </div>
                <h3>{titleCase(destination.slug)}</h3>
                <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>Search live flights →</p>
              </a>
            ))}
          </div>
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
