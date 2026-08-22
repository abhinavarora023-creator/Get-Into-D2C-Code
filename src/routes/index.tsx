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
          "GetIntoD2C — D2C Brand Launchpad & Growth Studio India | GTM & Brand Building",
      },
      {
        name: "description",
        content:
          "India's premier D2C brand launchpad and GTM strategy consultancy for FMCG, skincare, snacking, health supplements, beverage, and fashion accessories founders. End-to-end brand launch, audits & unit economics.",
      },
      {
        name: "keywords",
        content:
          "D2C brand launchpad India, D2C brand building agency, D2C GTM strategy consultancy, Hire D2C brand consultant, D2C launch studio for founders, D2C brand audit services, End to end D2C brand launch services, How to launch a FMCG D2C brand, Skincare D2C brand launch agency",
      },
      {
        property: "og:title",
        content:
          "GetIntoD2C — D2C Brand Launchpad & Growth Studio India",
      },
      {
        property: "og:description",
        content:
          "A D2C launchpad for founders building the next generation of consumer brands in India. GTM strategy, brand audits, positioning, unit economics and compounding growth.",
      },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:url", content: "/" },
      {
        name: "twitter:title",
        content: "GetIntoD2C — D2C Brand Launchpad & Growth Studio India",
      },
      {
        name: "twitter:description",
        content:
          "End-to-end D2C brand launchpad, GTM consultancy & brand audit services for Indian consumer founders.",
      },
      { name: "twitter:image", content: "/og-image.png" },
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
