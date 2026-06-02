"use client";

import { useEffect, useState } from "react";
import type { Destination } from "@/lib/destinations";
import { AlertForm } from "./AlertForm";

export function ConversionCapture({
  destinations,
  defaultDestination,
  topDealUrl,
  topDealLabel,
}: {
  destinations: Destination[];
  defaultDestination: string;
  topDealUrl: string;
  topDealLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("voltescape_capture_dismissed");
    if (stored) setDismissed(true);

    const onMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0 && !stored) setOpen(true);
    };

    const onScroll = () => {
      const depth = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      if (depth > 0.48 && !window.localStorage.getItem("voltescape_capture_dismissed")) setOpen(true);
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function close() {
    setOpen(false);
    setDismissed(true);
    window.localStorage.setItem("voltescape_capture_dismissed", new Date().toISOString());
  }

  return (
    <>
      <div className="sticky-mobile-cta">
        <a className="button primary" href={topDealUrl} target="_blank" rel="nofollow sponsored noopener">
          {topDealLabel}
        </a>
        <button className="button secondary sticky-alert-button" onClick={() => setOpen(true)} type="button">
          התראת מחיר
        </button>
      </div>
      {open && !dismissed && (
        <div className="capture-backdrop" role="presentation">
          <section className="capture-modal" aria-labelledby="capture-title" role="dialog" aria-modal="true">
            <button className="capture-close" onClick={close} type="button" aria-label="סגור התראת מחיר">
              ✕
            </button>
            <span className="kicker">לפני שאתה הולך</span>
            <h2 id="capture-title">תן ל-Voltescape לעקוב אחרי המחיר.</h2>
            <p>
              שמור מסלול, תקציב ואימייל. כשתחזור, הטיול שלך מוכן לבדיקה מחדש עם המחירים העדכניים של השותפים.
            </p>
            <AlertForm destinations={destinations} defaultDestination={defaultDestination} source="exit-capture" compact />
          </section>
        </div>
      )}
    </>
  );
}
