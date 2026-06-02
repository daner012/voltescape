import Link from "next/link";

export function Header() {
  return (
    <header className="topbar" aria-label="Primary navigation">
      <Link className="brand" href="/">
        <span className="mark">V</span>
        <span>Voltescape</span>
      </Link>
      <nav className="links" aria-label="Main menu">
        <Link href="/#deals">Deals</Link>
        <Link href="/today-best-deals">Today</Link>
        <Link href="/#search">Search</Link>
        <Link href="/#quiz">Quiz</Link>
        <Link href="/#destinations">Cities</Link>
        <Link href="/he/cheap-flights-from-israel">עברית</Link>
        <Link href="/#alerts">Alerts</Link>
      </nav>
      <Link className="nav-cta" href="/#cheapest-flights">
        Cheapest from TLV
      </Link>
    </header>
  );
}
