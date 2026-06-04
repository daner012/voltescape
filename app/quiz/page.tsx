import type { Metadata } from "next";
import { DealQuiz } from "@/components/DealQuiz";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { destinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "קוויז יעדים — מצאו את הטיסה הזולה הבאה שלכם | Voltescape",
  description:
    "ענו על שלוש שאלות קצרות וקבלו המלצת יעד אחד מנצח לטיסה זולה מתל אביב, עם המחיר העדכני וקישור ישיר להזמנה.",
  alternates: { canonical: "https://www.voltescape.com/quiz" },
};

export default function QuizPage() {
  return (
    <>
      <Header />
      <main id="top">
        <section
          className="shell"
          id="quiz"
          aria-labelledby="quiz-title"
          style={{ paddingTop: 32 }}
        >
          <DealQuiz destinations={destinations} />
        </section>
      </main>
      <Footer />
    </>
  );
}
