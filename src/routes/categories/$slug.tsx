import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, AlertCircle, Sparkles, ChevronRight, BookOpen } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MagneticButton } from "@/components/site/MagneticButton";
import { getCategory, CATEGORIES, type CategoryData } from "@/lib/categories-data";
import { getService } from "@/lib/services-data";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { createJsonLdScript } from "@/lib/seo-schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    const otherCategories = CATEGORIES.filter((c) => c.slug !== category.slug);
    const relatedCaseStudies = CASE_STUDIES.filter((cs) =>
      cs.relatedCategorySlugs.includes(category.slug)
    );
    return { category, otherCategories, relatedCaseStudies };
  },
  head: ({ loaderData }) => {
    const category = loaderData?.category;
    if (!category) {
      return { meta: [{ title: "Category Not Found | GetIntoD2C" }] };
    }

    const categoryUrl = `https://getintod2c.in/categories/${category.slug}`;

    return {
      meta: [
        { title: `${category.metaTitle}` },
        { name: "description", content: category.metaDescription },
        { property: "og:title", content: category.metaTitle },
        { property: "og:description", content: category.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: categoryUrl },
        { property: "og:image", content: "https://getintod2c.in/og-image.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: category.metaTitle },
        { name: "twitter:description", content: category.metaDescription },
        { name: "twitter:image", content: "https://getintod2c.in/og-image.png" },
      ],
      links: [{ rel: "canonical", href: categoryUrl }],
      scripts: [
        createJsonLdScript({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: category.name,
          description: category.description,
          url: categoryUrl,
          publisher: {
            "@id": "https://getintod2c.in/#organization",
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
              name: "Categories",
              item: "https://getintod2c.in/categories",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: category.name,
              item: categoryUrl,
            },
          ],
        }),
        ...(category.faqs && category.faqs.length > 0
          ? [
              createJsonLdScript({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: category.faqs.map((f) => ({
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
  component: CategoryDetailPage,
});

function CategoryDetailPage() {
  const { category, otherCategories, relatedCaseStudies } = Route.useLoaderData();

  return (
    <main className="relative min-h-screen bg-[#ffffff] text-[#0a0a0a]">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden paper-bg grain pt-36 pb-16 md:pt-48 md:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#0a0a0a]/50">
            <Link to="/" className="hover:text-[#e11d2a]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/categories" className="hover:text-[#e11d2a]">Categories</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#e11d2a] font-medium">{category.name}</span>
          </nav>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e11d2a]/30 bg-[#e11d2a]/5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-[0.24em] text-[#e11d2a]">
            <Sparkles className="h-3.5 w-3.5" /> {category.tag}
          </span>

          <h1 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl">
            {category.name}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#0a0a0a]/75 md:text-xl font-normal">
            {category.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="/#book">
              <MagneticButton>
                Build in this category <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <Link to="/categories" className="text-sm font-medium text-[#0a0a0a]/60 hover:text-[#0a0a0a]">
              ← All Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Category Overview */}
      <section className="relative border-y border-black/10 bg-[#f4f4f4]/50 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
                Sector Landscape
              </div>
              <h2 className="mt-4 font-display text-2xl md:text-3xl">The Indian Market Reality</h2>
              <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/70">
                {category.description}
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10">
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
                Market Shifts
              </div>
              <h3 className="mt-3 font-display text-xl md:text-2xl">Key Consumer Dynamics</h3>
              <ul className="mt-6 space-y-4">
                {category.marketDynamics.map((item, i) => (
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

      {/* Challenges & Growth Playbooks */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
                Hurdles
              </div>
              <h2 className="mt-4 font-display text-2xl md:text-3xl">Category Bottlenecks</h2>
              <div className="mt-6 space-y-4">
                {category.keyChallenges.map((prob, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-2xl border border-black/10 bg-[#fff5f6]/50 p-4">
                    <AlertCircle className="h-4 w-4 text-[#e11d2a] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#0a0a0a]/80">{prob}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
                Execution
              </div>
              <h2 className="mt-4 font-display text-2xl md:text-3xl">Proven Growth Playbooks</h2>
              <div className="mt-6 space-y-3">
                {category.growthPlaybooks.map((play, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white p-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0a0a0a] text-xs font-mono text-white flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-sm text-[#0a0a0a]/80 pt-0.5">{play}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Study */}
      {category.relatedCaseStudy && (
        <section className="relative border-t border-black/10 bg-[#f4f4f4]/40 py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-3xl border border-black/10 bg-white p-8 md:p-10">
              <div>
                <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
                  Category Teardown
                </div>
                <h3 className="mt-2 font-display text-2xl text-[#0a0a0a]">
                  {category.relatedCaseStudy.title}
                </h3>
                <p className="mt-2 text-sm text-[#0a0a0a]/70 max-w-xl">
                  {category.relatedCaseStudy.excerpt}
                </p>
              </div>
              <Link
                to="/blog/$slug"
                params={{ slug: category.relatedCaseStudy.slug }}
                className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-xs font-medium text-white transition hover:bg-[#e11d2a] flex-shrink-0"
              >
                <BookOpen className="h-3.5 w-3.5" /> Read Teardown →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related Case Studies */}
      {relatedCaseStudies && relatedCaseStudies.length > 0 && (
        <section className="relative border-t border-black/10 bg-white py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
                  Category Case Studies
                </div>
                <h2 className="mt-2 font-display text-2xl md:text-3xl">
                  First-Party Proof &amp; Teardowns in {category.name}
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
                  className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-[#f4f4f4]/40 p-6 transition hover:border-[#e11d2a] hover:bg-white hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-black/50">
                      <span>{cs.brand}</span>
                      <span className="text-[#e11d2a]">{cs.isTeardown ? "Teardown" : "Client Engagement"}</span>
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
                      Read Case Study →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended Studio Services */}
      {category.recommendedServiceSlugs && category.recommendedServiceSlugs.length > 0 && (
        <section className="relative border-t border-black/10 bg-white py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#0a0a0a]/50">
              Recommended Capabilities for {category.name}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {category.recommendedServiceSlugs.map((sSlug) => {
                const s = getService(sSlug);
                if (!s) return null;
                return (
                  <Link
                    key={sSlug}
                    to="/services/$slug"
                    params={{ slug: sSlug }}
                    className="group rounded-2xl border border-black/10 p-6 transition hover:border-[#e11d2a] hover:shadow-sm"
                  >
                    <div className="font-display text-lg text-[#0a0a0a] group-hover:text-[#e11d2a]">
                      {s.shortTitle}
                    </div>
                    <p className="mt-2 text-xs text-[#0a0a0a]/65 line-clamp-2">
                      {s.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs text-[#e11d2a] font-medium">
                      Explore Capability →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {category.faqs && category.faqs.length > 0 && (
        <section className="relative border-t border-black/10 bg-[#f4f4f4]/60 py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-8">
              <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
                Category FAQs
              </div>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">Frequently asked questions</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {category.faqs.map((faq, i) => (
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

      {/* Other Categories */}
      <section className="relative border-t border-black/10 bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-[11px] uppercase tracking-[0.32em] text-[#0a0a0a]/50">
            More Consumer Verticals
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {otherCategories.slice(0, 3).map((oc) => (
              <Link
                key={oc.slug}
                to="/categories/$slug"
                params={{ slug: oc.slug }}
                className="group rounded-2xl border border-black/10 p-6 transition hover:border-[#e11d2a] hover:shadow-sm"
              >
                <div className="font-display text-lg text-[#0a0a0a] group-hover:text-[#e11d2a]">
                  {oc.name}
                </div>
                <p className="mt-2 text-xs text-[#0a0a0a]/60 line-clamp-2">
                  {oc.tagline}
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
            Building in {category.name}?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/70">
            Let's evaluate your pricing architecture, unit economics, packaging, and channel sequencing.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/#book">
              <MagneticButton>
                Start A Diagnostic <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </a>
            <Link to="/categories">
              <MagneticButton variant="ghost">
                View All Categories
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
