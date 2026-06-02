"use client";

import { useEffect, useMemo, useState } from "react";
import type { Destination } from "@/lib/destinations";
import { trackMetaEvent } from "@/lib/meta-pixel";

function isoDate(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

export function DealSearch({ destinations }: { destinations: Destination[] }) {
  const [destination, setDestination] = useState(destinations[0]?.iata || "ATH");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState("הלוך-ושוב כברירת מחדל · קודם הזול ביותר");

  useEffect(() => {
    setDepartDate(isoDate(18));
    setReturnDate(isoDate(21));
  }, []);

  const selected = useMemo(
    () => destinations.find((item) => item.iata === destination) || destinations[0],
    [destination, destinations],
  );

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("פותח חיפוש חי...");
    const params = new URLSearchParams({
      origin: "TLV",
      destination,
      departDate,
      returnDate,
    });
    const response = await fetch(`/api/search?${params.toString()}`);
    const data = (await response.json()) as { bookingUrl?: string; error?: string };
    if (data.bookingUrl) {
      trackMetaEvent("FlightSearch", {
        origin: "TLV",
        destination,
        departDate,
        returnDate,
        source: "deal-search",
      });
      let recent: unknown[] = [];
      try {
        const parsed = JSON.parse(localStorage.getItem("voltescape_recent") || "[]") as unknown;
        recent = Array.isArray(parsed) ? parsed : [];
      } catch {
        recent = [];
      }
      localStorage.setItem(
        "voltescape_recent",
        JSON.stringify([{ destination, departDate, returnDate, at: new Date().toISOString() }, ...recent].slice(0, 10)),
      );
      window.open(data.bookingUrl, "_blank", "noopener,noreferrer");
      setStatus(`${selected.name} נפתח ב-Aviasales`);
      return;
    }
    setStatus(data.error || "לא הצלחנו לפתוח חיפוש");
  }

  return (
    <form className="search-box" id="dealSearch" onSubmit={submit}>
      <label>
        <span>מ-</span>
        <input value="תל אביב (TLV)" disabled />
      </label>
      <label>
        <span>אל</span>
        <select value={destination} onChange={(event) => setDestination(event.target.value)}>
          {destinations.map((city) => (
            <option key={city.iata} value={city.iata}>
              {city.name} ({city.iata})
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>יציאה</span>
        <input value={departDate} onChange={(event) => setDepartDate(event.target.value)} type="date" />
      </label>
      <label>
        <span>חזרה</span>
        <input value={returnDate} onChange={(event) => setReturnDate(event.target.value)} type="date" />
      </label>
      <div className="toggles" aria-label="Search preferences">
        <label className="toggle">
          <input type="checkbox" defaultChecked />
          <span>סופ״ש</span>
        </label>
        <label className="toggle">
          <input type="checkbox" defaultChecked />
          <span>כבודת יד</span>
        </label>
        <label className="toggle">
          <input type="checkbox" />
          <span>ישיר</span>
        </label>
        <label className="toggle">
          <input type="checkbox" />
          <span>בלי טיסות לפנות בוקר</span>
        </label>
      </div>
      <button className="button primary search-submit" type="submit">
        חפש ב-Aviasales
      </button>
      <p aria-live="polite">{status}</p>
    </form>
  );
}
