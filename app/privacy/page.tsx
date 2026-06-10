import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: "כיצד Voltescape אוספת, משתמשת ושומרת על המידע שלך.",
  alternates: { canonical: "/privacy" },
};

const wrap: React.CSSProperties = { maxWidth: 760, margin: "0 auto", lineHeight: 1.9 };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="shell" style={{ paddingTop: 40 }}>
          <div style={wrap}>
            <h1 style={{ fontSize: 34, fontWeight: 900, marginBottom: 6 }}>מדיניות פרטיות</h1>
            <p style={{ color: "var(--muted)", marginBottom: 24 }}>עודכן לאחרונה: 3 ביוני 2026</p>

            <p>
              מדיניות זו מסבירה כיצד Voltescape (&quot;האתר&quot;, &quot;אנחנו&quot;) אוספת, משתמשת ושומרת על מידע
              של מבקרים באתר voltescape.com. השימוש באתר מהווה הסכמה למדיניות זו.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>מי אנחנו</h2>
            <p>
              Voltescape הוא שירות לאיתור והשוואת טיסות וחופשות זולות מתל אביב לאירופה. האתר מופעל על ידי Voltescape.
              לפניות בנושא פרטיות ניתן ליצור קשר בכתובת{" "}
              <a href="mailto:voltescape.com@gmail.com">voltescape.com@gmail.com</a>.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>איזה מידע אנחנו אוספים</h2>
            <p>
              <strong>מידע שאתה מוסר ביוזמתך:</strong> כאשר אתה נרשם להתראת מחיר, אנו אוספים את כתובת האימייל שלך,
              היעד שבחרת, טווח התקציב והתאריכים המבוקשים, וכן חותמת זמן של ההסכמה.
            </p>
            <p>
              <strong>מידע על שימוש:</strong> אנו רושמים נתוני שימוש בסיסיים, כגון על איזה דיל או שותף לחצת ומתי, כדי
              לשפר את השירות ולמדוד ביצועים.
            </p>
            <p>
              <strong>מידע טכני וקובצי Cookie:</strong> בעת השימוש באתר נאספים נתונים טכניים (סוג דפדפן, מכשיר, דפים
              שנצפו) באמצעות טכנולוגיות מעקב, לרבות Meta Pixel (פיקסל של פייסבוק) למדידת פרסום. בנוסף האתר שומר באחסון
              המקומי של הדפדפן (localStorage) את החיפושים האחרונים שלך, לנוחותך.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>כיצד אנו משתמשים במידע</h2>
            <p>
              אנו משתמשים במידע כדי: לשלוח לך התראות מחיר שביקשת; להפעיל, לתחזק ולשפר את האתר; למדוד את ביצועי
              הקמפיינים והפרסום שלנו; ולמנוע שימוש לרעה. איננו מוכרים את המידע האישי שלך.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>שיתוף מידע עם צדדים שלישיים</h2>
            <p>
              אנו עשויים לשתף מידע עם ספקי שירות הפועלים מטעמנו ועם שותפים, ובהם: <strong>Supabase</strong> (אחסון
              נתונים מאובטח), <strong>Meta/Facebook</strong> (פיקסל ומדידת פרסום), ו-<strong>Travelpayouts / Aviasales</strong>{" "}
              ושותפים נוספים (Klook, Yesim, KiwiTaxi) שאליהם אתה מנותב בלחיצה על קישורים. ההזמנה בפועל מתבצעת באתרי
              צד שלישי, הכפופים למדיניות הפרטיות שלהם. ייתכן שמידע יעובד גם מחוץ לישראל.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>קובצי Cookie ומעקב</h2>
            <p>
              ניתן לחסום או למחוק קובצי Cookie דרך הגדרות הדפדפן. חסימה עלולה לפגוע בחלק מהפונקציונליות. ניתן גם לנהל
              העדפות פרסום מותאם דרך הגדרות החשבון שלך בפייסבוק.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>שמירת מידע וזכויותיך</h2>
            <p>
              אנו שומרים מידע אישי כל עוד הוא נדרש למטרות שלשמן נאסף. בכפוף לדין החל, אתה רשאי לבקש לעיין במידע שלך,
              לתקנו או למחקו, ולהסיר את עצמך מרשימת ההתראות בכל עת — פנה אלינו בכתובת{" "}
              <a href="mailto:voltescape.com@gmail.com">voltescape.com@gmail.com</a>.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>אבטחה וקטינים</h2>
            <p>
              אנו נוקטים אמצעים סבירים להגנה על המידע, אך אף שיטה אינה מאובטחת לחלוטין. האתר אינו מיועד לילדים מתחת
              לגיל 16, ואיננו אוספים ביודעין מידע מהם.
            </p>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 28 }}>שינויים במדיניות</h2>
            <p>
              אנו עשויים לעדכן מדיניות זו מעת לעת. הגרסה העדכנית תפורסם תמיד בעמוד זה, עם תאריך עדכון מעודכן.
            </p>

            <p style={{ marginTop: 28 }}>
              <Link href="/">חזרה לדף הבית</Link> · <Link href="/terms">תנאי שימוש</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
