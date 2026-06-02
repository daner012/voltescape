import Link from "next/link";

export function Header() {
  return (
    <header className="topbar" aria-label="Primary navigation">
      <Link className="brand" href="/">
        <span className="mark">V</span>
        <span>Voltescape</span>
      </Link>
      <nav className="links" aria-label="Main menu">
        <Link href="/#deals">דילים</Link>
        <Link href="/today-best-deals">היום</Link>
        <Link href="/#search">חיפוש</Link>
        <Link href="/#quiz">קוויז</Link>
        <Link href="/#destinations">יעדים</Link>
        <Link href="/#alerts">התראות</Link>
      </nav>
      <Link className="nav-cta" href="/#cheapest-flights">
        הזולות מתל אביב
      </Link>
    </header>
  );
}
