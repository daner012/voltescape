import Link from "next/link";

export function Header() {
  return (
    <header className="topbar" aria-label="Primary navigation">
      <Link className="brand" href="/">
        <span className="mark" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Voltescape">
            <path d="M330,96 L104,206 L214,228 Z" fill="#ffffff" />
            <path d="M330,96 L214,228 L186,330 Z" fill="#ffffff" fillOpacity="0.92" />
            <path d="M286,150 L212,224 L238,230 L190,326 L250,222 L224,216 Z" fill="#0a3a73" />
          </svg>
        </span>
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
