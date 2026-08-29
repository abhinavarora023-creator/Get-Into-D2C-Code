"use client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play, Sparkles, ArrowRight, Users, Video, Calendar, Layers, Award } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { openCommunityApplyDialog } from "@/components/site/ApplyDialog";
import { WEBINARS } from "@/lib/webinars";
import { getWebinarsIndexSchemas, createJsonLdScript } from "@/lib/seo-schema";

export const Route = createFileRoute("/webinars/")({
  component: WebinarsIndexPage,
  head: () => ({
    meta: [
      {
        title: "D2C Masterclasses & Webinars — Founder Playbooks & Recordings | GetIntoD2C",
      },
      {
        name: "description",
        content:
          "Watch exclusive masterclasses and teardowns with seasoned D2C founders, angel investors, and growth operators. Real lessons on sourcing, pricing, unit economics, and quick commerce scaling.",
      },
      {
        property: "og:title",
        content: "D2C Masterclasses & Webinars — GetIntoD2C",
      },
      {
        property: "og:description",
        content:
          "Recorded teardowns, founder round-tables, and actionable D2C playbooks for Indian consumer founders.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/webinars" },
      { property: "og:image", content: "/webinar-speakers-panel.png" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "D2C Masterclasses & Webinars — GetIntoD2C",
      },
      {
        name: "twitter:description",
        content:
          "Watch exclusive masterclasses and teardowns with seasoned D2C founders and operators.",
      },
      { name: "twitter:image", content: "/webinar-speakers-panel.png" },
    ],
    links: [
      { rel: "canonical", href: "https://getintod2c.in/webinars" },
      { rel: "preload", as: "image", href: "/webinar-speakers-panel.png" },
    ],
    scripts: getWebinarsIndexSchemas().map(createJsonLdScript),
  }),
});

function WebinarsIndexPage() {
  const featured = WEBINARS[0];

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

      <main className="relative z-10 pt-28 md:pt-36">
        {/* Hero Section */}
        <section className="mx-auto w-full max-w-5xl px-6 pb-14 text-center md:pb-18">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#e11d2a]/20 bg-[#e11d2a]/5 px-4 py-1.5 text-xs font-medium tracking-wide text-[#e11d2a]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            GetIntoD2C Masterclasses & Teardowns
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Playbooks from founders who have{" "}
            <span className="bg-gradient-to-r from-[#e11d2a] to-[#ff6b57] bg-clip-text text-transparent">
              built it.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#0a0a0a]/70 md:text-lg"
          >
            Candid founder round-tables, teardowns, and masterclasses on zero-to-one product
            sourcing, unit economics, pricing architecture, CAC control, and quick commerce scaling.
          </motion.p>
        </section>

        {/* Featured Masterclass Banner */}
        {featured && (
          <section className="mx-auto w-full max-w-5xl px-6 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_70px_-20px_rgba(0,0,0,0.12)] transition hover:border-[#e11d2a]/40"
            >
              <div className="grid gap-0 lg:grid-cols-12">
                {/* Left image preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 lg:col-span-6 lg:aspect-auto">
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white lg:hidden">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e11d2a] px-3 py-1 text-xs font-semibold">
                      <Play className="h-3 w-3 fill-white" /> Watch Recording
                    </span>
                    <span className="text-xs text-white/80">{featured.duration}</span>
                  </div>
                </div>

                {/* Right content */}
                <div className="flex flex-col justify-between p-8 lg:col-span-6 lg:p-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#e11d2a]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#e11d2a]">
                        Featured Masterclass
                      </span>
                      <span className="rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-medium text-[#0a0a0a]/60">
                        {featured.category}
                      </span>
                    </div>

                    <h2 className="mt-5 text-2xl font-semibold leading-tight text-[#0a0a0a] sm:text-3xl">
                      {featured.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-[#0a0a0a]/65 sm:text-base">
                      {featured.excerpt}
                    </p>

                    {/* Speakers list */}
                    <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-black/10 pt-5 text-xs text-[#0a0a0a]/70">
                      <span className="font-semibold uppercase tracking-wider text-[#0a0a0a]/50">
                        Speakers:
                      </span>
                      {featured.speakers.map((sp) => (
                        <div key={sp.name} className="flex items-center gap-2">
                          <img
                            src={sp.image}
                            alt={sp.name}
                            className="h-6 w-6 rounded-full object-cover"
                          />
                          <span className="font-medium text-[#0a0a0a]">{sp.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <Link
                      to="/webinars/$slug"
                      params={{ slug: featured.slug }}
                      className="group inline-flex items-center gap-2 rounded-full bg-[#e11d2a] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#b8151f]"
                    >
                      <Play className="h-4 w-4 fill-white" /> Watch Full Masterclass Free
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Masterclass Archive & All Sessions Grid */}
        <section className="mx-auto w-full max-w-5xl px-6 pb-20">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <h2 className="text-xl font-semibold tracking-tight text-[#0a0a0a]">
              All Masterclasses & Sessions
            </h2>
            <span className="text-xs uppercase tracking-[0.2em] text-[#0a0a0a]/50">
              {WEBINARS.length} Available
            </span>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {WEBINARS.map((w) => (
              <Link
                key={w.slug}
                to="/webinars/$slug"
                params={{ slug: w.slug }}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-black/10 bg-white p-7 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:border-[#e11d2a]/50 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full bg-[#e11d2a]/10 px-3 py-1 font-semibold uppercase tracking-wider text-[#e11d2a]">
                      {w.category}
                    </span>
                    <span className="text-[#0a0a0a]/50">{w.date}</span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold leading-snug text-[#0a0a0a] transition group-hover:text-[#e11d2a]">
                    {w.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#0a0a0a]/60">{w.excerpt}</p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#0a0a0a]/70">
                    <Play className="h-3 w-3 text-[#e11d2a]" /> Full Video Stream
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#e11d2a]">
                    Watch now{" "}
                    <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Future Live Sessions & Community Invites */}
        <section className="mx-auto w-full max-w-5xl px-6 pb-24">
          <div className="rounded-3xl border border-black/10 bg-[#f7f7f7] p-8 md:p-12">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e11d2a]">
                  Upcoming Sessions & Offline Dinners
                </span>
                <h3 className="mt-3 text-2xl font-semibold text-[#0a0a0a] sm:text-3xl">
                  Never miss an upcoming live founder room.
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#0a0a0a]/65 sm:text-base">
                  We host intimate offline dinners across Bengaluru, Mumbai, and Delhi, alongside
                  focused masterclasses. Community members get early invites before seats fill up.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openCommunityApplyDialog()}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e11d2a] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#b8151f]"
                >
                  Join Founders' WhatsApp Community <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
