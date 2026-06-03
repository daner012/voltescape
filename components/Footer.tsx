import Link from "next/link";

export function Footer() {
  return (
    <footer className="shell disclosure">
      <div>
        <strong>Voltescape</strong>
        <p>גילוי טיסות וחופשות חכמות מתל אביב לאירופה.</p>
        <p style={{ marginTop: 8 }}>
          <Link href="/privacy">מדיניות פרטיות</Link>
          {" · "}
          <Link href="/terms">תנאי שימוש</Link>
        </p>
      </div>
      <p>
        גילוי נאות: Voltescape עשויה לקבל עמלה משותפים (Aviasales, Klook, Yesim ו-KiwiTaxi) כאשר משתמשים לוחצים או
        מזמינים. מחירי הטיסות הם בזמן אמת כשהדבר זמין; טווחי המחיר הם הערכה ויש לאמת אותם באתר השותף לפני הזמנה.
      </p>
    </footer>
  );
}
