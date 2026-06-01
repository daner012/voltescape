export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  heading: string;
  body: string;
  routes: string[];
};

export const seoPages: SeoPage[] = [
  {
    slug: "cheap-flights-from-israel",
    title: "Cheap Flights From Israel | Voltescape",
    description: "Premium cheap flight discovery from Tel Aviv to Europe with live Aviasales checks and smart route signals.",
    heading: "Cheap flights from Israel, filtered for trips worth opening.",
    body: "Voltescape focuses on TLV-origin routes that combine price, timing and destination quality. Use this page as the gateway into Europe's strongest city escapes.",
    routes: ["Athens", "Budapest", "Sofia", "Bucharest", "Warsaw"],
  },
  {
    slug: "cheap-flights-to-athens",
    title: "Cheap Flights to Athens From Tel Aviv | Voltescape",
    description: "Find live and target-range flight deals from Tel Aviv to Athens with premium trip add-ons.",
    heading: "Cheap flights to Athens from Tel Aviv.",
    body: "Athens is Voltescape's cleanest short escape: fast flight, strong food, rooftops and easy island extensions.",
    routes: ["Athens", "Rome", "Sofia"],
  },
  {
    slug: "cheap-flights-to-berlin",
    title: "Cheap Flights to Berlin From Tel Aviv | Voltescape",
    description: "Check Berlin flight deals from TLV with direct-flight preference and affiliate-tracked booking links.",
    heading: "Cheap flights to Berlin from Tel Aviv.",
    body: "Berlin converts because it has strong repeat intent: nightlife, culture, galleries, second-hand stores and design hotels.",
    routes: ["Berlin", "Prague", "Warsaw"],
  },
  {
    slug: "cheap-flights-to-rome",
    title: "Cheap Flights to Rome From Tel Aviv | Voltescape",
    description: "Discover Rome flight deals from Israel with hotels, activities, eSIM and transfer add-ons.",
    heading: "Cheap flights to Rome from Tel Aviv.",
    body: "Rome is a classic high-intent destination where flights, activities and transfers all create monetization opportunities.",
    routes: ["Rome", "Milan", "Paris"],
  },
  {
    slug: "weekend-flights-from-tel-aviv",
    title: "Weekend Flights From Tel Aviv | Voltescape",
    description: "Short Europe escapes from TLV for two to four nights, with live deal checks and premium city picks.",
    heading: "Weekend flights from Tel Aviv that feel worth it.",
    body: "A strong weekend route needs more than a low fare. Voltescape prioritizes timing, city quality and easy arrival.",
    routes: ["Athens", "Bucharest", "Budapest", "Sofia"],
  },
  {
    slug: "europe-flight-deals",
    title: "Europe Flight Deals From Israel | Voltescape",
    description: "Compare premium-feeling Europe flight deals from Tel Aviv with live Aviasales checks.",
    heading: "Europe flight deals with a premium filter.",
    body: "Use Voltescape to compare city energy, target price and travel fit before checking the live partner result.",
    routes: ["Athens", "Berlin", "Paris", "Rome", "Milan"],
  },
  {
    slug: "luxury-travel-deals",
    title: "Luxury Travel Deals From Israel | Voltescape",
    description: "Luxury-looking trips without luxury waste: flights, hotels, activities, eSIMs and transfers.",
    heading: "Luxury-looking travel deals without premium waste.",
    body: "Voltescape frames the full trip: flights are the hook, then hotels, activities, eSIMs and airport transfers complete the purchase path.",
    routes: ["Paris", "Milan", "Rome", "Athens"],
  },
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}
