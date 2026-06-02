"use client";

type PixelPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    fbq?: (eventType: "track" | "trackCustom", eventName: string, payload?: PixelPayload) => void;
  }
}

export function trackMetaEvent(eventName: string, payload: PixelPayload = {}) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", eventName, {
    site: "voltescape",
    ...payload,
  });
}

export function trackMetaLead(payload: PixelPayload = {}) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "Lead", {
    site: "voltescape",
    ...payload,
  });
}
