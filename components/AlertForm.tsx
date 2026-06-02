"use client";

import { useState } from "react";
import type { Destination } from "@/lib/destinations";
import { trackMetaEvent, trackMetaLead } from "@/lib/meta-pixel";

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
    fallback?: string;
  };
};

export function AlertForm({ destinations, defaultDestination, source = "voltescape-alert-form", compact = false, labels = {} }: AlertFormProps) {
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState(defaultDestination || destinations[0]?.iata || "ATH");
  const [budgetEur, setBudgetEur] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState("");

  function saveLocalAlert() {
    const alert = {
      email,
      origin: "TLV",
      destination,
      budgetEur: budgetEur ? Number(budgetEur) : null,
      departDate: departDate || null,
      returnDate: returnDate || null,
      source,
      createdAt: new Date().toISOString(),
    };
    let existing: unknown[] = [];
    try {
      const parsed = JSON.parse(localStorage.getItem("voltescape_price_alerts") || "[]") as unknown;
      existing = Array.isArray(parsed) ? parsed : [];
    } catch {
      existing = [];
    }
    localStorage.setItem("voltescape_price_alerts", JSON.stringify([alert, ...existing].slice(0, 20)));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(labels.saving || "שומר התראה...");
    try {
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
          preferences: { source, currency: "ILS", consent: "marketing-price-alert" },
        }),
      });
      const data = (await response.json()) as { ok: boolean; error?: string; fallback?: "local"; mode?: "cloud" };
      if (data.ok) {
        trackMetaLead({ destination, source, mode: data.mode || "cloud", budgetEur: budgetEur ? Number(budgetEur) : null });
        setStatus(labels.success || "ההתראה נשמרה. נחזיר אותך כשהמחיר ישתנה.");
        setEmail("");
        setBudgetEur("");
        return;
      }
      if (data.fallback === "local") {
        saveLocalAlert();
        trackMetaEvent("PriceAlertSavedLocal", { destination, source, budgetEur: budgetEur ? Number(budgetEur) : null });
        setStatus(labels.fallback || "נשמר במכשיר הזה. התראות מייל יופעלו בקרוב.");
        setEmail("");
        setBudgetEur("");
        return;
      }
      setStatus(data.error || "לא הצלחנו לשמור את ההתראה כרגע. נסה שוב בקרוב.");
    } catch {
      saveLocalAlert();
      trackMetaEvent("PriceAlertSavedLocal", { destination, source, budgetEur: budgetEur ? Number(budgetEur) : null });
      setStatus(labels.fallback || "נשמר במכשיר הזה. בדוק מחירים לפני הזמנה.");
      setEmail("");
      setBudgetEur("");
    }
  }

  return (
    <form className={compact ? "alert-form compact-alert" : "alert-form"} onSubmit={submit}>
      <label>
        <span>{labels.email || "אימייל"}</span>
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder={labels.placeholder || "name@email.com"} required />
      </label>
      <label>
        <span>{labels.route || "מסלול"}</span>
        <select value={destination} onChange={(event) => setDestination(event.target.value)}>
          {destinations.map((city) => (
            <option key={city.iata} value={city.iata}>
              TLV → {city.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>{labels.budget || "תקציב ₪"}</span>
        <input value={budgetEur} onChange={(event) => setBudgetEur(event.target.value)} type="number" min="20" max="2000" placeholder="120" />
      </label>
      {!compact && (
        <>
          <label>
            <span>{labels.depart || "יציאה"}</span>
            <input value={departDate} onChange={(event) => setDepartDate(event.target.value)} type="date" />
          </label>
          <label>
            <span>{labels.return || "חזרה"}</span>
            <input value={returnDate} onChange={(event) => setReturnDate(event.target.value)} type="date" />
          </label>
        </>
      )}
      <button className="button secondary" type="submit">
        {labels.button || "שמור התראה"}
      </button>
      <p aria-live="polite">{status}</p>
    </form>
  );
}
