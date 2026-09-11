import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  PlayCircle,
  Users,
  Compass,
  TrendingUp,
  Percent,
  ShieldCheck,
  ShoppingBag,
  Clock,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MagneticButton } from "@/components/site/MagneticButton";
import { createJsonLdScript } from "@/lib/seo-schema";
import { CATEGORIES } from "@/lib/categories-data";
import { RESOURCES } from "@/lib/resources-data";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      {
        title: "D2C Resources, Playbooks & Frameworks | GetIntoD2C",
      },
      {
        name: "description",
        content:
          "Practical operating playbooks, margin models, sourcing protocols, and unit economics frameworks for Indian consumer brand founders building defensible D2C icons.",
      },
      {
        property: "og:title",
        content: "D2C Resources & Operator Playbooks | GetIntoD2C",
      },
      {
        property: "og:description",
        content:
          "The resource directory for consumer founders. Sourcing protocols, unit economics architectures, quick commerce distribution, and retention playbooks.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://getintod2c.in/resources" },
      { property: "og:image", content: "https://getintod2c.in/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "D2C Resources & Frameworks — GetIntoD2C",
      },
      {
        name: "twitter:description",
        content:
          "Practical operating playbooks for consumer brands in India. Zero-to-one validation, supply chain negotiations, and margin models.",
      },
      { name: "twitter:image", content: "https://getintod2c.in/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://getintod2c.in/resources" }],
    scripts: [
      createJsonLdScript({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "GetIntoD2C Resource Hub",
        url: "https://getintod2c.in/resources",
        description:
          "Curated founder guides, masterclasses, and operational frameworks for D2C founders in India.",
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
            name: "Resources",
            item: "https://getintod2c.in/resources",
          },
        ],
      }),
    ],
  }),
  component: ResourcesHubPage,
});

function ResourcesHubPage() {
  const resourceTracks = [
    {
      title: "D2C Fundamentals & 0-to-1",
      icon: Compass,
      description:
        "Validating product-market fit, formulating first hero SKUs, vetting contract manufacturers, and navigating realistic MOQs.",
      linkText: "Read Launch Guide",
      to: "/resources/$slug" as const,
      params: { slug: "how-to-start-a-d2c-brand-in-india" },
    },
    {
      title: "Unit Economics & Margin Architecture",
      icon: Percent,
      description:
        "Building 65%+ gross margin buffers, calculating true contribution margins (CM1, CM2, CM3), and managing COD RTO friction.",
      linkText: "Explore Margin Guide",
      to: "/resources/$slug" as const,
      params: { slug: "d2c-contribution-margin" },
    },
    {
      title: "Brand Positioning & Whitespace",
      icon: ShieldCheck,
      description:
        "Carving out defensible shelf presence against legacy FMCG giants through radical ingredient honesty and premium sensory branding.",
      linkText: "Positioning Framework",
      to: "/resources/$slug" as const,
      params: { slug: "d2c-brand-positioning" },
    },
    {
      title: "Quick Commerce & Distribution",
      icon: ShoppingBag,
      description:
        "Packaging compliance, dark store inventory staging, and SKU velocity across Blinkit, Zepto, and Swiggy Instamart.",
      linkText: "Quick Commerce Guide",
      to: "/resources/$slug" as const,
      params: { slug: "d2c-quick-commerce-launch" },
    },
    {
      title: "Conversion Rate Optimization (CRO)",
      icon: TrendingUp,
      description:
        "Mobile PDP teardowns, sticky Add-to-Cart mechanics, upfront delivery timelines, and eliminating checkout drop-offs.",
      linkText: "Explore CRO Service",
      to: "/services/$slug" as const,
      params: { slug: "d2c-cro" },
    },
    {
      title: "Retention & Customer Lifetime Value",
      icon: Users,
      description:
        "Replenishment timing engines, post-purchase WhatsApp workflows, and turning first-time buyers into loyal repeat brand advocates.",
      linkText: "Explore Retention",
      to: "/services/$slug" as const,
      params: { slug: "d2c-retention" },
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#ffffff] text-[#0a0a0a]">
      <Nav />

      {/* Hero Section */}
      <section className="relative overflow-hidden paper-bg grain pt-36 pb-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e11d2a]/30 bg-[#e11d2a]/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.28em] text-[#e11d2a]">
            <BookOpen className="h-3.5 w-3.5" /> Founder Resource Hub
          </span>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl lg:text-7xl">
            Hard-won playbooks.{" "}
            <span className="text-serif-italic text-[#e11d2a]">
              Zero theory.
            </span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#0a0a0a]/75 md:text-xl">
            A centralized directory of operational founder guides, unit economics models, sourcing protocols, recorded masterclasses, and real brand case studies designed specifically for founders building consumer brands in India.
          </p>
        </div>
      </section>

      {/* 10 Core Founder Guides Grid */}
      <section className="relative border-t border-black/10 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-2 text-[11px] font-mono uppercase tracking-[0.32em] text-[#e11d2a]">
                Foundational Knowledge Base
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-[#0a0a0a]">
                Published Founder Guides &amp; Frameworks
              </h2>
            </div>
            <p className="max-w-md text-xs md:text-sm text-[#0a0a0a]/70">
              Ten practitioner-grade blueprints written with verified formulas, realistic financial ranges, and zero fabricated claims.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {RESOURCES.map((resource) => (
              <Link
                key={resource.slug}
                to="/resources/$slug"
                params={{ slug: resource.slug }}
                className="group flex flex-col justify-between rounded-3xl border border-black/10 bg-[#fafafa] p-7 transition hover:border-[#e11d2a] hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#0a0a0a] px-3 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white">
                      {resource.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-black/50">
                      <Clock className="h-3 w-3 text-[#e11d2a]" /> {resource.readTime}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold leading-snug text-[#0a0a0a] group-hover:text-[#e11d2a] transition-colors">
                    {resource.title}
                  </h3>

                  <p className="mt-2 text-xs md:text-sm leading-relaxed text-[#0a0a0a]/70 line-clamp-2">
                    {resource.tagline}
                  </p>

                  <div className="mt-4 rounded-xl border border-black/5 bg-white p-3 text-xs text-[#0a0a0a]/80">
                    <span className="font-semibold text-black">Direct Takeaway:</span>{" "}
                    <span className="line-clamp-2">{resource.directAnswer}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-xs font-semibold text-[#e11d2a]">
                  <span>Read Operating Guide</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Masterclass Banner */}
      <section className="relative border-t border-black/10 py-16 md:py-20 bg-[#fbfbfb]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-[#0a0a0a] p-8 text-white md:p-12">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e11d2a]/20 px-3.5 py-1 text-xs font-mono uppercase tracking-[0.2em] text-[#e11d2a]">
                  <PlayCircle className="h-3.5 w-3.5" /> Featured Video Masterclass
                </span>
                <h2 className="mt-4 font-display text-2xl md:text-4xl">
                  The Proven Playbook to Build a D2C Brand in India
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  A complete, recorded masterclass featuring 3X D2C founder Gaurav Virmani (Founder @ Go Whipped) and Kandarp Malhotra (Growth @ XTCY) breaking down contract manufacturing hurdles, low MOQs, margin protection, and quick commerce scaling.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to="/webinars/$slug"
                    params={{ slug: "proven-playbook-to-build-a-d2c-brand" }}
                  >
                    <MagneticButton>
                      Watch Full Masterclass <ArrowUpRight className="h-4 w-4" />
                    </MagneticButton>
                  </Link>
                </div>
              </div>

              <div className="flex-shrink-0 text-center md:text-right">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="font-display text-4xl text-[#e11d2a]">Full</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.25em] text-white/60">
                    Recorded Session
                  </div>
                  <div className="mt-4 text-xs text-white/50">
                    Includes 6 Tactical Chapters
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Educational Disciplines */}
      <section className="relative border-t border-black/10 bg-[#f4f4f4]/40 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
            Knowledge Tracks
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-[#0a0a0a]">
            Structured D2C Execution Disciplines
          </h2>
          <p className="mt-3 max-w-2xl text-base text-[#0a0a0a]/70">
            Explore dedicated operational guides and studio execution disciplines across formulation, margins, CRO, and retention.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resourceTracks.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.title}
                  className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 transition hover:border-[#e11d2a] hover:shadow-md"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0a0a0a] text-white group-hover:bg-[#e11d2a] transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-xl leading-snug text-[#0a0a0a]">
                      {track.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-[#0a0a0a]/70">
                      {track.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-black/10">
                    {track.to === "/resources/$slug" ? (
                      <Link
                        to="/resources/$slug"
                        params={{ slug: track.params.slug }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#e11d2a] hover:underline"
                      >
                        {track.linkText} <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <Link
                        to="/services/$slug"
                        params={{ slug: track.params.slug }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#e11d2a] hover:underline"
                      >
                        {track.linkText} <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sector Playbooks Grid */}
      <section className="relative border-t border-black/10 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-4 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
            Sector Blueprints
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-[#0a0a0a]">
            Six Consumer Categories. Calibrated for India.
          </h2>
          <p className="mt-3 max-w-2xl text-base text-[#0a0a0a]/70">
            Every consumer category has unique supply chain constraints, margins, and compliance hurdles.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to="/categories/$slug"
                params={{ slug: cat.slug }}
                className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-[#f4f4f4]/40 p-6 transition hover:border-[#e11d2a] hover:bg-white hover:shadow-sm"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/50">
                    {cat.tag}
                  </span>
                  <h3 className="mt-3 font-display text-xl text-[#0a0a0a] group-hover:text-[#e11d2a]">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#0a0a0a]/65 line-clamp-3">
                    {cat.tagline}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-black/10">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#e11d2a]">
                    View Category Blueprint →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cross link to Case Studies and Founder Community */}
      <section className="relative border-t border-black/10 bg-[#f4f4f4]/60 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white p-8">
              <h3 className="font-display text-2xl text-[#0a0a0a]">
                Verified Brand Case Studies
              </h3>
              <p className="mt-3 text-sm text-[#0a0a0a]/70">
                Explore hands-on studio client work and deep editorial teardowns across skincare, packaged goods, and luxury streetwear.
              </p>
              <div className="mt-6">
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#e11d2a] hover:underline"
                >
                  Explore All Case Studies <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-8">
              <h3 className="font-display text-2xl text-[#0a0a0a]">
                The Private Founder Network
              </h3>
              <p className="mt-3 text-sm text-[#0a0a0a]/70">
                Join our private WhatsApp group of active D2C founders trading vendor contacts, real margins, and quick commerce playbooks.
              </p>
              <div className="mt-6">
                <Link
                  to="/for-founders"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#e11d2a] hover:underline"
                >
                  Apply for Membership <ArrowUpRight className="h-4 w-4" />
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
            Want strategic support for your{" "}
            <span className="text-serif-italic text-[#e11d2a]">
              brand journey?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/70">
            Book an honest diagnostic session with studio operators to evaluate your unit economics, positioning, and growth channels.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/#book">
              <MagneticButton>
                Book Diagnostic Session <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <Link to="/services">
              <MagneticButton variant="ghost">View Studio Services</MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
