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
                דילים לאירופה מתל אביב, מתעדכנים כל הזמן
              </div>
              <h1>VOLTESCAPE</h1>
              <p className="lead">
                סורקים מאות מסלולים ומראים לך את התאריכים הזולים ביותר לאירופה — טיסות, מלונות, פעילויות, eSIM
                והסעות, הכל בזרימה אחת פשוטה.
              </p>
              <div className="actions">
                <Link className="button primary" href="#cheapest-flights">
                  לדילים החמים
                </Link>
                <Link className="button secondary" href="#search">
                  בנה טיול
                </Link>
                <Link className="button secondary" href="/today-best-deals">
                  הכי שווה היום
                </Link>
              </div>
              <div className="trust" aria-label="Platform highlights">
                <span>יוצא מתל אביב</span>
                <span>מחירים מתעדכנים</span>
                <span>קודם הזול ביותר</span>
              </div>
            </div>
            <aside className="hero-panel" aria-label="Featured deal snapshot">
              <span className="panel-label">הדיל החם</span>
              <strong>תל אביב ← {top.destination}</strong>
              <div className="panel-price">
                {top.livePrice ? `החל מ-€${top.livePrice}` : `בסביבות €${top.targetRange[0]}-${top.targetRange[1]}`}
              </div>
              <p className="deal-meta">{top.dealTag} · {top.urgencyLabel}</p>
              <div className="meter" aria-label={`ציון דיל ${top.score} מתוך 100`}>
                <span style={{ width: `${top.score}%` }} />
              </div>
              <a className="small-link" href={top.affiliateUrl} target="_blank" rel="nofollow sponsored noopener">
                {top.livePrice ? "לדיל הטיסה" : "בדוק את הדיל"}
              </a>
            </aside>
          </div>
        </section>

        <section className="top-strip" aria-label="Trending deals">
          <div className="shell">
            <div>
              <span className="kicker">חם עכשיו</span>
              <h2>הדילים החמים השבוע</h2>
            </div>
            <div className="strip-track">
              {deals.slice(0, 6).map((deal) => (
                <a className="strip-card" href={deal.affiliateUrl} target="_blank" rel="nofollow sponsored noopener" key={deal.iata}>
                  <strong>TLV → {deal.iata}</strong>
                  <span>
                    {deal.destination} · {deal.livePrice ? `מ-€${deal.livePrice}` : `בסביבות €${deal.targetRange[0]}-${deal.targetRange[1]}`} · {deal.dealTag} · ציון {deal.score}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="shell" id="today-best-deals" aria-labelledby="today-title">
          <div className="section-head">
            <span className="kicker">הדילים הכי שווים היום</span>
            <h2 id="today-title">הדילים הכי שווים שמצאנו היום.</h2>
            <p>
              עמוד אחד ממוקד עם המסלול החזק של היום: היעד המוביל, מחיר היעד, ציון הדיל וקישור ישיר להזמנה.
            </p>
          </div>
          <div className="deal-board">
            {deals.slice(0, 4).map((deal, index) => (
              <a className="board-row" href={deal.affiliateUrl} target="_blank" rel="nofollow sponsored noopener" key={deal.iata}>
                <span>#{index + 1}</span>
                <strong>TLV → {deal.destination}</strong>
                <em>{deal.livePrice ? `החל מ-€${deal.livePrice}` : `בסביבות €${deal.targetRange[0]}-${deal.targetRange[1]}`}</em>
                <small>{deal.dealTag} · ציון {deal.score}</small>
              </a>
            ))}
          </div>
          <div className="section-actions">
            <Link className="button secondary" href="/today-best-deals">
              לכל הדילים
            </Link>
          </div>
        </section>

        <section className="shell" id="search" aria-labelledby="search-title">
          <div className="section-head">
            <span className="kicker">חיפוש טיסות</span>
            <h2 id="search-title">מצא את הטיול הבא שלך</h2>
            <p>
              חיפוש הלוך-ושוב כברירת מחדל, מציג קודם את התאריכים הזולים. סמן "סופ״ש" אם אתה גמיש או "כבודת יד" אם
              אתה נוסע קל — ונפתח לך את התוצאות הזולות ביותר ליעד שבחרת ב-Aviasales.
            </p>
          </div>
          <DealSearch destinations={destinations} />
        </section>

        <section className="shell" id="quiz" aria-labelledby="quiz-title">
          <DealQuiz destinations={destinations} />
        </section>

        <section className="shell" id="cheapest-flights" aria-labelledby="cheapest-title">
          <div className="section-head">
            <span className="kicker">הטיסות הזולות מישראל</span>
            <h2 id="cheapest-title">מסלולים פופולריים מתל אביב</h2>
            <p>
              המסלולים הטובים ביותר עולים לראש לפי מחיר, טיסות ישירות, פוטנציאל לסופ״ש וערך כולל. כל לחיצה פותחת
              חיפוש Aviasales ליעד שבחרת — הלוך-ושוב ובאנגלית.
            </p>
          </div>
          <DealCards deals={deals} />
        </section>

        <section className="shell" id="destinations" aria-labelledby="destinations-title">
          <div className="section-head">
            <span className="kicker">יעדים</span>
            <h2 id="destinations-title">ערים מושלמות לחופשה קצרה</h2>
          </div>
          <div className="city-grid">
            {destinations.map((city) => (
              <article className="city-card" key={city.slug}>
                <div className="row">
                  <span className="chip">{city.iata}</span>
                  <span className="chip">
                    בסביבות €{city.targetRange[0]}-{city.targetRange[1]}
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
                  <Link href={`/destinations/${city.slug}`}>מדריך</Link>
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
                    טיסות
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
            <span className="kicker">הכל במקום אחד</span>
            <h2 id="affiliate-title">טיסות, מלונות, פעילויות, eSIM והסעות</h2>
          </div>
          <div className="affiliate-grid">
            <article className="affiliate-card">
              <span className="icon">✈</span>
              <h3>טיסות</h3>
              <p>השוואת מחירים על כל הטיסות מתל אביב, ישר לתאריכים הזולים ביותר ליעד שלך.</p>
            </article>
            <article className="affiliate-card">
              <span className="icon">⌂</span>
              <h3>מלונות ופעילויות</h3>
              <p>מלונות, סיורים ואטרקציות בכל יעד — להזמין מראש במחיר טוב, בלי הפתעות.</p>
            </article>
            <article className="affiliate-card">
              <span className="icon">▣</span>
              <h3>eSIM</h3>
              <p>כרטיס eSIM לאינטרנט בחו״ל. מפעילים לפני הטיסה, בלי לחפש חנות בשדה.</p>
            </article>
            <article className="affiliate-card">
              <span className="icon">▻</span>
              <h3>הסעה מהשדה</h3>
              <p>הסעה מסודרת מהשדה אל המלון, מוזמנת מראש במחיר ידוע.</p>
            </article>
          </div>

          <section className="alert-box" id="alerts" aria-labelledby="alerts-title">
            <div>
              <span className="kicker">התראות מחיר</span>
              <h2 id="alerts-title">התראות מחיר שמחזירות אותך בדיוק בזמן</h2>
              <p>
                עדיין לא מוכן להזמין? נשמור לך את המסלול ונשלח לך מייל ברגע שהמחיר יורד — ככה תתפוס את הדיל לפני
                שהוא נעלם.
              </p>
            </div>
            <AlertForm destinations={destinations} defaultDestination={topDestination.iata} />
          </section>
        </section>

        <ConversionCapture
          destinations={destinations}
          defaultDestination={topDestination.iata}
          topDealUrl={top.affiliateUrl}
          topDealLabel={top.livePrice ? `${top.destination} החל מ-€${top.livePrice}` : `בדוק דיל ל${top.destination}`}
        />
      </main>
      <Footer />
    </>
  );
}
