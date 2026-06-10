// Server-only Brevo (email service) integration.
// Adds every new price-alert signup as a contact in the Brevo list,
// which triggers the welcome automation configured in Brevo.
// Fails silently: email capture must never break or slow down the signup flow.

const BREVO_CONTACTS_API = "https://api.brevo.com/v3/contacts";

type BrevoContactInput = {
  email: string;
  destination?: string;
  origin?: string;
};

export async function addBrevoContact({ email, destination, origin }: BrevoContactInput): Promise<{ ok: boolean }> {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID || "0");

  // Not configured yet: behave as a no-op so the site works without Brevo.
  if (!apiKey || !listId) {
    return { ok: false };
  }

  try {
    const res = await fetch(BREVO_CONTACTS_API, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        listIds: [listId],
        attributes: {
          DESTINATION: destination || "",
          ORIGIN: origin || "",
          SOURCE: "price_alert_form",
        },
      }),
      // Keep the signup snappy even if Brevo is slow.
      signal: AbortSignal.timeout(4000),
    });

    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
