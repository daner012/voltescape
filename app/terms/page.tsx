import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "תנאי שימוש",
  description: "התנאים לשימוש באתר Voltescape.",
  alternates: { canonical: "/terms" },
};

const wrap: React.CSSProperties = { maxWidth: 760, margin: "0 auto", lineHeight: 1.9 };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="shell" style={{ paddingTop: 40 }}>
          <div style={wrap}>
            <h1 style={{ fontSize: 34, fontWeight: 900, marginBottom: 6 }}>תנאי שימוש</h1>
            <p style={{ color: "var(--muted)", marginBottom: 24 }}>עודכן לאחרונה: 3 ביוני 2026</p>

            <p>
              תנאים אלה חלים על השימוש באתר voltescape.com (&quot;האתר&quot;), המופעל על ידי Voltescape. השימוש באתר
              מהווה הסכמה לתנאים. אם אינך מסכים — אנא הימנע משימוש באתר.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>מהו השירות</h2>
            <p>
              Voltescape הוא שירות לאיתור והשוואת מחירי טיסות וחופשות, המפנה משתמשים לאתרי שותפים לצורך ביצוע ההזמנה.
              איננו חברת תעופה, סוכנות נסיעות או ספק של שירותי תיירות, ואיננו מוכרים כרטיסים בעצמנו. כל הזמנה מתבצעת
              ישירות מול הספק או השותף הרלוונטי (כגון Aviasales), בכפוף לתנאים שלו.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>מחירים וזמינות</h2>
            <p>
              המחירים המוצגים באתר הם להמחשה בלבד. כאשר מוצג מחיר חי הוא נכון למועד השליפה, וטווחי מחיר הם הערכה.
              המחיר, הזמינות והתנאים הסופיים מתעדכנים ומאושרים אך ורק באתר השותף בעת ההזמנה, ועשויים להשתנות. איננו
              מתחייבים לזמינות מקום, למחיר או לדיוק הנתונים.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>גילוי נאות — קישורי שותפים</h2>
            <p>
              האתר כולל קישורי שותפים (Affiliate). כאשר אתה לוחץ על קישור או מבצע הזמנה דרכו, Voltescape עשויה לקבל
              עמלה מהשותף (כגון Aviasales, Klook, Yesim, KiwiTaxi), ללא עלות נוספת מצדך. הדבר אינו משפיע על המחיר שאתה
              משלם.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>התראות מחיר</h2>
            <p>
              שירות התראות המחיר ניתן על בסיס מאמץ סביר בלבד. איננו מתחייבים שהתראה תישלח, תגיע בזמן, או שהמחיר עדיין
              יהיה זמין. תוכל להסיר את עצמך מרשימת ההתראות בכל עת.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>היעדר אחריות והגבלת חבות</h2>
            <p>
              האתר והתוכן בו ניתנים &quot;כפי שהם&quot; (AS IS), ללא כל אחריות מכל סוג. במידה המרבית המותרת בדין,
              Voltescape לא תישא באחריות לכל נזק ישיר או עקיף הנובע מהשימוש באתר, מהסתמכות על מידע המוצג בו, או
              מהתקשרות עם צדדים שלישיים שאליהם הפנינו.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>קישורים חיצוניים וקניין רוחני</h2>
            <p>
              האתר מכיל קישורים לאתרים חיצוניים שאינם בשליטתנו ואיננו אחראים לתוכנם או למדיניותם. סימני המסחר, העיצוב
              והתוכן של Voltescape מוגנים ואין לעשות בהם שימוש ללא רשות.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>דין חל ושינויים</h2>
            <p>
              על תנאים אלה יחולו דיני מדינת ישראל. אנו רשאים לעדכן את התנאים מעת לעת, והגרסה העדכנית תפורסם בעמוד זה.
            </p>

            <p style={{ marginTop: 28 }}>
              <Link href="/">חזרה לדף הבית</Link> · <Link href="/privacy">מדיניות פרטיות</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
