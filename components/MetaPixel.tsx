"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function parseTrackedUrl(href: string) {
  try {
    const url = new URL(href, window.location.origin);
    if (url.pathname !== "/api/redirect") return null;
    return {
      partner: url.searchParams.get("partner") || "unknown",
      destination: url.searchParams.get("destination") || "unknown",
      ctaId: url.searchParams.get("ctaId") || "unknown",
      pagePath: url.searchParams.get("pagePath") || window.location.pathname,
    };
  } catch {
    return null;
  }
}

function MetaPixelEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackMetaEvent("VoltescapePageView", {
      path: pathname,
      query: searchParams.toString() || null,
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!target) return;
      const tracked = parseTrackedUrl(target.href);
      if (!tracked) return;
      trackMetaEvent("AffiliateClick", tracked);
      if (tracked.partner === "aviasales") {
        trackMetaEvent("FlightDealClick", tracked);
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

export function MetaPixel() {
  if (!pixelId) {
    return null;
  }

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          height="1"
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          style={{ display: "none" }}
          width="1"
        />
      </noscript>
      <Suspense fallback={null}>
        <MetaPixelEvents />
      </Suspense>
    </>
  );
}
