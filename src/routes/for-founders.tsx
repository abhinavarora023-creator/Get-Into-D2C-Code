"use client";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  UsersRound,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { MagneticButton } from "@/components/site/MagneticButton";
import { ApplyDialog } from "@/components/site/ApplyDialog";

import { openCommunityApplyDialog } from "@/components/site/ApplyDialog";
import { getForFoundersSchemas, createJsonLdScript } from "@/lib/seo-schema";

const ApplyCtx = createContext<() => void>(() => {});
const useOpenApply = () => useContext(ApplyCtx);

export const Route = createFileRoute("/for-founders")({
  head: () => ({
    meta: [
      {
        title: "For Founders — Exclusive D2C Founders Community & Launch Studio | GetIntoD2C",
      },
      {
        name: "description",
        content:
          "An exclusive, invitation-only WhatsApp community and launch studio for D2C founders in India. Connect with operators, share growth strategies, and scale faster.",
      },
      {
        name: "keywords",
        content:
          "D2C launch studio for founders, D2C brand building community, Hire D2C brand consultant, Best D2C growth strategies for early stage startups, D2C founder network India",
      },
      {
        property: "og:title",
        content: "For Founders — Exclusive D2C Founders Community & Launch Studio",
      },
      {
        property: "og:description",
        content:
          "A curated WhatsApp-only space where early-stage and high-growth D2C founders share what's working, solve unit economics, and collaborate.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/for-founders" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "For Founders — Exclusive D2C Founders Community | GetIntoD2C",
      },
      {
        name: "twitter:description",
        content:
          "An exclusive, invitation-only community for D2C founders in India. Learn, collaborate, and scale.",
      },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://getintod2c.in/for-founders" }],
    scripts: getForFoundersSchemas().map(createJsonLdScript),
  }),
  component: ForFoundersPage,
});

const WHY = [
  {
    icon: MessageCircle,
    title: "Real conversations, not spectators",
    body: "Founders in the trenches trading what's actually working this week — not commentary from the sidelines.",
  },
  {
    icon: ShieldCheck,
    title: "No spam, no pitches",
    body: "Just founders helping founders. No agencies pitching, no cold DMs, no motivational threads.",
  },
  {
    icon: UsersRound,
    title: "Curated, kept small on purpose",
    body: "Every member is personally reviewed. The group stays small so every conversation stays worth reading.",
  },
  {
    icon: Lightbulb,
    title: "Learn from people solving the same problems",
    body: "First-hand playbooks on Meta ads, packaging, marketplaces, hiring, cashflow — from people one step ahead.",
  },
];

const INSIDE = [
  "A private WhatsApp group of vetted D2C founders",
  "Peer discussions on ads, ops, hiring, cashflow, growth",
  "Warm founder-to-founder introductions when you need them",
  "Playbooks, vendor recs and honest post-mortems, shared openly",
];

const WHO_IN = [
  "You're building a D2C brand — pre-launch or in your first few crores",
  "You're the founder, not the intern",
  "You'd rather trade notes than trade pitches",
  "You show up for other founders too",
];

const WHO_OUT = [
  "Agencies, consultants or service providers looking for clients",
  "Investors scouting deal flow",
  "Anyone here to broadcast rather than converse",
];

const FAQS = [
  {
    q: "Is this really just a WhatsApp group?",
    a: "Yes. That's the point. It's the fastest, most honest place founders already spend their day — so we meet you there instead of building yet another app you'll ignore.",
  },
  {
    q: "How is membership decided?",
    a: "Every application is read personally. We look for early-stage D2C founders with real intent — pre-launch is welcome, so are revenue-stage teams. It's about signal, not scale.",
  },
  {
    q: "Is there a fee to join?",
    a: "No. The community is free and invitation-based.",
  },
  {
    q: "What about in-person events?",
    a: "Small, curated in-person editions across Bengaluru, Mumbai and Delhi are coming soon — community members get first access.",
  },
  {
    q: "Can my co-founder join?",
    a: "Yes — add their details in the form. Co-founders are reviewed together so the group stays intimate.",
  },
];

function ForFoundersPage() {
  const openApply = useCallback(() => openCommunityApplyDialog(), []);

  return (
    <ApplyCtx.Provider value={openApply}>
      <main className="relative bg-[#ffffff] text-[#0a0a0a]">
        <Nav />
        <Hero />
        <WhySection />
        <WhoItsFor />
        <WhatsInside />
        <SocialProof />
        <FAQSection />
        <FinalCta />
        <Footer />
        <StickyMobileCTA />
      </main>
    </ApplyCtx.Provider>
  );
}

/* ---------------- sections ---------------- */

function Hero() {
  const openTypeform = useOpenApply();
  return (
    <section className="relative overflow-hidden paper-bg grain">
      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-5xl flex-col items-center justify-center px-6 pb-24 pt-36 text-center md:pt-44">
        <motion.span
          initial={{ opacity: 1, y: 0 }}
          className="mb-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#e11d2a]"
        >
          <span className="h-px w-8 bg-[#e11d2a]" />
          Founders Only — By Invitation
          <span className="h-px w-8 bg-[#e11d2a]" />
        </motion.span>

        <motion.h1
          initial={{ opacity: 1, y: 0 }}
          className="font-display text-5xl leading-[0.98] tracking-[-0.01em] text-[#0a0a0a] sm:text-6xl md:text-7xl lg:text-[86px]"
        >
          A founders-only community for people building{" "}
          <span className="text-serif-italic">D2C brands.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 1, y: 0 }}
          className="mt-10 max-w-2xl text-base leading-relaxed text-[#0a0a0a]/75 md:text-xl"
        >
          A curated, WhatsApp-only space where early-stage D2C founders connect, share what's
          actually working, and learn from each other — quietly, honestly, without an audience.
        </motion.p>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="mt-12 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center"
        >
          <MagneticButton onClick={openTypeform} className="w-full sm:w-auto">
            Join the Community
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <a href="#inside" className="w-full sm:w-auto">
            <MagneticButton variant="ghost" strength={0.12}>
              See what's inside
            </MagneticButton>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 1 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.32em] text-[#0a0a0a]/50"
        >
          <span>Free to join</span>
          <span className="h-1 w-1 rounded-full bg-[#e11d2a]" />
          <span>Reviewed personally</span>
          <span className="h-1 w-1 rounded-full bg-[#e11d2a]" />
          <span>WhatsApp-only</span>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#e11d2a]/40" />
    </section>
  );
}

function WhySection() {
  return (
    <section className="bg-gradient-warm relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
              Why This Community
            </div>
            <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-[#0a0a0a] md:text-6xl">
              A group chat worth <span className="text-serif-italic">reading.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#0a0a0a]/70 md:text-lg">
            Small on purpose. Curated with care. Built for founders who'd rather trade notes than
            trade pitches.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {WHY.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group flex h-full flex-col rounded-[2rem] border border-black/10 bg-[#ffffff] p-8 transition-colors hover:border-[#e11d2a]/40 md:p-9"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full border border-black/15 bg-[#f4f4f4] text-[#0a0a0a] transition-colors group-hover:border-[#e11d2a]/50 group-hover:text-[#e11d2a]">
                <item.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-8 font-display text-2xl leading-tight text-[#0a0a0a]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#0a0a0a]/70 md:text-base">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoItsFor() {
  return (
    <section className="relative bg-[#ffffff] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
            Who It's For
          </div>
          <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-[#0a0a0a] md:text-6xl">
            Not for everyone. <span className="text-serif-italic">On purpose.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#0a0a0a]/70 md:text-lg">
            We keep the group small so every conversation stays honest. Here's who fits — and who
            doesn't.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-black/10 bg-[#f4f4f4] p-8 md:p-10"
          >
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
              You'll fit right in if
            </div>
            <ul className="mt-8 space-y-5">
              {WHO_IN.map((line) => (
                <li key={line} className="flex items-start gap-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e11d2a]" />
                  <span className="text-base leading-relaxed text-[#0a0a0a]/85">{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-[2rem] border border-black/10 bg-[#ffffff] p-8 md:p-10"
          >
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#0a0a0a]/50">
              This isn't for
            </div>
            <ul className="mt-8 space-y-5">
              {WHO_OUT.map((line) => (
                <li key={line} className="flex items-start gap-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a0a0a]/30" />
                  <span className="text-base leading-relaxed text-[#0a0a0a]/60">{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhatsInside() {
  return (
    <section id="inside" className="bg-gradient-rose-glow relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#e11d2a]/10 blur-[100px]" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
            What Happens Inside
          </div>
          <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-[#0a0a0a] md:text-6xl">
            One group chat. <span className="text-serif-italic">Real signal.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {INSIDE.map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex items-start gap-5 rounded-[1.75rem] border border-black/10 bg-[#ffffff] p-6 md:p-7"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-black/15 bg-[#f4f4f4] text-[#0a0a0a]">
                <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <p className="text-base leading-relaxed text-[#0a0a0a]/85 md:text-lg">{line}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-black/15 bg-[#ffffff] px-5 py-3 text-sm text-[#0a0a0a]/70"
        >
          <Sparkles className="h-4 w-4 text-[#e11d2a]" strokeWidth={1.5} />
          Small in-person editions for members — coming soon.
        </motion.div>
      </div>
    </section>
  );
}

function SocialProof() {
  const quotes = [
    {
      quote: "The one group chat I actually open. Everyone here is building something.",
      role: "Founder, Skincare",
    },
    {
      quote:
        "Got a supplier intro on a Tuesday, a hiring lead on Thursday. That's the whole pitch.",
      role: "Founder, Beverage",
    },
    {
      quote: "It's the first D2C group I've been in with zero pitches and zero ego.",
      role: "Founder, Home & Living",
    },
  ];
  return (
    <section className="relative bg-[#ffffff] py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
            From The Group
          </div>
          <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-[#0a0a0a] md:text-6xl">
            What founders <span className="text-serif-italic">say.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quotes.map((t, i) => (
            <motion.figure
              key={t.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex h-full flex-col justify-between rounded-[2rem] border border-black/10 bg-[#f4f4f4] p-8"
            >
              <blockquote className="font-display text-xl leading-snug text-[#0a0a0a] md:text-2xl">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8 text-[11px] uppercase tracking-[0.32em] text-[#0a0a0a]/50">
                {t.role}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="bg-gradient-warm relative py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-14 text-center">
          <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">FAQs</div>
          <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-[#0a0a0a] md:text-6xl">
            Answers, <span className="text-serif-italic">honestly.</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((item, i) => (
            <AccordionItem key={i} value={`q-${i}`} className="border-black/10">
              <AccordionTrigger className="text-left font-display text-lg text-[#0a0a0a] md:text-xl">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-[#0a0a0a]/70">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  const openTypeform = useOpenApply();
  return (
    <section className="relative overflow-hidden bg-gradient-dark-accent py-28 md:py-36">
      <div className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-[#e11d2a]/20 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
          Come Sit At The Table
        </div>
        <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-[#ffffff] md:text-6xl lg:text-7xl">
          Ready to connect with founders <span className="text-serif-italic">who get it?</span>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[#ffffff]/75 md:text-lg">
          The application takes two minutes. We read every one, personally.
        </p>
        <div className="mt-12 flex justify-center">
          <MagneticButton
            onClick={openTypeform}
            className="!bg-[#ffffff] !text-[#0a0a0a] hover:!bg-[#f4f4f4] hover:!shadow-[0_18px_40px_-18px_rgba(255,255,255,0.35)]"
          >
            Apply to Join
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

function StickyMobileCTA() {
  const openTypeform = useOpenApply();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-[#ffffff]/95 px-4 py-3 backdrop-blur md:hidden">
      <button
        type="button"
        onClick={openTypeform}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#e11d2a] px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(225,29,42,0.55)]"
      >
        Join the Community
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  );
}
