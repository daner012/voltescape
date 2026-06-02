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
  const [status, setStatus] = useState("Round-trip default · cheapest-first");

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
    setStatus("Opening tracked live search...");
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
      setStatus(`${selected.name} opened in Aviasales`);
      return;
    }
    setStatus(data.error || "Could not open live search");
  }

  return (
    <form className="search-box" id="dealSearch" onSubmit={submit}>
      <label>
        <span>From</span>
        <input value="Tel Aviv (TLV)" disabled />
      </label>
      <label>
        <span>To</span>
        <select value={destination} onChange={(event) => setDestination(event.target.value)}>
          {destinations.map((city) => (
            <option key={city.iata} value={city.iata}>
              {city.name} ({city.iata})
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Depart</span>
        <input value={departDate} onChange={(event) => setDepartDate(event.target.value)} type="date" />
      </label>
      <label>
        <span>Return</span>
        <input value={returnDate} onChange={(event) => setReturnDate(event.target.value)} type="date" />
      </label>
      <div className="toggles" aria-label="Search preferences">
        <label className="toggle">
          <input type="checkbox" defaultChecked />
          <span>Weekend</span>
        </label>
        <label className="toggle">
          <input type="checkbox" defaultChecked />
          <span>Carry-on</span>
        </label>
        <label className="toggle">
          <input type="checkbox" />
          <span>Direct</span>
        </label>
        <label className="toggle">
          <input type="checkbox" />
          <span>No early AM</span>
        </label>
      </div>
      <button className="button primary search-submit" type="submit">
        Search Aviasales
      </button>
      <p aria-live="polite">{status}</p>
    </form>
  );
}
