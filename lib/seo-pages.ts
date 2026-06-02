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
    body: "Voltescape focuses on Tel Aviv routes that combine price, timing and destination quality — your starting point for Europe's best city breaks.",
    routes: ["Athens", "Budapest", "Sofia", "Bucharest", "Warsaw"],
  },
  {
    slug: "cheap-flights-to-athens",
    title: "Cheap Flights to Athens From Tel Aviv | Voltescape",
    description: "Find live and target-range flight deals from Tel Aviv to Athens with premium trip add-ons.",
    heading: "Cheap flights to Athens from Tel Aviv.",
    body: "Athens is the easiest short escape from Tel Aviv: fast flight, great food, rooftops and easy island add-ons.",
    routes: ["Athens", "Rome", "Sofia"],
  },
  {
    slug: "cheap-flights-to-berlin",
    title: "Cheap Flights to Berlin From Tel Aviv | Voltescape",
    description: "Check Berlin flight deals from TLV with direct-flight preference and affiliate-tracked booking links.",
    heading: "Cheap flights to Berlin from Tel Aviv.",
    body: "Berlin is a city you keep coming back to: nightlife, culture, galleries, vintage shopping and design hotels.",
    routes: ["Berlin", "Prague", "Warsaw"],
  },
  {
    slug: "cheap-flights-to-rome",
    title: "Cheap Flights to Rome From Tel Aviv | Voltescape",
    description: "Discover Rome flight deals from Israel with hotels, activities, eSIM and transfer add-ons.",
    heading: "Cheap flights to Rome from Tel Aviv.",
    body: "Rome is a timeless favorite, easy to build a full trip around with flights, activities and transfers.",
    routes: ["Rome", "Milan", "Paris"],
  },
  {
    slug: "weekend-flights-from-tel-aviv",
    title: "Weekend Flights From Tel Aviv | Voltescape",
    description: "Short Europe escapes from TLV for two to four nights, with live deal checks and premium city picks.",
    heading: "Weekend flights from Tel Aviv that feel worth it.",
    body: "A great weekend trip needs more than a low fare. We prioritize timing, city quality and an easy arrival.",
    routes: ["Athens", "Bucharest", "Budapest", "Sofia"],
  },
  {
    slug: "europe-flight-deals",
    title: "Europe Flight Deals From Israel | Voltescape",
    description: "Compare premium-feeling Europe flight deals from Tel Aviv with live Aviasales checks.",
    heading: "Europe flight deals with a premium filter.",
    body: "Compare each city's vibe, target price and travel fit before you check the live fare.",
    routes: ["Athens", "Berlin", "Paris", "Rome", "Milan"],
  },
  {
    slug: "luxury-travel-deals",
    title: "Luxury Travel Deals From Israel | Voltescape",
    description: "Luxury-looking trips without luxury waste: flights, hotels, activities, eSIMs and transfers.",
    heading: "Luxury-looking travel deals without premium waste.",
    body: "We plan the whole trip: flights first, then hotels, activities, eSIMs and airport transfers.",
    routes: ["Paris", "Milan", "Rome", "Athens"],
  },
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}
