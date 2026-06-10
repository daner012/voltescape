import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { MetaPixel } from "@/components/MetaPixel";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.voltescape.com"),
  title: {
    default: "Voltescape | טיסות זולות מתל אביב לאירופה",
    template: "%s | Voltescape",
  },
  description:
    "טיסות זולות מתל אביב לאירופה, חופשות עיר, מלונות, פעילויות, eSIM והסעות — הכל במקום אחד, עם התאריכים הזולים ביותר.",
  openGraph: {
    title: "Voltescape | טיסות זולות מתל אביב לאירופה",
    description: "מוצאים לך את הטיסות הכי זולות מתל אביב לאירופה, יחד עם מלונות, פעילויות ו-eSIM.",
    url: "/",
    siteName: "Voltescape",
    images: [{ url: "/og-image.jpg", width: 1200, height: 675 }],
    type: "website",
    locale: "he_IL",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={heebo.className}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var s=document.createElement('script');s.async=1;s.src='https://emrld.ltd/NTM0OTgz.js?t=534983';document.head.appendChild(s);})();` }} />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "Organization", "@id": "https://www.voltescape.com/#org", name: "Voltescape", url: "https://www.voltescape.com", logo: "https://www.voltescape.com/icon.svg", sameAs: ["https://t.me/voltescape_deals"] }, { "@type": "WebSite", "@id": "https://www.voltescape.com/#website", url: "https://www.voltescape.com", name: "Voltescape", publisher: { "@id": "https://www.voltescape.com/#org" } }] }) }} /><MetaPixel />
      </body>
    </html>
