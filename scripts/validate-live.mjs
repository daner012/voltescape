const siteUrl = (process.env.SITE_URL || "https://www.voltescape.com").replace(/\/$/, "");
const marker = process.env.TRAVELPAYOUTS_MARKER || "734712";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function addDays(value, days) {
  const date = new Date(`${value}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function requiredFlightParams(url, destination) {
  return [
    ["origin_iata", "TLV"],
    ["destination_iata", destination],
    ["one_way", "false"],
    ["oneway", "0"],
    ["locale", "en-us"],
    ["currency", "EUR"],
    ["marker", marker],
  ].every(([key, value]) => url.searchParams.get(key) === value);
}

async function fetchText(path) {
  const response = await fetch(`${siteUrl}${path}`);
  assert(response.ok, `${path} returned ${response.status}`);
  return response.text();
}

async function fetchJson(path) {
  const response = await fetch(`${siteUrl}${path}`);
  assert(response.ok, `${path} returned ${response.status}`);
  return response.json();
}

async function assertHomepage() {
  const html = await fetchText("/");
  assert(html.includes("Hot Deals strip"), "Homepage must render Hot Deals strip");
  assert(html.includes("api/redirect?partner=aviasales"), "Homepage Aviasales CTAs must use /api/redirect");
  assert(!html.includes('href="https://www.aviasales.com'), "Homepage must not link directly to Aviasales");
  assert(html.includes("one_way%3Dfalse"), "Homepage Aviasales CTAs must include round-trip one_way=false");
  assert(html.includes(`marker%3D${marker}`), "Homepage Aviasales CTAs must include affiliate marker");
}

async function assertDealsApi() {
  const payload = await fetchJson("/api/deals?origin=TLV&currency=EUR&limit=5");
  const deals = payload.deals || [];
  assert(deals.length >= 5, "Deals API must return at least 5 deals");

  for (const deal of deals) {
    const url = new URL(deal.affiliateUrl);
    assert(url.hostname === "www.aviasales.com", `${deal.iata} must use English Aviasales host`);
    assert(requiredFlightParams(url, deal.iata), `${deal.iata} must include locked affiliate round-trip params`);
  }
}

async function assertSearchApi() {
  const departDate = "2026-07-10";
  const expectedReturn = addDays(departDate, 3);
  const payload = await fetchJson(`/api/search?origin=TLV&destination=BCN&departDate=${departDate}`);

  assert(payload.departDate === departDate, "Search API must preserve departDate");
  assert(payload.returnDate === expectedReturn, "Search API must auto-generate a 3-day returnDate");

  const decodedBookingUrl = decodeURIComponent(payload.bookingUrl || "");
  assert(decodedBookingUrl.includes("/api/redirect?partner=aviasales"), "Search bookingUrl must use /api/redirect");
  assert(decodedBookingUrl.includes("destination_iata=BCN"), "Search bookingUrl must preserve selected destination");
  assert(decodedBookingUrl.includes("depart_date=2026-07-10"), "Search bookingUrl must include depart_date");
  assert(decodedBookingUrl.includes("return_date=2026-07-13"), "Search bookingUrl must include generated return_date");
  assert(decodedBookingUrl.includes("one_way=false"), "Search bookingUrl must include one_way=false");
  assert(decodedBookingUrl.includes(`marker=${marker}`), "Search bookingUrl must include affiliate marker");
}

async function assertRedirects() {
  const goodUrl = new URL("https://www.aviasales.com/");
  goodUrl.searchParams.set("origin_iata", "TLV");
  goodUrl.searchParams.set("destination_iata", "ATH");
  goodUrl.searchParams.set("adults", "1");
  goodUrl.searchParams.set("children", "0");
  goodUrl.searchParams.set("infants", "0");
  goodUrl.searchParams.set("trip_class", "0");
  goodUrl.searchParams.set("one_way", "false");
  goodUrl.searchParams.set("oneway", "0");
  goodUrl.searchParams.set("locale", "en-us");
  goodUrl.searchParams.set("currency", "EUR");
  goodUrl.searchParams.set("marker", marker);
  goodUrl.searchParams.set("depart_date", "2026-07-10");
  goodUrl.searchParams.set("return_date", "2026-07-14");

  const good = await fetch(
    `${siteUrl}/api/redirect?partner=aviasales&origin=TLV&destination=ATH&pagePath=%2F&ctaId=live-smoke&url=${encodeURIComponent(goodUrl.toString())}`,
    { redirect: "manual" },
  );
  const goodLocation = good.headers.get("location") || "";
  assert([307, 308].includes(good.status), `Good redirect must return 307/308, got ${good.status}`);
  assert(goodLocation.startsWith("https://www.aviasales.com/"), "Good redirect must open English Aviasales");
  assert(requiredFlightParams(new URL(goodLocation), "ATH"), "Good redirect must preserve affiliate round-trip params");

  const badUrl = new URL(goodUrl);
  badUrl.searchParams.delete("marker");
  const bad = await fetch(
    `${siteUrl}/api/redirect?partner=aviasales&origin=TLV&destination=ATH&pagePath=%2F&ctaId=bad-marker&url=${encodeURIComponent(badUrl.toString())}`,
    { redirect: "manual" },
  );
  const badLocation = bad.headers.get("location") || "";
  assert([307, 308].includes(bad.status), `Bad redirect must return 307/308, got ${bad.status}`);
  assert(badLocation === `${siteUrl}/` || badLocation === "/", "Bad Aviasales redirect without marker must be blocked to homepage");
}

const checks = [
  ["homepage", assertHomepage],
  ["deals-api", assertDealsApi],
  ["search-api", assertSearchApi],
  ["redirects", assertRedirects],
];

const results = [];
for (const [name, check] of checks) {
  await check();
  results.push(name);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      siteUrl,
      marker,
      checks: results,
    },
    null,
    2,
  ),
);
