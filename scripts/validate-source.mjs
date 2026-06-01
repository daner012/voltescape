import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const destinations = read("lib/destinations.ts");
const affiliate = read("lib/affiliate.ts");
const travelpayouts = read("lib/travelpayouts.ts");
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

const requiredCities = ["Athens", "Berlin", "Budapest", "Bucharest", "Warsaw", "Prague", "Sofia", "Milan", "Paris", "Rome"];
const missingCities = requiredCities.filter((city) => !cityNames.includes(city));

const assertions = [
  [missingCities.length === 0, `Missing cities: ${missingCities.join(", ")}`],
  [new Set(iatas).size === 10, "Expected 10 unique destination IATA codes"],
  [affiliate.includes("origin_iata"), "Aviasales URL must include origin_iata"],
  [affiliate.includes("destination_iata"), "Aviasales URL must include destination_iata"],
  [affiliate.includes("currency"), "Aviasales URL must include currency"],
  [affiliate.includes("marker"), "Aviasales URL must include marker"],
  [travelpayouts.includes("process.env.TRAVELPAYOUTS_TOKEN"), "Travelpayouts token must be server-side env"],
  [!read("components/DealSearch.tsx").includes("TRAVELPAYOUTS_TOKEN"), "Client components must not reference Travelpayouts token"],
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
