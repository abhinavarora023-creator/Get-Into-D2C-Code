import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Users,
  Sparkles,
  Building2,
  Target,
  CheckCircle2,
  BookOpen,
  Compass,
  Briefcase,
  Video,
  Calendar,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MagneticButton } from "@/components/site/MagneticButton";
import { BrandLogo } from "@/components/site/BrandLogo";
import { createJsonLdScript } from "@/lib/seo-schema";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About GetIntoD2C — D2C Growth Studio & Founder Community India",
      },
      {
        name: "description",
        content:
          "GetIntoD2C is an India-focused D2C growth studio and founder community for consumer brands. A unit of Parlexa. We help consumer founders build brands worth remembering.",
      },
      {
        property: "og:title",
        content: "About GetIntoD2C — D2C Growth Studio & Founder Community",
      },
      {
        property: "og:description",
        content:
          "An India-focused growth studio and founder community helping consumer brand founders with GTM, positioning, unit economics, and compounding scale.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://getintod2c.in/about" },
      { property: "og:image", content: "https://getintod2c.in/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "About GetIntoD2C — Growth Studio & Founder Community",
      },
      {
        name: "twitter:description",
        content:
          "GetIntoD2C is an India-focused D2C growth studio and founder community for consumer brands. A unit of Parlexa.",
      },
      { name: "twitter:image", content: "https://getintod2c.in/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://getintod2c.in/about" }],
    scripts: [
      createJsonLdScript({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": "https://getintod2c.in/about#webpage",
        name: "About GetIntoD2C",
        url: "https://getintod2c.in/about",
        description:
          "GetIntoD2C is an India-focused D2C growth studio and founder community for consumer brands. A unit of Parlexa.",
        publisher: {
          "@type": "Organization",
          "@id": "https://getintod2c.in/#organization",
          name: "GetIntoD2C",
          legalName: "GetIntoD2C (A Unit of Parlexa)",
          url: "https://getintod2c.in",
          logo: "https://getintod2c.in/getintod2c-logo.png",
          parentOrganization: {
            "@type": "Organization",
            name: "Parlexa",
            url: "https://parlexa.in",
            foundingDate: "2013",
          },
          member: [
            {
              "@type": "Person",
              "@id": "https://getintod2c.in/#person-abhinav-arora",
              name: "Abhinav Arora",
              jobTitle: "Studio & Strategy Lead",
              worksFor: {
                "@id": "https://getintod2c.in/#organization",
              },
            },
            {
              "@type": "Person",
              "@id": "https://getintod2c.in/#person-gaurav-virmani",
              name: "Gaurav Virmani",
              jobTitle: "D2C Mentor & Speaker",
              image: "https://getintod2c.in/gaurav-virmani.jpg",
              worksFor: {
                "@id": "https://getintod2c.in/#organization",
              },
            },
            {
              "@type": "Person",
              "@id": "https://getintod2c.in/#person-kandarp-malhotra",
              name: "Kandarp Malhotra",
              jobTitle: "Growth Marketer & Speaker",
              image: "https://getintod2c.in/kandarp-malhotra.jpeg",
              worksFor: {
                "@id": "https://getintod2c.in/#organization",
              },
            },
          ],
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
            name: "About",
            item: "https://getintod2c.in/about",
          },
        ],
      }),
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#ffffff] text-[#0a0a0a]">
      <Nav />

      {/* Hero Section */}
      <section className="relative overflow-hidden paper-bg grain pt-36 pb-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e11d2a]/30 bg-[#e11d2a]/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.28em] text-[#e11d2a]">
            <Sparkles className="h-3.5 w-3.5" /> Entity & Mission
          </span>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl lg:text-7xl">
            Built for founders with the ambition to build{" "}
            <span className="text-serif-italic text-[#e11d2a]">consumer icons.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#0a0a0a]/75 md:text-xl">
            GetIntoD2C is an India-focused D2C growth studio and founder community for consumer brands.
            We operate at the intersection of supply-chain discipline, brand positioning, and contribution-margin economics.
          </p>

          {/* Quick Entity Summary Box */}
          <div className="mt-10 rounded-3xl border border-black/10 bg-white/80 p-6 backdrop-blur-sm md:p-8">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#e11d2a]">
              The Entity at a Glance
            </div>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-4 text-sm">
              <div>
                <strong className="block text-black">Core Identity</strong>
                <span className="text-[#0a0a0a]/70">Growth Studio & Founder Community</span>
              </div>
              <div>
                <strong className="block text-black">Parent Organization</strong>
                <span className="text-[#0a0a0a]/70">Parlexa (Established 2013)</span>
              </div>
              <div>
                <strong className="block text-black">Primary Focus</strong>
                <span className="text-[#0a0a0a]/70">Indian Consumer Products (D2C)</span>
              </div>
              <div>
                <strong className="block text-black">Operating Pillars</strong>
                <span className="text-[#0a0a0a]/70">Hands-on Studio + Private Network</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Pillars: Studio & Community */}
      <section className="relative border-y border-black/10 bg-[#f4f4f4]/60 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
            Our Operating Model
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[2rem] border border-black/10 bg-white p-8 md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0a0a0a] text-white">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl md:text-3xl">The Growth Studio</h2>
              <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/70">
                A hands-on advisory and execution partner. We work directly with consumer founders on brand diagnostics,
                whitespace positioning, unit economics architecture, conversion rate optimization, and compounding omnichannel scale.
              </p>
              <div className="mt-6 pt-6 border-t border-black/10 flex items-center justify-between">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#e11d2a] hover:underline"
                >
                  Explore Studio Services <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-1 text-xs text-black/60 hover:text-black"
                >
                  View Case Studies →
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/10 bg-white p-8 md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e11d2a] text-white">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl md:text-3xl">The Founder Community</h2>
              <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/70">
                An exclusive, invitation-only WhatsApp network and private dinner series. Free of agencies, pitches,
                or noise—just founders in the trenches trading honest playbooks on sourcing, CAC, RTO, and quick commerce.
              </p>
              <div className="mt-6 pt-6 border-t border-black/10 flex items-center justify-between">
                <Link
                  to="/for-founders"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#e11d2a] hover:underline"
                >
                  Apply to Community <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/resources"
                  className="inline-flex items-center gap-1 text-xs text-black/60 hover:text-black"
                >
                  Browse Resources →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Heritage: Parlexa */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 rounded-3xl border border-black/10 bg-[#0a0a0a] p-8 text-white md:p-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#e11d2a]">
                Institutional Parentage
              </span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">A Unit of Parlexa</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                GetIntoD2C is incubated by Parlexa, an established digital transformation and growth consultancy
                founded in 2013. We combine Parlexa's decade-long enterprise track record with specialized, agile execution
                built exclusively for modern consumer product startups.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-[0.2em] text-white/60">
                <span>Enterprise Pedigree</span>
                <span>•</span>
                <span>Consumer Focus</span>
                <span>•</span>
                <span>India-First Execution</span>
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="font-display text-5xl text-[#e11d2a] md:text-6xl">2013</div>
              <div className="mt-1 text-xs uppercase tracking-[0.25em] text-white/50">Parent Co. Established</div>
            </div>
          </div>
        </div>
      </section>

      {/* Practitioners & Leadership (Verified Repository Data) */}
      <section className="relative border-t border-black/10 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
            Practitioners & Mentors
          </div>
          <h2 className="font-display text-3xl md:text-5xl">
            Experienced operators, <span className="text-serif-italic">in your corner.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#0a0a0a]/70">
            We do not believe in theory from the sidelines. Our studio leads and community mentors have launched,
            scaled, and operated consumer brands across Indian retail and digital channels.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Abhinav Arora */}
            <div className="flex flex-col justify-between rounded-2xl border border-black/10 bg-[#f4f4f4]/60 p-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e11d2a]">
                  Studio & Strategy Lead
                </div>
                <div className="mt-2 font-display text-2xl text-[#0a0a0a]">Abhinav Arora</div>
                <div className="text-xs text-[#0a0a0a]/50">GetIntoD2C Studio Lead</div>
                <p className="mt-4 text-sm leading-relaxed text-[#0a0a0a]/75">
                  Directs strategic brand diagnostics, whitespace positioning, and contribution-margin economics for early-stage and scaling consumer founders.
                </p>

                <div className="mt-5 space-y-2 border-t border-black/10 pt-4 text-xs text-[#0a0a0a]/65">
                  <div>
                    <strong className="text-black">Focus:</strong> Margin Diagnostics, Positioning, GTM Roadmaps
                  </div>
                  <div>
                    <strong className="text-black">Engagement:</strong> 1:1 Founder Strategy & Diagnostics
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/10">
                <a
                  href="https://cal.id/abhinav-arora/getintod2c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e11d2a] hover:underline"
                >
                  Book Diagnostic Session <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Gaurav Virmani */}
            <div className="flex flex-col justify-between rounded-2xl border border-black/10 bg-[#f4f4f4]/60 p-6">
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src="/gaurav-virmani.jpg"
                    alt="Gaurav Virmani"
                    className="h-12 w-12 rounded-full object-cover border border-black/15"
                  />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e11d2a]">
                      Mentor & Speaker
                    </div>
                    <div className="font-display text-xl text-[#0a0a0a]">Gaurav Virmani</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-[#0a0a0a]/50">Founder @ Go Whipped · 3X D2C Founder</div>
                <p className="mt-4 text-sm leading-relaxed text-[#0a0a0a]/75">
                  Deep operator expertise in zero-to-one consumer formulations, vetting Indian contract manufacturers, negotiating realistic MOQs, and achieving product-market fit.
                </p>

                <div className="mt-5 space-y-2 border-t border-black/10 pt-4 text-xs text-[#0a0a0a]/65">
                  <div>
                    <strong className="text-black">Focus:</strong> Formulations, Supplier Sourcing, MOQ Negotiation
                  </div>
                  <div>
                    <strong className="text-black">Field Work:</strong> Founder Masterclass & GoWhipped Case Study
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                <Link
                  to="/case-studies/$slug"
                  params={{ slug: "gowhipped" }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#e11d2a] hover:underline"
                >
                  View Case Study →
                </Link>
                <Link
                  to="/webinars/$slug"
                  params={{ slug: "proven-playbook-to-build-a-d2c-brand" }}
                  className="inline-flex items-center gap-1 text-xs text-black/60 hover:text-black"
                >
                  Watch Session →
                </Link>
              </div>
            </div>

            {/* Kandarp Malhotra */}
            <div className="flex flex-col justify-between rounded-2xl border border-black/10 bg-[#f4f4f4]/60 p-6">
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src="/kandarp-malhotra.jpeg"
                    alt="Kandarp Malhotra"
                    className="h-12 w-12 rounded-full object-cover border border-black/15"
                  />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e11d2a]">
                      Growth Marketer
                    </div>
                    <div className="font-display text-xl text-[#0a0a0a]">Kandarp Malhotra</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-[#0a0a0a]/50">Growth Marketer @ XTCY · Webinar Speaker</div>
                <p className="mt-4 text-sm leading-relaxed text-[#0a0a0a]/75">
                  Specialist in omnichannel performance marketing, CAC optimization, and scaling fast-moving consumer brands across instant replenishment channels (Blinkit, Zepto, Instamart).
                </p>

                <div className="mt-5 space-y-2 border-t border-black/10 pt-4 text-xs text-[#0a0a0a]/65">
                  <div>
                    <strong className="text-black">Focus:</strong> Paid Media, CAC Control, Quick Commerce Scaling
                  </div>
                  <div>
                    <strong className="text-black">Field Work:</strong> GetIntoD2C Live Round-Table Speaker
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/10">
                <Link
                  to="/webinars/$slug"
                  params={{ slug: "proven-playbook-to-build-a-d2c-brand" }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e11d2a] hover:underline"
                >
                  Watch Masterclass Session <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes GetIntoD2C Different */}
      <section className="relative border-t border-black/10 bg-[#f4f4f4]/40 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
            The Differentiator
          </div>
          <h2 className="font-display text-3xl md:text-5xl">
            Why consumer founders <span className="text-serif-italic">partner with us.</span>
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="font-display text-xl text-black">Margin-First Economics</div>
              <p className="mt-2 text-sm text-[#0a0a0a]/70 leading-relaxed">
                We do not optimize for vanity top-line GMV. Every strategy is built to protect contribution margin (CM2 and CM3) after logistics, COD, and ad spend.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="font-display text-xl text-black">Operator-to-Operator</div>
              <p className="mt-2 text-sm text-[#0a0a0a]/70 leading-relaxed">
                You work directly with practitioners who have built brands, managed factory runs, and solved courier transit hurdles firsthand in India.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="font-display text-xl text-black">Zero Pitch Noise</div>
              <p className="mt-2 text-sm text-[#0a0a0a]/70 leading-relaxed">
                Our founder community is completely free of sales pitches, service agencies, or self-promotional spam—strictly genuine peer collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Six Core Categories */}
      <section className="relative border-t border-black/10 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
            Sector Specialization
          </div>
          <h2 className="font-display text-3xl md:text-5xl">
            Six consumer categories. <span className="text-serif-italic">Calibrated for India.</span>
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              ["Skincare & Wellness", "/categories/skincare"],
              ["FMCG & Packaged Goods", "/categories/fmcg"],
              ["Modern Snacking", "/categories/healthy-snacking"],
              ["Health Supplements", "/categories/health-supplements"],
              ["Beverages", "/categories/beverages"],
              ["Fashion Accessories", "/categories/fashion-accessories"],
            ].map(([title, href]) => (
              <Link
                key={title}
                to={href}
                className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-[#f4f4f4]/40 p-5 transition hover:border-[#e11d2a] hover:bg-white hover:shadow-md"
              >
                <span className="font-display text-lg text-[#0a0a0a] group-hover:text-[#e11d2a]">
                  {title}
                </span>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-[#0a0a0a]/50 group-hover:text-[#e11d2a]">
                  View Category Blueprint →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How a Founder Can Work With Us */}
      <section className="relative border-t border-black/10 bg-[#f4f4f4]/60 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
            Engagement Paths
          </div>
          <h2 className="font-display text-3xl md:text-5xl">
            How founders work with <span className="text-serif-italic">GetIntoD2C.</span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white p-8">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#e11d2a]">
                Option 01 · Diagnostic & Studio
              </div>
              <h3 className="mt-2 font-display text-2xl text-[#0a0a0a]">
                1:1 Studio Diagnostic Session
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0a0a0a]/70">
                Book a focused diagnostic call with Abhinav Arora and the studio team to dissect your margin leaks, positioning whitespace, or launch roadmap.
              </p>
              <div className="mt-6">
                <a
                  href="https://cal.id/abhinav-arora/getintod2c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#e11d2a] hover:underline"
                >
                  Schedule Studio Call <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-8">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#e11d2a]">
                Option 02 · Founder Network
              </div>
              <h3 className="mt-2 font-display text-2xl text-[#0a0a0a]">
                Curated Founder WhatsApp Group
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#0a0a0a]/70">
                Apply to join our vetted, invitation-only network of consumer founders sharing manufacturer recommendations, instant delivery playbooks, and peer advice.
              </p>
              <div className="mt-6">
                <Link
                  to="/for-founders"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#e11d2a] hover:underline"
                >
                  Apply to Join Community <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Ready to build a brand <span className="text-serif-italic text-[#e11d2a]">worth remembering?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/70">
            Whether you are pre-launch or looking to optimize leaking contribution margins, connect with the studio.
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
