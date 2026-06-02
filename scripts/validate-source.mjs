import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const destinations = read("lib/destinations.ts");
const affiliate = read("lib/affiliate.ts");
const travelpayouts = read("lib/travelpayouts.ts");
const metaPixel = read("components/MetaPixel.tsx");
const pages = [
  "app/page.tsx",
  "app/[slug]/page.tsx",
  "app/destinations/[slug]/page.tsx",
  "app/api/deals/route.ts",
  "app/api/search/route.ts",
  "app/api/alerts/route.ts",
  "app/api/clicks/route.ts",
  "app/api/redirect/route.ts",
];

const iatas = [...destinations.matchAll(/iata: "([^"]+)"/g)].map((match) => match[1]);

const requiredIatas = [
  "ATH",
  "BER",
  "BUD",
  "OTP",
  "WAW",
  "PRG",
  "SOF",
  "MIL",
  "PAR",
  "ROM",
  "LCA",
  "VIE",
  "KRK",
  "SKG",
  "BEG",
  "TIA",
  "NAP",
  "BCN",
  "MAD",
  "IST",
  "TBS",
  "EVN",
  "BUS",
];
const missingIatas = requiredIatas.filter((iata) => !iatas.includes(iata));

const assertions = [
  [missingIatas.length === 0, `Missing destinations (by IATA): ${missingIatas.join(", ")}`],
  [new Set(iatas).size === requiredIatas.length, `Expected ${requiredIatas.length} unique destination IATA codes`],
  [affiliate.includes("https://www.aviasales.com/search/"), "Aviasales URL must use the international www.aviasales.com English deep link"],
  [affiliate.includes("destination.iata"), "Aviasales route must include the destination IATA"],
  [affiliate.includes("departDate"), "Aviasales route must include a departure date"],
  [affiliate.includes("returnDate"), "Aviasales route must encode a round-trip return date"],
  [affiliate.includes('"en"'), "Aviasales URL must force English locale"],
  [affiliate.includes("currency"), "Aviasales URL must include currency"],
  [affiliate.includes("marker"), "Aviasales URL must include marker"],
  [affiliate.includes('"734712"'), "Aviasales marker fallback must be 734712"],
  [read("app/api/redirect/route.ts").includes("safeAviasalesUrl"), "Redirect must validate Aviasales affiliate URLs"],
  [read("app/api/redirect/route.ts").includes("www.aviasales.com"), "Redirect must allow the www.aviasales.com host"],
  [travelpayouts.includes("process.env.TRAVELPAYOUTS_TOKEN"), "Travelpayouts token must be server-side env"],
  [!read("components/DealSearch.tsx").includes("TRAVELPAYOUTS_TOKEN"), "Client components must not reference Travelpayouts token"],
  [metaPixel.includes("NEXT_PUBLIC_META_PIXEL_ID"), "Meta Pixel must be controlled by NEXT_PUBLIC_META_PIXEL_ID"],
  [metaPixel.includes("AffiliateClick"), "Meta Pixel must track affiliate clicks"],
  [metaPixel.includes("FlightDealClick"), "Meta Pixel must track flight deal clicks"],
  [pages.every((file) => fs.existsSync(path.join(root, file))), "Expected app pages and API routes to exist"],
];

const failures = assertions.filter(([ok]) => !ok).map(([, message]) => message);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      uniqueIata: new Set(iatas).size,
      checkedPages: pages.length,
      tokenExposure: "server-only source references verified",
    },
    null,
    2,
  ),
);
