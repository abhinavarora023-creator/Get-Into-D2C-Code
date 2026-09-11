import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Problem } from "@/components/site/Problem";
import { TrustedBy } from "@/components/site/TrustedBy";
import { Industries } from "@/components/site/Industries";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { FounderEvents } from "@/components/site/FounderEvents";

import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { FloatingCTA } from "@/components/site/FloatingCTA";
import { WebinarPopup } from "@/components/site/WebinarPopup";


import { getHomepageSchemas, createJsonLdScript } from "@/lib/seo-schema";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title:
          "GetIntoD2C — D2C Growth Studio & Founder Community India",
      },
      {
        name: "description",
        content:
          "GetIntoD2C is an India-focused D2C growth studio and founder community for consumer brands. A unit of Parlexa. We help founders with GTM strategy, brand positioning, unit economics, and compounding scale.",
      },
      {
        property: "og:title",
        content:
          "GetIntoD2C — D2C Growth Studio & Founder Community India",
      },
      {
        property: "og:description",
        content:
          "GetIntoD2C is an India-focused D2C growth studio and founder community for consumer brands. A unit of Parlexa. Brand strategy, positioning, unit economics, and omnichannel scale.",
      },
      { property: "og:image", content: "https://getintod2c.in/og-image.png" },
      { property: "og:url", content: "https://getintod2c.in/" },
      {
        name: "twitter:title",
        content: "GetIntoD2C — D2C Growth Studio & Founder Community India",
      },
      {
        name: "twitter:description",
        content:
          "GetIntoD2C is an India-focused D2C growth studio and founder community for consumer brands. A unit of Parlexa.",
      },
      { name: "twitter:image", content: "https://getintod2c.in/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://getintod2c.in/" }],
    scripts: getHomepageSchemas().map(createJsonLdScript),
  }),
});

function Index() {
  return (
    <main className="relative bg-[#ffffff] text-[#0a0a0a]">
      <Nav />
      <FloatingCTA />
      <WebinarPopup />

      <Hero />
      <Problem />
      <TrustedBy />
      <Industries />
      <Services />
      <Process />
      <Stats />
      <Testimonials />
      <FounderEvents />
      <FAQ />

      <FinalCTA />
      <Footer />
      <Toaster theme="light" position="top-center" />
    </main>
  );
}
