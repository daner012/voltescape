"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/#deals", label: "דילים" },
  { href: "/today-best-deals", label: "היום" },
  { href: "/#search", label: "חיפוש" },
  { href: "/quiz", label: "קוויז" },
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
          <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Voltescape">
            <path d="M13 12 L31 52" stroke="#eef1f8" strokeWidth="9" strokeLinecap="round" />
            <path d="M31 52 L45 21" stroke="#2dd4bf" strokeWidth="9" strokeLinecap="round" />
            <path d="M51.6 6.4 L52.4 17.2 L42.9 13 Z" fill="#2dd4bf" />
          </svg>
        </span>
        <span>volt<span style={{ color: "#2dd4bf" }}>escape</span></span>
      </Link>

      <nav className="links" aria-label="Main menu">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="nav-cta" href="/#cheapest-flights">
        הזולות מתל אביב
      </Link>
      <a
        className="nav-telegram"
        href="https://t.me/voltescape_deals"
        target="_blank"
        rel="noopener"
        aria-label="ערוץ הטלגרם של Voltescape"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 999, background: "#229ED9", color: "#fff", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", whiteSpace: "nowrap" }}
      >
        ✈️ ערוץ טלגרם
      </a>

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
          <a className="mobile-cta" href="https://t.me/voltescape_deals" target="_blank" rel="noopener" onClick={close} style={{ background: "#229ED9", marginTop: 6 }}>
            ✈️ ערוץ הטלגרם שלנו
          </a>
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
          .nav-cta, .nav-telegram { display: none !important; }
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
