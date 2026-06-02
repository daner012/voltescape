"use client";

import { useState } from "react";
import type { Destination } from "@/lib/destinations";

type AlertFormProps = {
  destinations: Destination[];
  defaultDestination?: string;
  source?: string;
  compact?: boolean;
  labels?: {
    email?: string;
    route?: string;
    budget?: string;
    depart?: string;
    return?: string;
    button?: string;
    placeholder?: string;
    saving?: string;
    success?: string;
  };
};

export function AlertForm({ destinations, defaultDestination, source = "voltescape-alert-form", compact = false, labels = {} }: AlertFormProps) {
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState(defaultDestination || destinations[0]?.iata || "ATH");
  const [budgetEur, setBudgetEur] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(labels.saving || "Saving alert...");
    const response = await fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        origin: "TLV",
        destination,
        budgetEur: budgetEur ? Number(budgetEur) : undefined,
        departDate: departDate || undefined,
        returnDate: returnDate || undefined,
        preferences: { source, currency: "EUR", consent: "marketing-price-alert" },
      }),
    });
    const data = (await response.json()) as { ok: boolean; error?: string };
    setStatus(data.ok ? labels.success || "Alert saved. We will route you back when the fare moves." : data.error || "Could not save alert");
    if (data.ok) {
      setEmail("");
      setBudgetEur("");
    }
  }

  return (
    <form className={compact ? "alert-form compact-alert" : "alert-form"} onSubmit={submit}>
      <label>
        <span>{labels.email || "Email"}</span>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder={labels.placeholder || "you@example.com"} required />
      </label>
      <label>
        <span>{labels.route || "Route"}</span>
        <select value={destination} onChange={(event) => setDestination(event.target.value)}>
          {destinations.map((city) => (
            <option key={city.iata} value={city.iata}>
              TLV → {city.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>{labels.budget || "Budget EUR"}</span>
        <input value={budgetEur} onChange={(event) => setBudgetEur(event.target.value)} type="number" min="20" max="2000" placeholder="120" />
      </label>
      {!compact && (
        <>
          <label>
            <span>{labels.depart || "Depart"}</span>
            <input value={departDate} onChange={(event) => setDepartDate(event.target.value)} type="date" />
          </label>
          <label>
            <span>{labels.return || "Return"}</span>
            <input value={returnDate} onChange={(event) => setReturnDate(event.target.value)} type="date" />
          </label>
        </>
      )}
      <button className="button secondary" type="submit">
        {labels.button || "Save alert"}
      </button>
      <p aria-live="polite">{status}</p>
    </form>
  );
}
