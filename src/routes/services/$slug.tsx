import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, AlertCircle, Sparkles, ChevronRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MagneticButton } from "@/components/site/MagneticButton";
import { getService, SERVICES, type ServiceData } from "@/lib/services-data";
import { getCategory } from "@/lib/categories-data";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { createJsonLdScript } from "@/lib/seo-schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    const otherServices = SERVICES.filter((s) => s.slug !== service.slug);
    const relatedCaseStudies = CASE_STUDIES.filter((cs) =>
      cs.relatedServiceSlugs.includes(service.slug)
    );
    return { service, otherServices, relatedCaseStudies };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    if (!service) {
      return { meta: [{ title: "Service Not Found | GetIntoD2C" }] };
    }

    const serviceUrl = `https://getintod2c.in/services/${service.slug}`;

    return {
      meta: [
        { title: `${service.metaTitle}` },
        { name: "description", content: service.metaDescription },
        { property: "og:title", content: service.metaTitle },
        { property: "og:description", content: service.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: serviceUrl },
        { property: "og:image", content: "https://getintod2c.in/og-image.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: service.metaTitle },
        { name: "twitter:description", content: service.metaDescription },
        { name: "twitter:image", content: "https://getintod2c.in/og-image.png" },
      ],
      links: [{ rel: "canonical", href: serviceUrl }],
      scripts: [
        createJsonLdScript({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${serviceUrl}#service`,
          name: service.title,
          serviceType: service.serviceType,
          description: service.description,
          url: serviceUrl,
          provider: {
            "@id": "https://getintod2c.in/#organization",
          },
          areaServed: "India",
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
            {
              "@type": "ListItem",
              position: 3,
              name: service.shortTitle,
              item: serviceUrl,
            },
          ],
        }),
        ...(service.faqs && service.faqs.length > 0
          ? [
              createJsonLdScript({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: service.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: f.answer,
                  },
                })),
              }),
            ]
          : []),
      ],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service, otherServices, relatedCaseStudies } = Route.useLoaderData();

  return (
    <main className="relative min-h-screen bg-[#ffffff] text-[#0a0a0a]">
      <Nav />

      {/* Hero Header */}
      <section className="relative overflow-hidden paper-bg grain pt-36 pb-16 md:pt-48 md:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* Breadcrumb links */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#0a0a0a]/50">
            <Link to="/" className="hover:text-[#e11d2a]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/services" className="hover:text-[#e11d2a]">Services</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#e11d2a] font-medium">{service.shortTitle}</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e11d2a]/30 bg-[#e11d2a]/5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-[0.24em] text-[#e11d2a]">
            <Sparkles className="h-3.5 w-3.5" /> Studio Capability
          </span>

          <h1 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl">
            {service.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#0a0a0a]/75 md:text-xl font-normal">
            {service.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="/#book">
              <MagneticButton>
                Get Started With This Service <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <Link to="/services" className="text-sm font-medium text-[#0a0a0a]/60 hover:text-[#0a0a0a]">
              ← All Studio Services
            </Link>
          </div>
        </div>
      </section>

      {/* Overview & Who It's For */}
      <section className="relative border-y border-black/10 bg-[#f4f4f4]/50 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
                Overview
              </div>
              <h2 className="mt-4 font-display text-2xl md:text-3xl">Why this matters</h2>
              <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/70">
                {service.description}
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
                Audience
              </div>
              <h3 className="mt-3 font-display text-xl md:text-2xl">Who this service is for</h3>
              <ul className="mt-6 space-y-4">
                {service.whoItsFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[#0a0a0a]/75">
                    <CheckCircle2 className="h-4 w-4 text-[#e11d2a] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Problems It Solves & What's Included */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
                Challenges
              </div>
              <h2 className="mt-4 font-display text-2xl md:text-3xl">Problems we eliminate</h2>
              <div className="mt-6 space-y-4">
                {service.problemsSolved.map((prob, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-2xl border border-black/10 bg-[#fff5f6]/50 p-4">
                    <AlertCircle className="h-4 w-4 text-[#e11d2a] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#0a0a0a]/80">{prob}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
                Deliverables
              </div>
              <h2 className="mt-4 font-display text-2xl md:text-3xl">What the service includes</h2>
              <div className="mt-6 space-y-3">
                {service.deliverables.map((deliv, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white p-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0a0a0a] text-xs font-mono text-white flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-sm text-[#0a0a0a]/80 pt-0.5">{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process / Methodology */}
      <section className="relative border-t border-black/10 bg-[#f4f4f4]/40 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
              Methodology
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">How we execute</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.processSteps.map((step, i) => (
              <div key={i} className="rounded-2xl border border-black/10 bg-white p-6">
                <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#e11d2a]">
                  Step 0{i + 1}
                </div>
                <h3 className="mt-3 font-display text-lg text-[#0a0a0a]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0a0a0a]/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relevant Categories */}
      {service.relatedCategorySlugs && service.relatedCategorySlugs.length > 0 && (
        <section className="relative border-t border-black/10 bg-white py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#0a0a0a]/50">
              Applicable Consumer Verticals
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.relatedCategorySlugs.map((catSlug) => {
                const cat = getCategory(catSlug);
                if (!cat) return null;
                return (
                  <Link
                    key={catSlug}
                    to="/categories/$slug"
                    params={{ slug: catSlug }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-[#f4f4f4] px-4 py-2 text-xs font-medium text-[#0a0a0a] transition hover:border-[#e11d2a] hover:text-[#e11d2a]"
                  >
                    <span>{cat.name}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Case Studies & Field Proof */}
      {relatedCaseStudies && relatedCaseStudies.length > 0 && (
        <section className="relative border-t border-black/10 bg-[#f4f4f4]/40 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
                  Field Evidence
                </div>
                <h2 className="mt-2 font-display text-2xl md:text-3xl">
                  Related Case Studies &amp; Teardowns
                </h2>
              </div>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70 hover:text-[#e11d2a]"
              >
                All Case Studies <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {relatedCaseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  to="/case-studies/$slug"
                  params={{ slug: cs.slug }}
                  className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 transition hover:border-[#e11d2a] hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-black/50">
                      <span>{cs.brand}</span>
                      <span className="text-[#e11d2a]">{cs.isTeardown ? "Teardown" : "Engagement"}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl text-black group-hover:text-[#e11d2a]">
                      {cs.title}
                    </h3>
                    <p className="mt-2 text-xs text-black/70 line-clamp-2 leading-relaxed">
                      {cs.subtitle}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-black/10">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#e11d2a]">
                      Read Breakdown →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="relative border-t border-black/10 bg-[#f4f4f4]/60 py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-8">
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
                Questions
              </div>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">Frequently asked</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {service.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-2xl border border-black/10 bg-white px-6"
                >
                  <AccordionTrigger className="py-5 text-left font-display text-lg text-[#0a0a0a] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base text-[#0a0a0a]/75 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Other Services */}
      <section className="relative border-t border-black/10 bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-[11px] uppercase tracking-[0.32em] text-[#0a0a0a]/50">
            More Studio Capabilities
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {otherServices.slice(0, 3).map((os) => (
              <Link
                key={os.slug}
                to="/services/$slug"
                params={{ slug: os.slug }}
                className="group rounded-2xl border border-black/10 p-6 transition hover:border-[#e11d2a] hover:shadow-sm"
              >
                <div className="font-display text-lg text-[#0a0a0a] group-hover:text-[#e11d2a]">
                  {os.shortTitle}
                </div>
                <p className="mt-2 text-xs text-[#0a0a0a]/60 line-clamp-2">
                  {os.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl leading-tight md:text-5xl">
            Ready to deploy this capability?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/70">
            Schedule a diagnostic discussion with our studio leads to evaluate your brand's current stage and requirements.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/#book">
              <MagneticButton>
                Start A Diagnostic <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <Link to="/services">
              <MagneticButton variant="ghost">
                View All Services
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
