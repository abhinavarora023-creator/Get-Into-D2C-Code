import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  HelpCircle,
  Info,
  Lightbulb,
  AlertTriangle,
  Layers,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MagneticButton } from "@/components/site/MagneticButton";
import {
  RESOURCES,
  type ResourceData,
  type ResourceSection,
} from "@/lib/resources-data";
import { SERVICES } from "@/lib/services-data";
import { CATEGORIES } from "@/lib/categories-data";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { createJsonLdScript } from "@/lib/seo-schema";
import { ContributionMarginCalculator } from "@/components/resources/ContributionMarginCalculator";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const resource = RESOURCES.find((r) => r.slug === params.slug);
    if (!resource) {
      throw notFound();
    }

    const relatedResources = RESOURCES.filter((r) =>
      resource.relatedResourceSlugs.includes(r.slug)
    ).slice(0, 3);

    // Fallback if relatedResourceSlugs has fewer than 3
    const finalRelatedResources =
      relatedResources.length > 0
        ? relatedResources
        : RESOURCES.filter((r) => r.slug !== resource.slug).slice(0, 3);

    return { resource, relatedResources: finalRelatedResources };
  },
  head: ({ loaderData }) => {
    const resource = loaderData?.resource as ResourceData | undefined;
    if (!resource) {
      return { meta: [{ title: "Resource Not Found | GetIntoD2C" }] };
    }

    const url = `https://getintod2c.in/resources/${resource.slug}`;

    const jsonLdScripts = [
      createJsonLdScript({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: resource.title,
        description: resource.metaDescription,
        url,
        datePublished: resource.publishedDate,
        dateModified: resource.publishedDate,
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
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
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
          {
            "@type": "ListItem",
            position: 3,
            name: resource.title,
            item: url,
          },
        ],
      }),
    ];

    if (resource.faqs && resource.faqs.length > 0) {
      jsonLdScripts.push(
        createJsonLdScript({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: resource.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        })
      );
    }

    return {
      meta: [
        { title: resource.metaTitle },
        { name: "description", content: resource.metaDescription },
        { property: "og:title", content: resource.metaTitle },
        { property: "og:description", content: resource.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: "https://getintod2c.in/og-image.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: resource.metaTitle },
        { name: "twitter:description", content: resource.metaDescription },
        { name: "twitter:image", content: "https://getintod2c.in/og-image.png" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: jsonLdScripts,
    };
  },
  component: ResourceDetailPage,
});

function SectionRenderer({ section }: { section: ResourceSection }) {
  switch (section.type) {
    case "h2":
      return (
        <h2 className="mt-12 mb-4 scroll-mt-24 font-display text-2xl font-bold tracking-tight text-[#0a0a0a] sm:text-3xl">
          {section.title}
        </h2>
      );

    case "h3":
      return (
        <h3 className="mt-8 mb-3 scroll-mt-24 font-display text-xl font-semibold text-[#0a0a0a]">
          {section.title}
        </h3>
      );

    case "text":
      return (
        <p className="my-4 text-base leading-relaxed text-[#0a0a0a]/80 md:text-lg">
          {section.content}
        </p>
      );

    case "list":
      return (
        <div className="my-5">
          {section.title && (
            <h4 className="mb-2 font-display text-base font-semibold text-[#0a0a0a]">
              {section.title}
            </h4>
          )}
          <ul className="space-y-2.5">
            {section.items?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-[#0a0a0a]/80 md:text-base">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#e11d2a]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "checklist":
      return (
        <div className="my-6 rounded-2xl border border-black/10 bg-[#f9f9f9] p-6">
          {section.title && (
            <h4 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-[#0a0a0a]">
              <CheckCircle2 className="h-5 w-5 text-[#e11d2a]" />
              {section.title}
            </h4>
          )}
          <ul className="space-y-3">
            {section.items?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-[#0a0a0a]/85 md:text-base">
                <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#e11d2a]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "callout": {
      const variant = section.calloutVariant || "note";
      const styles = {
        note: {
          bg: "bg-blue-50/70 border-blue-200 text-blue-950",
          icon: <Info className="h-5 w-5 text-blue-600" />,
        },
        tip: {
          bg: "bg-emerald-50/70 border-emerald-200 text-emerald-950",
          icon: <Sparkles className="h-5 w-5 text-emerald-600" />,
        },
        warning: {
          bg: "bg-amber-50/70 border-amber-200 text-amber-950",
          icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
        },
        framework: {
          bg: "bg-[#0a0a0a] border-black text-white",
          icon: <Layers className="h-5 w-5 text-[#e11d2a]" />,
        },
      }[variant];

      return (
        <div className={`my-6 rounded-2xl border p-6 ${styles.bg}`}>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0">{styles.icon}</div>
            <div>
              {section.title && (
                <div className={`font-display font-semibold mb-1 text-base ${variant === "framework" ? "text-white" : ""}`}>
                  {section.title}
                </div>
              )}
              {section.content && (
                <div className={`text-sm leading-relaxed ${variant === "framework" ? "text-white/80" : "text-black/80"}`}>
                  {section.content}
                </div>
              )}
              {section.items && (
                <ul className="mt-3 space-y-1.5">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="text-xs leading-relaxed opacity-90">
                      • {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      );
    }

    case "framework":
      return (
        <div className="my-8 rounded-2xl border-2 border-black bg-white p-6 md:p-8 shadow-sm">
          {section.title && (
            <div className="mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#e11d2a]">
              <Layers className="h-4 w-4" />
              <span>{section.title}</span>
            </div>
          )}
          {section.content && (
            <p className="text-base leading-relaxed text-[#0a0a0a]/85 font-medium mb-4">
              {section.content}
            </p>
          )}
          {section.items && (
            <div className="grid gap-3 sm:grid-cols-2 mt-4">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-black/10 bg-[#f9f9f9] p-4 text-xs md:text-sm leading-relaxed text-[#0a0a0a]/80"
                >
                  <span className="font-mono text-[#e11d2a] font-bold mr-2">0{idx + 1}.</span>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case "table":
      if (!section.table) return null;
      return (
        <div className="my-8 overflow-hidden rounded-2xl border border-black/15 bg-white shadow-xs">
          {section.title && (
            <div className="border-b border-black/10 bg-[#f9f9f9] px-6 py-3 font-display text-sm font-semibold text-[#0a0a0a]">
              {section.title}
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="border-b border-black/10 bg-[#f4f4f4] text-black">
                <tr>
                  {section.table.headers.map((h, idx) => (
                    <th key={idx} className="px-4 py-3.5 font-mono text-[11px] uppercase tracking-wider text-black/70">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {section.table.rows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`px-4 py-3.5 text-[#0a0a0a]/80 ${cIdx === 0 ? "font-medium text-[#0a0a0a]" : ""}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "calculator":
      return <ContributionMarginCalculator />;

    default:
      return null;
  }
}

function ResourceDetailPage() {
  const { resource, relatedResources } = Route.useLoaderData();

  const relatedServices = SERVICES.filter((s) =>
    resource.relatedServiceSlugs.includes(s.slug)
  );
  const relatedCategories = CATEGORIES.filter((c) =>
    resource.relatedCategorySlugs.includes(c.slug)
  );
  const relatedCaseStudies = CASE_STUDIES.filter((cs) =>
    resource.relatedCaseStudySlugs.includes(cs.slug)
  );

  return (
    <main className="relative min-h-screen bg-[#ffffff] text-[#0a0a0a]">
      <Nav />

      {/* Hero Header */}
      <section className="relative overflow-hidden paper-bg grain pt-36 pb-16 md:pt-44 md:pb-20 border-b border-black/10">
        <div className="mx-auto max-w-4xl px-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider text-black/60">
            <Link to="/" className="hover:text-[#e11d2a] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-black/30" />
            <Link to="/resources" className="hover:text-[#e11d2a] transition-colors">
              Resources
            </Link>
            <ChevronRight className="h-3 w-3 text-black/30" />
            <span className="text-[#e11d2a]">{resource.category}</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#0a0a0a] px-3.5 py-1 text-xs font-mono uppercase tracking-[0.2em] text-white">
              {resource.category}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-3.5 py-1 text-xs font-mono uppercase tracking-[0.15em] text-black/70">
              <Clock className="h-3 w-3 text-[#e11d2a]" /> {resource.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-3.5 py-1 text-xs font-mono uppercase tracking-[0.15em] text-black/70">
              <Calendar className="h-3 w-3 text-[#e11d2a]" /> Updated September 2026
            </span>
          </div>

          {/* H1 */}
          <h1 className="mt-6 font-display text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0a0a] sm:text-4xl md:text-5xl">
            {resource.h1}
          </h1>

          {/* Tagline */}
          <p className="mt-6 text-lg leading-relaxed text-[#0a0a0a]/75 md:text-xl">
            {resource.tagline}
          </p>

          {/* Verified Editorial Attribution Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-black/10 bg-white/80 p-4 text-xs text-black/70 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0a0a] text-[10px] font-mono font-bold text-white">
                D2C
              </span>
              <div>
                <span className="font-semibold text-black">
                  GetIntoD2C Editorial &amp; Advisory Desk
                </span>
                <span className="mx-2 text-black/30">|</span>
                <span className="text-black/60">Peer-reviewed by active D2C operators</span>
              </div>
            </div>
            <div className="ml-auto">
              <Link
                to="/about"
                className="text-[11px] font-mono text-[#e11d2a] hover:underline"
              >
                Editorial Standards &amp; Team →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Direct Operational Takeaway Callout Box */}
          <div className="mb-12 rounded-3xl border-2 border-[#e11d2a]/30 bg-[#e11d2a]/5 p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#e11d2a]">
              <Sparkles className="h-4 w-4" /> Direct Operational Takeaway
            </div>
            <p className="mt-3 font-display text-lg font-medium leading-relaxed text-[#0a0a0a] md:text-xl">
              {resource.directAnswer}
            </p>
          </div>

          {/* Key Takeaways Box */}
          <div className="mb-14 rounded-3xl border border-black/15 bg-white p-6 md:p-8 shadow-xs">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-[#0a0a0a]">
              <FileCheck className="h-5 w-5 text-[#e11d2a]" /> Key Operating Principles
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {resource.keyTakeaways.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-black/5 bg-[#fafafa] p-3.5 text-xs md:text-sm leading-relaxed text-[#0a0a0a]/80"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#e11d2a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Body Sections */}
          <article className="prose-clean">
            {resource.sections.map((section, idx) => (
              <SectionRenderer key={idx} section={section} />
            ))}

            {/* If this is the contribution margin article, ensure calculator is displayed */}
            {resource.slug === "d2c-contribution-margin" &&
              !resource.sections.some((s) => s.type === "calculator") && (
                <ContributionMarginCalculator />
              )}
          </article>

          {/* Verified Regulatory / Industry Citations Box */}
          {resource.citations && resource.citations.length > 0 && (
            <div className="mt-16 rounded-2xl border border-black/15 bg-[#fbfbfb] p-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#0a0a0a]/70">
                <ShieldCheck className="h-4 w-4 text-[#e11d2a]" /> Verified Industry &amp; Statutory References
              </div>
              <ul className="mt-4 space-y-3">
                {resource.citations.map((cite, idx) => (
                  <li key={idx} className="text-xs text-[#0a0a0a]/80 leading-relaxed">
                    <span className="font-semibold text-black">{cite.source}:</span>{" "}
                    {cite.url ? (
                      <a
                        href={cite.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#e11d2a] hover:underline inline-flex items-center gap-1"
                      >
                        {cite.title} <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span>{cite.title}</span>
                    )}
                    {cite.note && (
                      <span className="text-black/60 block mt-0.5 italic">
                        {cite.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Frequently Asked Questions */}
          {resource.faqs && resource.faqs.length > 0 && (
            <div className="mt-16 border-t border-black/10 pt-12">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#e11d2a]">
                <HelpCircle className="h-4 w-4" /> Founder FAQ
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#0a0a0a] sm:text-3xl">
                Frequently Answered Questions
              </h2>
              <div className="mt-8 space-y-6">
                {resource.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-black/10 bg-white p-6 shadow-xs"
                  >
                    <h3 className="font-display text-lg font-semibold text-[#0a0a0a]">
                      {faq.question}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#0a0a0a]/75">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author & Editorial Desk Authority Card */}
          <div className="mt-16 rounded-3xl border border-black/10 bg-[#0a0a0a] p-8 text-white md:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[#e11d2a] font-display text-2xl font-bold text-white">
                D2C
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#e11d2a]">
                  Editorial &amp; Advisory Desk
                </span>
                <h3 className="mt-1 font-display text-xl md:text-2xl text-white">
                  GetIntoD2C Knowledge Initiative
                </h3>
                <p className="mt-2 text-xs md:text-sm leading-relaxed text-white/70">
                  Authored and peer-reviewed by active D2C founders, supply chain operators, and brand strategists. Backed by 12+ years of group agency heritage (Parlexa Est. 2013) having supported consumer brands and high-velocity digital ventures across India.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs">
                  <Link to="/about" className="text-[#e11d2a] hover:underline">
                    Read Our Team Credentials →
                  </Link>
                  <Link to="/for-founders" className="text-white/70 hover:text-white">
                    Apply to Founder Community →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Entities Grid */}
          <div className="mt-16 border-t border-black/10 pt-12">
            <h3 className="font-display text-2xl font-bold text-[#0a0a0a]">
              Related Advisory &amp; Category Blueprints
            </h3>

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="mt-6">
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/50 mb-3">
                  Studio Execution Services
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {relatedServices.map((service) => (
                    <Link
                      key={service.slug}
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="group flex items-center justify-between rounded-xl border border-black/10 bg-white p-4 transition hover:border-[#e11d2a] hover:shadow-xs"
                    >
                      <div>
                        <div className="font-display text-sm font-semibold text-[#0a0a0a] group-hover:text-[#e11d2a]">
                          {service.title}
                        </div>
                        <div className="mt-0.5 text-xs text-black/60 line-clamp-1">
                          {service.tagline}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-black/40 group-hover:text-[#e11d2a]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Categories */}
            {relatedCategories.length > 0 && (
              <div className="mt-6">
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/50 mb-3">
                  Consumer Category Blueprints
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {relatedCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to="/categories/$slug"
                      params={{ slug: cat.slug }}
                      className="group flex items-center justify-between rounded-xl border border-black/10 bg-white p-4 transition hover:border-[#e11d2a] hover:shadow-xs"
                    >
                      <div>
                        <div className="font-display text-sm font-semibold text-[#0a0a0a] group-hover:text-[#e11d2a]">
                          {cat.name}
                        </div>
                        <div className="mt-0.5 text-xs text-black/60 line-clamp-1">
                          {cat.tagline}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-black/40 group-hover:text-[#e11d2a]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Case Studies */}
            {relatedCaseStudies.length > 0 && (
              <div className="mt-6">
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/50 mb-3">
                  Brand Case Studies &amp; Teardowns
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {relatedCaseStudies.map((study) => (
                    <Link
                      key={study.slug}
                      to="/case-studies/$slug"
                      params={{ slug: study.slug }}
                      className="group flex items-center justify-between rounded-xl border border-black/10 bg-white p-4 transition hover:border-[#e11d2a] hover:shadow-xs"
                    >
                      <div>
                        <div className="font-display text-sm font-semibold text-[#0a0a0a] group-hover:text-[#e11d2a]">
                          {study.brand} — {study.title}
                        </div>
                        <div className="mt-0.5 text-xs text-black/60 line-clamp-1">
                          {study.subtitle}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-black/40 group-hover:text-[#e11d2a]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Resources */}
            {relatedResources.length > 0 && (
              <div className="mt-6">
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/50 mb-3">
                  Further Practical Guides
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {relatedResources.map((item) => (
                    <Link
                      key={item.slug}
                      to="/resources/$slug"
                      params={{ slug: item.slug }}
                      className="group flex items-center justify-between rounded-xl border border-black/10 bg-white p-4 transition hover:border-[#e11d2a] hover:shadow-xs"
                    >
                      <div>
                        <div className="font-display text-sm font-semibold text-[#0a0a0a] group-hover:text-[#e11d2a]">
                          {item.title}
                        </div>
                        <div className="mt-0.5 text-xs text-black/60 line-clamp-1">
                          {item.tagline}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-black/40 group-hover:text-[#e11d2a]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer Diagnostic CTA */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-mono uppercase tracking-[0.25em] text-[#e11d2a]">
            Founder Advisory
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Need an Honest Diagnostic of Your{" "}
            <span className="text-serif-italic text-[#e11d2a]">D2C Economics?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
            Book a 1:1 strategy review with GetIntoD2C studio operators to audit your unit economics, packaging compliance, supplier terms, and customer acquisition efficiency.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="/#book">
              <MagneticButton>
                Book Diagnostic Session <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <Link to="/resources">
              <MagneticButton variant="ghost">Browse All 10 Guides</MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
