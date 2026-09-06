import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Building,
  Target,
  ArrowLeft,
  Quote,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MagneticButton } from "@/components/site/MagneticButton";
import { CASE_STUDIES, type CaseStudyData } from "@/lib/case-studies-data";
import { SERVICES } from "@/lib/services-data";
import { CATEGORIES } from "@/lib/categories-data";
import { createJsonLdScript } from "@/lib/seo-schema";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const study = CASE_STUDIES.find((cs) => cs.slug === params.slug);
    if (!study) {
      throw notFound();
    }
    const relatedStudies = CASE_STUDIES.filter((cs) => cs.slug !== study.slug).slice(
      0,
      3
    );
    return { study, relatedStudies };
  },
  head: ({ loaderData }) => {
    const study = loaderData?.study as CaseStudyData | undefined;
    if (!study) {
      return { meta: [{ title: "Case Study Not Found | GetIntoD2C" }] };
    }
    const url = `https://getintod2c.in/case-studies/${study.slug}`;
    return {
      meta: [
        { title: study.metaTitle },
        { name: "description", content: study.metaDescription },
        { property: "og:title", content: study.metaTitle },
        { property: "og:description", content: study.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: "https://getintod2c.in/og-image.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: study.metaTitle },
        { name: "twitter:description", content: study.metaDescription },
        { name: "twitter:image", content: "https://getintod2c.in/og-image.png" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        createJsonLdScript({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.metaDescription,
          url,
          author: {
            "@type": "Organization",
            name: "GetIntoD2C Editorial & Advisory Desk",
            url: "https://getintod2c.in/about",
          },
          publisher: {
            "@type": "Organization",
            name: "GetIntoD2C",
            url: "https://getintod2c.in",
            logo: {
              "@type": "ImageObject",
              url: "https://getintod2c.in/getintod2c-logo.png",
            },
          },
          about: {
            "@type": "Brand",
            name: study.brand,
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
            {
              "@type": "ListItem",
              position: 3,
              name: study.brand,
              item: url,
            },
          ],
        }),
      ],
    };
  },
  component: CaseStudyDetailPage,
});

function CaseStudyDetailPage() {
  const { study, relatedStudies } = Route.useLoaderData();

  const relatedServices = SERVICES.filter((s) =>
    study.relatedServiceSlugs.includes(s.slug)
  );
  const relatedCategories = CATEGORIES.filter((c) =>
    study.relatedCategorySlugs.includes(c.slug)
  );

  return (
    <main className="relative min-h-screen bg-[#ffffff] text-[#0a0a0a]">
      <Nav />

      {/* Hero Section */}
      <section className="relative overflow-hidden paper-bg grain pt-36 pb-16 md:pt-48 md:pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-black/60 hover:text-[#e11d2a]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Case Studies
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#0a0a0a] px-3.5 py-1 text-xs font-mono uppercase tracking-[0.2em] text-white">
              {study.brand}
            </span>
            <span className="rounded-full border border-black/15 bg-white px-3.5 py-1 text-xs font-mono uppercase tracking-[0.2em] text-black/70">
              {study.category}
            </span>
            <span className="rounded-full border border-[#e11d2a]/30 bg-[#e11d2a]/10 px-3.5 py-1 text-xs font-mono uppercase tracking-[0.2em] text-[#e11d2a]">
              {study.relationshipType}
            </span>
          </div>

          <h1 className="mt-6 font-display text-3xl leading-[1.08] tracking-tight text-[#0a0a0a] sm:text-4xl md:text-5xl lg:text-6xl">
            {study.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-[#0a0a0a]/75 md:text-xl">
            {study.subtitle}
          </p>

          {/* Key Engagement Meta Box */}
          <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-black/10 bg-white/80 p-6 backdrop-blur-sm sm:grid-cols-3">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/50">
                Founder / Subject
              </div>
              <div className="mt-1 text-sm font-semibold text-black">
                {study.founderOrLeader}
              </div>
              <div className="text-xs text-black/60">{study.founderRole}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/50">
                Stage
              </div>
              <div className="mt-1 text-sm font-semibold text-black">
                {study.stage}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-black/50">
                Services Provided
              </div>
              <div className="mt-1 text-xs text-black/80">
                {study.servicesProvided.join(" · ")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="relative border-t border-black/10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-16 px-6">
          {/* Challenge & Diagnosis */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-[#f4f4f4]/40 p-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#e11d2a]">
                <AlertTriangle className="h-4 w-4" /> The Challenge
              </div>
              <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/80">
                {study.challenge}
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-[#f4f4f4]/40 p-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-black/70">
                <Lightbulb className="h-4 w-4" /> Strategic Diagnosis
              </div>
              <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/80">
                {study.diagnosis}
              </p>
            </div>
          </div>

          {/* Strategy & Hands-On Execution */}
          <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-12 shadow-sm">
            <h2 className="font-display text-2xl md:text-3xl">
              Strategic Approach & Execution
            </h2>
            <p className="mt-2 text-sm text-[#0a0a0a]/60">
              The operational roadmap deployed to overcome structural bottlenecks.
            </p>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-[#e11d2a]">
                  Core Strategy
                </h3>
                <ul className="mt-4 space-y-3">
                  {study.strategy.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-[#0a0a0a]/80">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#e11d2a]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-black/10 pt-8">
                <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-black/60">
                  Execution & Implementation
                </h3>
                <ul className="mt-4 space-y-3">
                  {study.execution.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-[#0a0a0a]/80">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0a0a0a]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Qualitative Outcomes & Verification Note */}
          <div className="rounded-3xl border border-black/10 bg-[#0a0a0a] p-8 text-white md:p-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#e11d2a]">
              Results & Real Outcomes
            </span>
            <h2 className="mt-2 font-display text-2xl md:text-3xl">
              What was delivered & validated
            </h2>

            <div className="mt-8 space-y-4">
              {study.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-3 text-base text-white/85">
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#e11d2a]" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>

            {study.metrics && study.metrics.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
                {study.metrics.map((m, idx) => (
                  <div key={idx} className="rounded-xl bg-white/5 p-4">
                    <div className="font-display text-3xl text-[#e11d2a]">{m.value}</div>
                    <div className="mt-1 text-xs text-white/70">{m.label}</div>
                    {m.note && (
                      <div className="mt-1 text-[10px] text-white/40">{m.note}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
              <strong>Factual Verification Note:</strong> Metrics and outcomes reflect first-party verified records and operator retrospectives. Commercial benchmarks are shared qualitatively to respect client confidentiality.
            </div>
          </div>

          {/* Testimonial Quote */}
          {study.testimonialQuote && (
            <div className="rounded-3xl border border-[#e11d2a]/30 bg-[#e11d2a]/5 p-8 md:p-12">
              <Quote className="h-8 w-8 text-[#e11d2a]" />
              <p className="mt-4 text-serif-italic text-2xl leading-relaxed text-[#0a0a0a] md:text-3xl">
                &ldquo;{study.testimonialQuote.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-[#e11d2a]/20 pt-4">
                <div className="font-display text-lg text-[#0a0a0a]">
                  {study.testimonialQuote.author}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#0a0a0a]/60">
                  {study.testimonialQuote.role}
                </div>
              </div>
            </div>
          )}

          {/* Key Founder Lessons */}
          <div className="rounded-3xl border border-black/10 bg-[#f4f4f4]/60 p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl">
              Key Lessons for D2C Founders
            </h2>
            <ul className="mt-6 space-y-4">
              {study.lessons.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-5 text-sm leading-relaxed text-[#0a0a0a]/80 shadow-sm">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] font-mono text-xs text-white">
                    {idx + 1}
                  </span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Studio Disciplines & Categories */}
          <div className="grid gap-6 border-t border-black/10 pt-12 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-[#e11d2a]">
                Related Studio Services
              </h3>
              <div className="mt-4 space-y-2">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="group flex items-center justify-between rounded-xl border border-black/10 bg-white p-4 transition hover:border-[#e11d2a]"
                  >
                    <span className="text-sm font-medium text-black group-hover:text-[#e11d2a]">
                      {service.title}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-black/40 group-hover:text-[#e11d2a]" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-[#e11d2a]">
                Related Sector Guides
              </h3>
              <div className="mt-4 space-y-2">
                {relatedCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to="/categories/$slug"
                    params={{ slug: cat.slug }}
                    className="group flex items-center justify-between rounded-xl border border-black/10 bg-white p-4 transition hover:border-[#e11d2a]"
                  >
                    <span className="text-sm font-medium text-black group-hover:text-[#e11d2a]">
                      {cat.name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-black/40 group-hover:text-[#e11d2a]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Want to solve these bottlenecks for{" "}
            <span className="text-serif-italic text-[#e11d2a]">
              your brand?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/70">
            Book an honest diagnostic session with GetIntoD2C studio operators to evaluate your positioning, margin structure, and growth readiness.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/#book">
              <MagneticButton>
                Start A Diagnostic <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <Link to="/case-studies">
              <MagneticButton variant="ghost">All Case Studies</MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
