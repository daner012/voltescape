import Link from "next/link";
import { seoPages } from "@/lib/seo-pages";

export function Footer() {
  return (
    <footer className="shell disclosure">
      <div>
        <strong>Voltescape</strong>
        <p>גילוי טיסות וחופשות חכמות מתל אביב לאירופה.</p>
        <p style={{ marginTop: 8 }}>
          <Link href="/blog">בלוג</Link>
          {" · "}
          <Link href="/privacy">מדיניות פרטיות</Link>
          {" · "}
          <Link href="/terms">תנאי שימוש</Link>
        </p>
      </div>
      <nav aria-label="חיפושים פופולריים" style={{ marginTop: 12 }}>
        <strong style={{ display: "block", marginBottom: 6, fontSize: "0.9rem" }}>
          חיפושים פופולריים
        </strong>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 12px",
            fontSize: "0.85rem",
            opacity: 0.85,
          }}
        >
          {seoPages.map((page) => (
            <Link key={page.slug} href={`/${page.slug}`}>
              {page.heading.replace(/\.$/, "")}
            </Link>
          ))}
        </div>
      </nav>
      <p>
        גילוי נאות: Voltescape עשויה לקבל עמלה משותפים (Aviasales, Klook, Yesim ו-KiwiTaxi) כאשר משתמשים לוחצים או
        מזמינים. מחירי הטיסות הם בזמן אמת כשהדבר זמין; טווחי המחיר הם הערכה ויש לאמת אותם באתר השותף לפני הזמנה.
      </p>
    </footer>
  );
}
