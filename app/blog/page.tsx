import type { Metadata } from "next";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "הבלוג של Voltescape — טיפים לטיסות זולות מתל אביב",
  description: "מדריכים וטיפים למציאת טיסות זולות מתל אביב לאירופה: התאריכים הזולים, יעדי סופ״ש, התראות מחיר ועוד.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <section className="shell" style={{ paddingTop: 40 }}>
          <div className="section-head">
            <span className="kicker">הבלוג</span>
            <h2>טיפים ומדריכים לטיסות זולות מתל אביב</h2>
            <p>
              מדריכים שימושיים שיעזרו לך לטוס לאירופה בזול — מתי הכי משתלם להזמין, לאן לטוס לסופ״ש, ואיך לתפוס את
              המחיר לפני שהוא עולה.
            </p>
          </div>
          <div id="soro-blog" />
          <Script
            src="https://app.trysoro.com/api/embed/b9033d26-935b-4ef4-b90b-d98b1115dd48"
            strategy="afterInteractive"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
