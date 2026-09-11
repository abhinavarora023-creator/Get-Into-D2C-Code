import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MagneticButton } from "@/components/site/MagneticButton";
import { SERVICES, type ServiceData } from "@/lib/services-data";
import { createJsonLdScript } from "@/lib/seo-schema";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      {
        title: "D2C Growth Studio Services — GTM, Brand Audit & Scaling | GetIntoD2C",
      },
      {
        name: "description",
        content:
          "Explore GetIntoD2C's modular studio services for Indian consumer founders: Brand Audits, Positioning & Identity, Growth Engine, GTM Strategy, CRO, and Retention Systems.",
      },
      {
        property: "og:title",
        content: "D2C Growth Studio Services — GetIntoD2C",
      },
      {
        property: "og:description",
        content:
          "Six modular capabilities built to architect, launch, and compound profitable Indian D2C brands.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://getintod2c.in/services" },
      { property: "og:image", content: "https://getintod2c.in/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "D2C Growth Studio Services | GetIntoD2C",
      },
      {
        name: "twitter:description",
        content:
          "Brand audits, positioning, GTM, performance marketing, CRO, and retention systems for consumer brands.",
      },
      { name: "twitter:image", content: "https://getintod2c.in/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://getintod2c.in/services" }],
    scripts: [
      createJsonLdScript({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "GetIntoD2C Studio Services",
        url: "https://getintod2c.in/services",
        description:
          "Modular capabilities for consumer brand founders in India: Brand Audits, Positioning, Growth Marketing, GTM Strategy, CRO, and Retention Systems.",
        hasPart: SERVICES.map((s) => ({
          "@type": "Service",
          name: s.title,
          url: `https://getintod2c.in/services/${s.slug}`,
          description: s.tagline,
          provider: {
            "@type": "Organization",
            name: "GetIntoD2C",
            url: "https://getintod2c.in",
          },
        })),
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
            name: "Services",
            item: "https://getintod2c.in/services",
          },
        ],
      }),
    ],
  }),
  component: ServicesIndexPage,
});

function ServicesIndexPage() {
  return (
    <main className="relative min-h-screen bg-[#ffffff] text-[#0a0a0a]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden paper-bg grain pt-36 pb-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e11d2a]/30 bg-[#e11d2a]/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.28em] text-[#e11d2a]">
            <Sparkles className="h-3.5 w-3.5" /> Full-Stack Growth Capabilities
          </span>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl lg:text-7xl">
            Six modular services. <br />
            <span className="text-serif-italic text-[#e11d2a]">One compounding engine.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#0a0a0a]/75 md:text-xl">
            Not an agency retainer. A founder's operating system built to solve unit economics,
            sharpen brand positioning, and orchestrate omnichannel growth across India.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s: ServiceData, i: number) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group flex flex-col justify-between rounded-[2rem] border border-black/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#e11d2a]/50 hover:shadow-[0_20px_50px_-20px_rgba(225,29,42,0.2)] md:p-10"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-[#0a0a0a]/50">
                    <span>Capability {String(i + 1).padStart(2, "0")}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#e11d2a] opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl leading-snug transition-colors group-hover:text-[#e11d2a] md:text-3xl">
                    {s.shortTitle}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[#0a0a0a]/70 md:text-base">
                    {s.tagline}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-black/10">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0a0a]/50">
                    Core Focus
                  </div>
                  <ul className="mt-3 space-y-2 text-xs text-[#0a0a0a]/75">
                    {s.deliverables.slice(0, 2).map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#e11d2a] flex-shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#e11d2a]">
                    View Details →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Not sure which service your brand needs?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/70">
            Start with our D2C Brand & Margin Audit. We identify where your business leaks profit
            and outline a prioritized sequence before committing to execution.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services/$slug"
              params={{ slug: "d2c-brand-audit" }}
            >
              <MagneticButton>
                Explore Brand Audit <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </Link>
            <a href="/#book">
              <MagneticButton variant="ghost">
                Book A Diagnostic Call
              </MagneticButton>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
