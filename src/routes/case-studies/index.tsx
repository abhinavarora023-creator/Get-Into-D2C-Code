import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, BookOpen, Layers, Target } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MagneticButton } from "@/components/site/MagneticButton";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { createJsonLdScript } from "@/lib/seo-schema";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      {
        title: "D2C Case Studies & Playbooks — Real Brand Engagements | GetIntoD2C",
      },
      {
        name: "description",
        content:
          "Explore real-world case studies and teardowns from GetIntoD2C. Real founder engagements, margin architecture, hero SKU validation, and clean-label playbooks across Indian consumer brands.",
      },
      {
        property: "og:title",
        content: "D2C Case Studies & Brand Breakdowns | GetIntoD2C",
      },
      {
        property: "og:description",
        content:
          "Verified brand work, zero-to-one formulation playbooks, and strategic teardowns for Indian consumer brands.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://getintod2c.in/case-studies",
      },
      { property: "og:image", content: "https://getintod2c.in/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "D2C Case Studies — GetIntoD2C Growth Studio",
      },
      {
        name: "twitter:description",
        content:
          "Verified brand engagements, formulation hurdles, margin models, and packaging teardowns for consumer founders.",
      },
      { name: "twitter:image", content: "https://getintod2c.in/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://getintod2c.in/case-studies" }],
    scripts: [
      createJsonLdScript({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "GetIntoD2C Case Studies & Brand Teardowns",
        url: "https://getintod2c.in/case-studies",
        description:
          "Verified case studies and strategic breakdowns from GetIntoD2C's studio engagements and D2C research desk.",
        publisher: {
          "@type": "Organization",
          name: "GetIntoD2C",
          url: "https://getintod2c.in",
        },
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
            name: "Case Studies",
            item: "https://getintod2c.in/case-studies",
          },
        ],
      }),
    ],
  }),
  component: CaseStudiesIndexPage,
});

function CaseStudiesIndexPage() {
  const directEngagements = CASE_STUDIES.filter((cs) => !cs.isTeardown);
  const researchTeardowns = CASE_STUDIES.filter((cs) => cs.isTeardown);

  return (
    <main className="relative min-h-screen bg-[#ffffff] text-[#0a0a0a]">
      <Nav />

      {/* Hero Section */}
      <section className="relative overflow-hidden paper-bg grain pt-36 pb-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e11d2a]/30 bg-[#e11d2a]/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.28em] text-[#e11d2a]">
            <BookOpen className="h-3.5 w-3.5" /> Field Evidence & Case Studies
          </span>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl lg:text-7xl">
            Real brands. Real hurdles.{" "}
            <span className="text-serif-italic text-[#e11d2a]">
              Unvarnished work.
            </span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#0a0a0a]/75 md:text-xl">
            We believe in proof over theory. Explore our studio client engagements, founder-mentor collaborations, and deep research teardowns dissecting what truly moves the needle for Indian consumer brands.
          </p>
        </div>
      </section>

      {/* Section 1: Studio Engagements & Partner Work */}
      <section className="relative border-t border-black/10 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
            First-Party Work
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-[#0a0a0a]">
            Studio Engagements & Partner Brands
          </h2>
          <p className="mt-3 max-w-2xl text-base text-[#0a0a0a]/70">
            Direct advisory, positioning, and zero-to-one operational collaborations conducted alongside consumer brand founders.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {directEngagements.map((cs) => (
              <article
                key={cs.slug}
                className="group flex flex-col justify-between rounded-[2rem] border border-black/10 bg-[#f4f4f4]/40 p-8 transition hover:border-[#e11d2a] hover:bg-white hover:shadow-lg md:p-10"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.2em]">
                    <span className="rounded-full bg-[#0a0a0a] px-3 py-1 text-white">
                      {cs.brand}
                    </span>
                    <span className="rounded-full border border-black/15 px-3 py-1 text-black/60">
                      {cs.category}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl leading-snug text-[#0a0a0a] group-hover:text-[#e11d2a]">
                    <Link to="/case-studies/$slug" params={{ slug: cs.slug }}>
                      {cs.title}
                    </Link>
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[#0a0a0a]/75">
                    {cs.subtitle}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-black/10 pt-4 text-xs text-[#0a0a0a]/65">
                    <div>
                      <strong className="text-black">Founder / Lead:</strong>{" "}
                      {cs.founderOrLeader} ({cs.founderRole})
                    </div>
                    <div>
                      <strong className="text-black">Core Focus:</strong>{" "}
                      {cs.servicesProvided.join(" · ")}
                    </div>
                  </div>

                  {cs.testimonialQuote && (
                    <blockquote className="mt-6 rounded-xl border-l-2 border-[#e11d2a] bg-white p-4 text-xs italic text-[#0a0a0a]/80 shadow-sm">
                      &ldquo;{cs.testimonialQuote.quote}&rdquo;
                    </blockquote>
                  )}
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to="/case-studies/$slug"
                    params={{ slug: cs.slug }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#e11d2a] hover:underline"
                  >
                    Read Full Case Study <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Editorial Research Teardowns */}
      <section className="relative border-t border-black/10 bg-[#f4f4f4]/60 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
            Research & Industry Intelligence
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-[#0a0a0a]">
            Editorial Research Teardowns
          </h2>
          <p className="mt-3 max-w-2xl text-base text-[#0a0a0a]/70">
            Independent analyses conducted by GetIntoD2C's research desk dissecting benchmark consumer icons, margin preservation, and category disruption across India.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {researchTeardowns.map((cs) => (
              <article
                key={cs.slug}
                className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 transition hover:border-[#e11d2a] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-black/50">
                    <span className="font-semibold text-black">{cs.brand}</span>
                    <span className="text-[10px] text-[#e11d2a]">Teardown</span>
                  </div>

                  <h3 className="mt-4 font-display text-xl leading-snug text-[#0a0a0a] group-hover:text-[#e11d2a]">
                    <Link to="/case-studies/$slug" params={{ slug: cs.slug }}>
                      {cs.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-[#0a0a0a]/70">
                    {cs.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/10">
                  <Link
                    to="/case-studies/$slug"
                    params={{ slug: cs.slug }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#e11d2a] hover:underline"
                  >
                    View Teardown <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-linking to Services and Founder Community */}
      <section className="relative border-t border-black/10 bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/10 p-6">
              <h3 className="font-display text-xl text-[#0a0a0a]">
                Looking for Studio Support?
              </h3>
              <p className="mt-2 text-sm text-[#0a0a0a]/70">
                Explore our six core studio disciplines spanning brand audits, positioning, unit economics, and compounding growth.
              </p>
              <div className="mt-4">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#e11d2a] hover:underline"
                >
                  View Growth Studio Services →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-6">
              <h3 className="font-display text-xl text-[#0a0a0a]">
                Join the Founder Network
              </h3>
              <p className="mt-2 text-sm text-[#0a0a0a]/70">
                Connect with consumer founders in our curated WhatsApp network for candid operator playbooks and mutual peer support.
              </p>
              <div className="mt-4">
                <Link
                  to="/for-founders"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#e11d2a] hover:underline"
                >
                  Apply to Founder Community →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Ready to solve your brand's{" "}
            <span className="text-serif-italic text-[#e11d2a]">
              hardest margin bottlenecks?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/70">
            Whether you are validating your first formulation or optimizing CAC and RTO, talk directly to studio operators.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/#book">
              <MagneticButton>
                Book Diagnostic Session <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <Link to="/services">
              <MagneticButton variant="ghost">Explore Services</MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
