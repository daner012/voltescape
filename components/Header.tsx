"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/#deals", label: "דילים" },
  { href: "/today-best-deals", label: "היום" },
  { href: "/#search", label: "חיפוש" },
  { href: "/#quiz", label: "קוויז" },
  { href: "/#destinations", label: "יעדים" },
  { href: "/#alerts", label: "התראות" },
  { href: "/en", label: "English 🌐" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="topbar" aria-label="Primary navigation">
      <Link className="brand" href="/" onClick={close}>
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
        {NAV.filter((item) => item.href !== "/en").map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="nav-cta" href="/#cheapest-flights">
        הזולות מתל אביב
      </Link>

      <button
        type="button"
        className="nav-toggle"
        aria-label="תפריט"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="mobile-menu">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={close}>
              {item.label}
            </Link>
          ))}
          <Link className="mobile-cta" href="/#cheapest-flights" onClick={close}>
            הזולות מתל אביב
          </Link>
        </div>
      )}

      <style>{`
        .nav-toggle { display: none; }
        @media (max-width: 759px) {
          .topbar {
            width: min(1180px, calc(100% - 24px)) !important;
            margin-left: auto !important;
            margin-right: auto !important;
            justify-content: space-between;
          }
          .brand span:last-child { display: inline !important; }
          .nav-cta { display: none !important; }
          .nav-toggle {
            display: inline-flex;
            flex-direction: column;
            justify-content: center;
            gap: 4px;
            width: 42px;
            height: 42px;
            padding: 11px;
            border: 1px solid var(--line);
            border-radius: 12px;
            background: var(--fill);
            cursor: pointer;
          }
          .nav-toggle span {
            display: block;
            width: 100%;
            height: 2px;
            border-radius: 2px;
            background: var(--ink);
          }
          .mobile-menu {
            position: absolute;
            top: calc(100% + 8px);
            left: 12px;
            right: 12px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 10px;
            border: 1px solid var(--line);
            border-radius: 18px;
            background: #ffffff;
            box-shadow: 0 16px 44px rgba(20, 40, 80, 0.18);
            z-index: 40;
          }
          .mobile-menu a {
            padding: 12px 14px;
            border-radius: 12px;
            color: var(--ink);
            font-weight: 700;
            font-size: 15px;
            text-align: right;
          }
          .mobile-menu a:hover { background: var(--fill); }
          .mobile-cta {
            margin-top: 4px;
            text-align: center !important;
            color: #ffffff !important;
            background: linear-gradient(135deg, var(--blue), var(--coral));
          }
        }
      `}</style>
    </header>
  );
}
