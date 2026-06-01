"use client";

import { useState } from "react";
import type { Destination } from "@/lib/destinations";

export function AlertForm({ destinations, defaultDestination }: { destinations: Destination[]; defaultDestination?: string }) {
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState(defaultDestination || destinations[0]?.iata || "ATH");
  const [status, setStatus] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving alert...");
    const response = await fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        origin: "TLV",
        destination,
        preferences: { source: "voltescape-alert-form", currency: "EUR" },
      }),
    });
    const data = (await response.json()) as { ok: boolean; error?: string };
    setStatus(data.ok ? "Alert saved. We will route you back when the fare moves." : data.error || "Could not save alert");
    if (data.ok) setEmail("");
  }

  return (
    <form className="alert-form" onSubmit={submit}>
      <label>
        <span>Email</span>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@example.com" required />
      </label>
      <label>
        <span>Route</span>
        <select value={destination} onChange={(event) => setDestination(event.target.value)}>
          {destinations.map((city) => (
            <option key={city.iata} value={city.iata}>
              TLV → {city.name}
            </option>
          ))}
        </select>
      </label>
      <button className="button secondary" type="submit">
        Save alert
      </button>
      <p aria-live="polite">{status}</p>
    </form>
  );
}
