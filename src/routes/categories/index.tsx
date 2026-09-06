import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MagneticButton } from "@/components/site/MagneticButton";
import { CATEGORIES, type CategoryData } from "@/lib/categories-data";
import { createJsonLdScript } from "@/lib/seo-schema";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      {
        title: "Consumer Categories — D2C Specialization India | GetIntoD2C",
      },
      {
        name: "description",
        content:
          "Explore the six consumer verticals GetIntoD2C specializes in: Skincare & Wellness, FMCG, Modern Snacking, Health Supplements, Beverages, and Fashion Accessories in India.",
      },
      {
        property: "og:title",
        content: "Consumer Categories — D2C Specialization India | GetIntoD2C",
      },
      {
        property: "og:description",
        content:
          "Six consumer product sectors calibrated for Indian market dynamics, quick commerce, and unit economic scale.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://getintod2c.in/categories" },
      { property: "og:image", content: "https://getintod2c.in/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Consumer Categories — D2C Specialization India",
      },
      {
        name: "twitter:description",
        content: "Six consumer verticals: Skincare, FMCG, Snacking, Supplements, Beverages, and Fashion Accessories.",
      },
      { name: "twitter:image", content: "https://getintod2c.in/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://getintod2c.in/categories" }],
    scripts: [
      createJsonLdScript({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "GetIntoD2C Consumer Categories",
        url: "https://getintod2c.in/categories",
        description:
          "Six consumer categories GetIntoD2C builds for in India: Skincare, FMCG, Snacking, Supplements, Beverages, and Fashion Accessories.",
      }),
      createJsonLdScript({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://getintod2c.in",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Categories",
            item: "https://getintod2c.in/categories",
          },
        ],
      }),
    ],
  }),
  component: CategoriesIndexPage,
});

function CategoriesIndexPage() {
  return (
    <main className="relative min-h-screen bg-[#ffffff] text-[#0a0a0a]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden paper-bg grain pt-36 pb-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e11d2a]/30 bg-[#e11d2a]/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.28em] text-[#e11d2a]">
            <Sparkles className="h-3.5 w-3.5" /> Sector Specialization
          </span>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl lg:text-7xl">
            Six consumer categories. <br />
            <span className="text-serif-italic text-[#e11d2a]">Calibrated for India.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#0a0a0a]/75 md:text-xl">
            Consumer brands cannot be built on generic advice. Sourcing, margins, dark store distribution,
            and unboxing dynamics differ dramatically across categories. Explore our sector-specific playbooks.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="relative py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c: CategoryData, i: number) => (
              <Link
                key={c.slug}
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col justify-between rounded-[2rem] border border-black/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#e11d2a]/50 hover:shadow-[0_20px_50px_-20px_rgba(225,29,42,0.2)] md:p-10"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-[#0a0a0a]/50">
                    <span>{c.tag}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#e11d2a] opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl leading-snug transition-colors group-hover:text-[#e11d2a] md:text-3xl">
                    {c.name}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[#0a0a0a]/70 md:text-base">
                    {c.tagline}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-black/10">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0a0a]/50">
                    Key Dynamics
                  </div>
                  <p className="mt-2 text-xs text-[#0a0a0a]/70 line-clamp-2">
                    {c.marketDynamics[0]}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#e11d2a]">
                    Explore Category Playbook →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Building in one of these categories?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/70">
            Let's discuss formulations, contract manufacturers, packaging, and GTM sequencing
            specifically designed for your category's unit economics.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/#book">
              <MagneticButton>
                Start A Diagnostic <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <Link to="/for-founders">
              <MagneticButton variant="ghost">
                Join Founder Community
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
