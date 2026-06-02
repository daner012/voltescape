import type { Metadata } from "next";
import Link from "next/link";
import { AlertForm } from "@/components/AlertForm";
import { DealCards } from "@/components/DealCards";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { trackedUrl } from "@/lib/affiliate";
import { destinations } from "@/lib/destinations";
import { getDeals } from "@/lib/travelpayouts";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "טיסות זולות מישראל לאירופה | Voltescape",
  description: "דילים חכמים לטיסות הלוך-חזור מ-TLV לאירופה, עם בדיקת מחיר באנגלית וקישורים ממוקדי יעד.",
  alternates: { canonical: "/he/cheap-flights-from-israel" },
};

export default async function HebrewCheapFlightsPage() {
  const rawDeals = await getDeals("TLV", "EUR", 12);
  const deals = rawDeals.map((deal) => {
    const destination = destinations.find((item) => item.iata === deal.iata)!;
    return {
      ...deal,
      affiliateUrl: trackedUrl({
        partner: "aviasales",
        destination,
        ctaId: `he-deal-${destination.slug}`,
        pagePath: "/he/cheap-flights-from-israel",
        outboundUrl: deal.affiliateUrl,
      }),
    };
  });
  const top = deals[0];
  const topDestination = destinations.find((destination) => destination.iata === top.iata) || destinations[0];

  return (
    <>
      <Header />
      <main className="he-page" dir="rtl">
        <section className="page-hero shell">
          <span className="kicker">דילים מישראל</span>
          <h1>טיסות חכמות מ-TLV לאירופה.</h1>
          <p className="lead">
            Voltescape מרכז יעדים חזקים, טווחי מחיר, ודילים הלוך-חזור באנגלית. כל לחיצה עוברת דרך האתר כדי לשמור על
            tracking מסודר לפני המעבר לשותף הטיסות.
          </p>
          <div className="actions">
            <a className="button primary" href={top.affiliateUrl} target="_blank" rel="nofollow sponsored noopener">
              בדוק את {top.destination}
            </a>
            <Link className="button secondary" href="/today-best-deals">
              לראות דילים יומיים
            </Link>
          </div>
          <div className="trust">
            <span>ברירת מחדל: הלוך-חזור</span>
            <span>מקור: TLV</span>
            <span>מטבע: EUR</span>
          </div>
        </section>

        <section className="shell">
          <div className="he-value-grid">
            <article className="stat-card">
              <span className="kicker">למה זה עובד</span>
              <h3>דף נחיתה לקהל ישראלי</h3>
              <p>המודעה יכולה להיות בעברית, אבל כפתורי הטיסה עדיין פותחים את שותף הטיסות באנגלית עם יעד מוגדר.</p>
            </article>
            <article className="stat-card">
              <span className="kicker">כסף</span>
              <h3>Affiliate-first</h3>
              <p>המסלול בנוי כדי להעביר משתמשים מעניין ראשוני לקליק ממומן על טיסה, מלון, אטרקציה או שירות נסיעה.</p>
            </article>
            <article className="stat-card">
              <span className="kicker">אמינות</span>
              <h3>לא ממציאים מחיר חי</h3>
              <p>כשאין מחיר API חי, מוצג טווח יעד והמשתמש מתבקש לבדוק מחיר עדכני באתר השותף.</p>
            </article>
          </div>
        </section>

        <section className="shell" id="deals">
          <div className="section-head">
            <span className="kicker">דילים מומלצים</span>
            <h2>היעדים החזקים ביותר עכשיו</h2>
            <p>הכרטיסים מסודרים לפי מחיר יעד, ציון דיל, טיסה ישירה וערך לקהל ישראלי.</p>
          </div>
          <DealCards deals={deals} />
        </section>

        <section className="shell alert-box">
          <div>
            <span className="kicker">התראות מחיר</span>
            <h2>רוצה שנעקוב אחרי יעד?</h2>
            <p>השאר אימייל, יעד ותקציב. זה יוצר רשימת לקוחות שחוזרים לאתר במקום להיעלם אחרי קליק אחד.</p>
          </div>
          <AlertForm
            destinations={destinations}
            defaultDestination={topDestination.iata}
            source="hebrew-landing-page"
            labels={{
              email: "אימייל",
              route: "מסלול",
              budget: "תקציב ביורו",
              depart: "יציאה",
              return: "חזרה",
              button: "שמור התראה",
              placeholder: "you@example.com",
              saving: "שומר התראה...",
              success: "ההתראה נשמרה. נחזיר אותך לדיל כשהמחיר יזוז.",
            }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
