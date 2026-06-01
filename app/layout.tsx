import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://voltescape.com"),
  title: {
    default: "Voltescape | Premium Travel Deals From Israel",
    template: "%s | Voltescape",
  },
  description:
    "Premium flight-deal discovery from Tel Aviv to Europe, with live Aviasales checks, affiliate-tracked booking links and smart trip add-ons.",
  openGraph: {
    title: "Voltescape",
    description: "Luxury + smart travel discovery from Israel.",
    url: "/",
    siteName: "Voltescape",
    images: [{ url: "/voltescape-hero.png", width: 1672, height: 941 }],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
