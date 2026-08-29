"use client";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Play,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Users,
  Award,
  ArrowLeft,
  Calendar,
  Check,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { openCommunityApplyDialog } from "@/components/site/ApplyDialog";
import { getWebinar, WEBINARS, type WebinarPost } from "@/lib/webinars";
import { getWebinarPostSchemas, createJsonLdScript } from "@/lib/seo-schema";
import { trackEvent } from "@/lib/meta-pixel";

export const Route = createFileRoute("/webinars/$slug")({
  loader: ({ params }) => {
    const webinar = getWebinar(params.slug);
    if (!webinar) throw notFound();
    const otherWebinars = WEBINARS.filter((w) => w.slug !== webinar.slug);
    return { webinar, otherWebinars };
  },
  head: ({ loaderData }) => {
    const webinar = loaderData?.webinar;
    if (!webinar) {
      return { meta: [{ title: "Webinar Not Found — GetIntoD2C" }] };
    }
    return {
      meta: [
        {
          title: `${webinar.title} — Full Masterclass & Recording | GetIntoD2C`,
        },
        {
          name: "description",
          content: webinar.excerpt,
        },
        {
          property: "og:title",
          content: `${webinar.title} — GetIntoD2C Masterclass`,
        },
        {
          property: "og:description",
          content: webinar.excerpt,
        },
        { property: "og:type", content: "video.other" },
        { property: "og:image", content: webinar.coverImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: webinar.title },
        { name: "twitter:description", content: webinar.excerpt },
        { name: "twitter:image", content: webinar.coverImage },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://getintod2c.in/webinars/${webinar.slug}`,
        },
        { rel: "preload", as: "image", href: webinar.coverImage },
      ],
      scripts: getWebinarPostSchemas(webinar).map(createJsonLdScript),
    };
  },
  component: WebinarDetailPage,
});

function WebinarDetailPage() {
  const { webinar, otherWebinars } = Route.useLoaderData();

  return (
    <div
      className="min-h-screen bg-white text-[#0a0a0a]"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif" }}
    >
      {/* Fixed Navigation Header */}
      <Nav />

      {/* Subtle top ambient red gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] overflow-hidden">
        <div className="absolute left-1/2 top-[-140px] h-[550px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(225,29,42,0.14),transparent_70%)]" />
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 pt-28 md:pt-36">
        {/* Back Link & Breadcrumb Bar */}
        <div className="mx-auto max-w-5xl px-6 pb-6">
          <Link
            to="/webinars"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#0a0a0a]/60 transition hover:text-[#e11d2a]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to all masterclasses
          </Link>
        </div>

        {/* Hero Section */}
        <section className="mx-auto w-full max-w-5xl px-6 pb-12 text-center md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#e11d2a]/20 bg-[#e11d2a]/5 px-4 py-1.5 text-xs font-medium tracking-wide text-[#e11d2a]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {webinar.category} · Free On-Demand Masterclass
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {webinar.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#0a0a0a]/70 md:text-lg"
          >
            {webinar.subtitle}
          </motion.p>

          {/* Metadata Badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.14em] text-[#0a0a0a]/60 md:text-sm"
          >
            <span className="inline-flex items-center gap-1.5 text-[#e11d2a]">
              <Play className="h-3.5 w-3.5 fill-[#e11d2a]" /> Full Video Recording
            </span>
            <span className="h-1 w-1 rounded-full bg-[#0a0a0a]/30" />
            <span>{webinar.speakers.length} Panelist Operators</span>
            <span className="h-1 w-1 rounded-full bg-[#0a0a0a]/30" />
            <span>Sourcing, Margins & Quick Commerce</span>
            <span className="h-1 w-1 rounded-full bg-[#0a0a0a]/30" />
            <span className="font-semibold text-[#0a0a0a]">Free Stream</span>
          </motion.div>
        </section>

        {/* Embedded YouTube Video Section */}
        {webinar.youtubeId && (
          <section className="mx-auto w-full max-w-5xl px-6 pb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative overflow-hidden rounded-3xl border border-black/15 bg-black shadow-[0_20px_70px_-20px_rgba(0,0,0,0.35)]"
            >
              {/* Top Bar on Player */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#121212] px-5 py-3 text-xs text-white/75">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-[#e11d2a] animate-pulse" />
                  <span className="font-medium tracking-wide">
                    Live Session Recording · {webinar.title}
                  </span>
                </div>
                {webinar.youtubeUrl && (
                  <a
                    href={webinar.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-white/60 transition hover:text-white"
                  >
                    Open on YouTube <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              {/* Video Iframe Container (16:9 Aspect Ratio) */}
              <div className="relative aspect-video w-full bg-[#0a0a0a]">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${webinar.youtubeId}?rel=0`}
                  title={webinar.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              </div>

              {/* Action Bar Below Player */}
              <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 bg-[#161616] p-5 sm:flex-row sm:items-center sm:p-6">
                <div>
                  <p className="text-sm font-medium text-white">
                    Loved the teardown? Join our founders' community for upcoming masterclasses.
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Get frameworks, pricing calculators, and direct access to active D2C founders.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {webinar.youtubeUrl && (
                    <a
                      href={webinar.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/15"
                    >
                      <Play className="h-3.5 w-3.5" /> Watch on YouTube
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => openCommunityApplyDialog()}
                    className="inline-flex items-center gap-2 rounded-full bg-[#e11d2a] px-5 py-2 text-xs font-medium text-white transition hover:bg-[#c41520]"
                  >
                    Join Community <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Live Session Photo Gallery & BTS Highlights */}
        {webinar.galleryImages && webinar.galleryImages.length > 0 && (
          <Section eyebrow="Behind The Scenes" title="Inside the Live Masterclass Room">
            <p className="max-w-2xl text-base leading-relaxed text-[#0a0a0a]/65">
              Real screenshots and teardown moments from our live founder session — discussing
              supplier contracts, unit economics formulas, and dark store listing mechanics.
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {webinar.galleryImages.map((img, idx) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_4px_24px_-10px_rgba(0,0,0,0.08)] transition hover:border-[#e11d2a]/30"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f4f4]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                      {img.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e11d2a]">
                      {img.tag}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-[#0a0a0a]">{img.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#0a0a0a]/60">
                      {img.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* The Speakers Panel */}
        {webinar.speakers && webinar.speakers.length > 0 && (
          <Section eyebrow="The Panel" title="Learn from Operators Who Have Built It">
            <p className="max-w-2xl text-base leading-relaxed text-[#0a0a0a]/65">
              Our panel brings together seasoned D2C founders who have built brands from scratch
              alongside growth practitioners scaling products across quick commerce platforms.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {webinar.speakers.map((sp) => (
                <div
                  key={sp.name}
                  className="flex flex-col items-center gap-5 rounded-3xl border border-black/10 bg-white p-7 text-center shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] sm:flex-row sm:items-start sm:text-left"
                >
                  <img
                    src={sp.image}
                    alt={sp.name}
                    width={720}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="h-32 w-32 flex-none rounded-2xl object-cover shadow-sm"
                  />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e11d2a]">
                      Guest Speaker
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold text-[#0a0a0a]">{sp.name}</h3>
                    <p className="mt-1 text-sm font-medium text-[#0a0a0a]/80">{sp.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#0a0a0a]/60">{sp.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Playbook Pillars */}
        {webinar.chapters && webinar.chapters.length > 0 && (
          <Section eyebrow="Inside The Playbook" title="Core Pillars Covered in the Masterclass">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {webinar.chapters.map((ch, idx) => (
                <div
                  key={ch.title}
                  className="flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] transition hover:border-[#e11d2a]/30"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e11d2a]/10 text-xs font-mono font-bold text-[#e11d2a]">
                      0{idx + 1}
                    </div>
                    <div className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0a0a0a]/40">
                      Pillar 0{idx + 1}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-[#0a0a0a]">{ch.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#0a0a0a]/60">{ch.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Community & Advisory Callout */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1: Community */}
            <div className="flex flex-col justify-between rounded-3xl border border-black/10 bg-[#FFF5F5] p-8 md:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#e11d2a]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#e11d2a]">
                  <Users className="h-3.5 w-3.5" /> For D2C Founders
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-[#0a0a0a] sm:text-3xl">
                  Join the Curated Founders' WhatsApp Community
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#0a0a0a]/70 sm:text-base">
                  An intimate group for early-stage and high-growth D2C founders in India. Direct
                  notes on manufacturers, growth benchmarks, investor intros, and upcoming offline
                  dinners.
                </p>
              </div>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => openCommunityApplyDialog()}
                  className="inline-flex items-center gap-2 rounded-full bg-[#e11d2a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#b8151f]"
                >
                  Apply to Join Free <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Card 2: Brand Audit / Launchpad */}
            <div className="flex flex-col justify-between rounded-3xl border border-black/10 bg-[#0a0a0a] p-8 text-white md:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff6b57]">
                  <Award className="h-3.5 w-3.5" /> Studio Partnership
                </div>
                <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">
                  Build or Scale with GetIntoD2C Studio
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                  Looking to launch a new brand or diagnose leaking margins in an existing one? Our
                  studio provides end-to-end launchpad execution, brand audits, and GTM
                  acceleration.
                </p>
              </div>
              <div className="mt-8">
                <a
                  href="/#book"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#0a0a0a] transition hover:bg-neutral-200"
                >
                  Book a Strategy Diagnostic <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        {webinar.faqs && webinar.faqs.length > 0 && (
          <Section eyebrow="Frequently Asked Questions" title="Questions & Answers">
            <div className="grid gap-4 md:grid-cols-2">
              {webinar.faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)]"
                >
                  <h3 className="text-base font-semibold text-[#0a0a0a]">{faq.q}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#0a0a0a]/60">{faq.a}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Other Webinars / Archive Link */}
        {otherWebinars.length > 0 && (
          <section className="mx-auto max-w-5xl px-6 pb-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0a0a]/50">
              More Masterclasses
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {otherWebinars.map((ow) => (
                <Link
                  key={ow.slug}
                  to="/webinars/$slug"
                  params={{ slug: ow.slug }}
                  className="group block rounded-3xl border border-black/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#e11d2a]/50 hover:shadow-lg"
                >
                  <span className="rounded-full bg-[#e11d2a]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#e11d2a]">
                    {ow.category}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold transition-colors group-hover:text-[#e11d2a]">
                    {ow.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#0a0a0a]/60">{ow.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e11d2a]">
          {eyebrow}
        </div>
        <h2
          className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </motion.div>
    </section>
  );
}
