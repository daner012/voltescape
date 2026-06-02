import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { MetaPixel } from "@/components/MetaPixel";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://voltescape.com"),
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
    images: [{ url: "/voltescape-hero.png", width: 1672, height: 941 }],
    type: "website",
    locale: "he_IL",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={heebo.className}>
      <body>
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
