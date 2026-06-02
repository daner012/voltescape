import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";
import { seoPages } from "@/lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltescape.com";
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/today-best-deals`, lastModified: now, changeFrequency: "daily", priority: 0.94 },
    { url: `${siteUrl}/he/cheap-flights-from-israel`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    ...seoPages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.82,
    })),
    ...destinations.map((destination) => ({
      url: `${siteUrl}/destinations/${destination.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.78,
    })),
  ];
}
