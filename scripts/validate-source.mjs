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

const cityNames = [...destinations.matchAll(/name: "([^"]+)"/g)].map((match) => match[1]);
const iatas = [...destinations.matchAll(/iata: "([^"]+)"/g)].map((match) => match[1]);

const requiredCities = [
  "Athens",
  "Berlin",
  "Budapest",
  "Bucharest",
  "Warsaw",
  "Prague",
  "Sofia",
  "Milan",
  "Paris",
  "Rome",
  "Larnaca",
  "Vienna",
  "Krakow",
  "Thessaloniki",
  "Belgrade",
  "Tirana",
  "Naples",
  "Barcelona",
  "Madrid",
  "Istanbul",
  "Tbilisi",
  "Yerevan",
  "Batumi",
];
const missingCities = requiredCities.filter((city) => !cityNames.includes(city));

const assertions = [
  [missingCities.length === 0, `Missing cities: ${missingCities.join(", ")}`],
  [new Set(iatas).size === requiredCities.length, `Expected ${requiredCities.length} unique destination IATA codes`],
  [affiliate.includes("https://search.aviasales.com/flights/"), "Aviasales URL must use search.aviasales.com/flights deep links"],
  [affiliate.includes("origin_iata"), "Aviasales URL must include origin_iata"],
  [affiliate.includes("destination_iata"), "Aviasales URL must include destination_iata"],
  [affiliate.includes("depart_date"), "Aviasales URL must include depart_date"],
  [affiliate.includes("return_date"), "Aviasales URL must include return_date"],
  [affiliate.includes("one_way"), "Aviasales URL must include one_way"],
  [affiliate.includes('"false"'), "Aviasales URL must force round-trip one_way=false"],
  [affiliate.includes("oneway"), "Aviasales URL must include legacy oneway flag"],
  [affiliate.includes('"0"'), "Aviasales URL must force legacy oneway=0"],
  [affiliate.includes('"en"'), "Aviasales URL must force English locale"],
  [affiliate.includes("currency"), "Aviasales URL must include currency"],
  [affiliate.includes("marker"), "Aviasales URL must include marker"],
  [affiliate.includes('"734712"'), "Aviasales marker fallback must be 734712"],
  [read("app/api/redirect/route.ts").includes("safeAviasalesUrl"), "Redirect must validate Aviasales affiliate URLs"],
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
      cities: cityNames.length,
      uniqueIata: new Set(iatas).size,
      checkedPages: pages.length,
      tokenExposure: "server-only source references verified",
    },
    null,
    2,
  ),
);
