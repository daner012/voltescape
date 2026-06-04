import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";
import { seoPages } from "@/lib/seo-pages";
import { seoCopyEn } from "@/lib/seo-en";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.voltescape.com";
  const now = new Date();
  const enSlugs = Object.keys(seoCopyEn);
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/today-best-deals`, lastModified: now, changeFrequency: "daily", priority: 0.94 },
    { url: `${siteUrl}/quiz`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
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
    { url: `${siteUrl}/en`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/en/destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    ...enSlugs.map((slug) => ({
      url: `${siteUrl}/en/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.66,
    })),
    ...destinations.map((destination) => ({
      url: `${siteUrl}/en/destinations/${destination.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.62,
    })),
  ];
}
