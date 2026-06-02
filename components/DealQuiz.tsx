"use client";

import { useMemo, useState } from "react";
import type { Destination } from "@/lib/destinations";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { AlertForm } from "./AlertForm";

type QuizState = {
  tripStyle: "cheapest" | "weekend" | "luxury";
  timing: "now" | "weekend" | "flexible";
  direct: boolean;
};

function isoDate(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function pickDestination(destinations: Destination[], state: QuizState) {
  const scored = destinations.map((destination) => {
    let score = destination.score;
    if (state.tripStyle === "cheapest") score += Math.max(0, 120 - destination.targetRange[0]);
    if (state.tripStyle === "weekend") score += destination.tags.some((tag) => ["Weekend", "Fast escape", "Food"].includes(tag)) ? 28 : 0;
    if (state.tripStyle === "luxury") score += destination.tags.some((tag) => ["Luxury", "Fashion", "Design", "Hotels"].includes(tag)) ? 34 : 0;
    if (state.timing === "weekend" && destination.flightTime.includes("2h")) score += 14;
    if (state.direct && destination.direct) score += 18;
    if (state.direct && !destination.direct) score -= 22;
    return { destination, score };
  });
  return scored.sort((a, b) => b.score - a.score)[0].destination;
}

export function DealQuiz({ destinations }: { destinations: Destination[] }) {
  const [state, setState] = useState<QuizState>({ tripStyle: "cheapest", timing: "weekend", direct: true });
  const [status, setStatus] = useState("");
  const result = useMemo(() => pickDestination(destinations, state), [destinations, state]);
  const departDate = state.timing === "now" ? isoDate(10) : isoDate(24);
  const returnDate = state.timing === "weekend" ? isoDate(27) : isoDate(31);

  async function openResult() {
    setStatus("פותח חיפוש הלוך-ושוב...");
    const params = new URLSearchParams({
      origin: "TLV",
      destination: result.iata,
      departDate,
      returnDate,
    });
    const response = await fetch(`/api/search?${params.toString()}`);
    const data = (await response.json()) as { bookingUrl?: string; error?: string };
    if (data.bookingUrl) {
      trackMetaEvent("QuizDealOpen", {
        origin: "TLV",
        destination: result.iata,
        tripStyle: state.tripStyle,
        timing: state.timing,
        direct: state.direct,
      });
      window.open(data.bookingUrl, "_blank", "noopener,noreferrer");
      setStatus(`${result.name} נפתח דרך Voltescape.`);
      return;
    }
    setStatus(data.error || "לא הצלחנו לפתוח חיפוש");
  }

  return (
    <div className="quiz-grid">
      <div className="quiz-panel">
        <div className="section-head compact">
          <span className="kicker">מצא את הטיול הבא</span>
          <h2>ענה על שלוש שאלות. קבל יעד אחד מנצח.</h2>
          <p>בנוי למהירות: בלי טופס כבד, רק התאמת יעד חזקה וקישור טיסה ישיר.</p>
        </div>
        <fieldset className="choice-group">
          <legend>סוג הטיול</legend>
          {[
            ["cheapest", "הכי זול"],
            ["weekend", "חופשת סופ״ש"],
            ["luxury", "יוקרה משתלמת"],
          ].map(([value, label]) => (
            <button
              className={state.tripStyle === value ? "choice active" : "choice"}
              key={value}
              onClick={() => setState((current) => ({ ...current, tripStyle: value as QuizState["tripStyle"] }))}
              type="button"
            >
              {label}
            </button>
          ))}
        </fieldset>
        <fieldset className="choice-group">
          <legend>מתי</legend>
          {[
            ["now", "בקרוב"],
            ["weekend", "סופ״ש"],
            ["flexible", "גמיש"],
          ].map(([value, label]) => (
            <button
              className={state.timing === value ? "choice active" : "choice"}
              key={value}
              onClick={() => setState((current) => ({ ...current, timing: value as QuizState["timing"] }))}
              type="button"
            >
              {label}
            </button>
          ))}
        </fieldset>
        <label className="toggle quiz-toggle">
          <input checked={state.direct} onChange={(event) => setState((current) => ({ ...current, direct: event.target.checked }))} type="checkbox" />
          <span>מעדיף טיסות ישירות מתל אביב</span>
        </label>
      </div>
      <aside className="quiz-result" aria-live="polite">
        <span className="live-badge">ההתאמה שלך</span>
        <h3>TLV → {result.name}</h3>
        <div className="price">בסביבות €{result.targetRange[0]}-{result.targetRange[1]}</div>
        <p>{result.mood}</p>
        <div className="row">
          <span className="chip">{result.direct ? "עדיף ישיר" : "מסלול גמיש"}</span>
          <span className="chip">{result.flightTime}</span>
          <span className="chip">ציון {result.score}/100</span>
        </div>
        <button className="button primary" onClick={openResult} type="button">
          לדיל
        </button>
        <p className="deal-meta">{status}</p>
        <div className="quiz-alert">
          <h4>עקוב אחרי המסלול</h4>
          <AlertForm destinations={destinations} defaultDestination={result.iata} source="quiz-result" compact />
        </div>
      </aside>
    </div>
  );
}
