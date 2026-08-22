"use client";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Calendar, Users, BookOpen, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/site/BrandLogo";
import { trackEvent } from "@/lib/meta-pixel";



import { getRegistrationsSchemas, createJsonLdScript } from "@/lib/seo-schema";

export const Route = createFileRoute("/registerations")({
  head: () => ({
    meta: [
      { title: "Register — Proven Playbook to Build a D2C Brand | GetIntoD2C" },
      {
        name: "description",
        content:
          "Join us on 26th August for an exclusive workshop with successful D2C founders and Angel Investors. Learn how to build, scale and grow a profitable D2C business.",
      },
      { property: "og:title", content: "Proven Playbook to Build a D2C Brand — Workshop Registration" },
      {
        property: "og:description",
        content:
          "An exclusive workshop with successful D2C founders and Angel Investors. 26th August.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/registerations" },
      { rel: "preload", as: "image", href: "/gaurav-virmani.jpg" },
    ],
    scripts: getRegistrationsSchemas().map(createJsonLdScript),
  }),
  component: RegisterPage,
});

const AMOUNT_BASE = 50;
const GST_PERCENT = 18;
const AMOUNT_TOTAL = Math.round(AMOUNT_BASE * (1 + GST_PERCENT / 100)); // 59

const RAZORPAY_BUTTON_ID = "pl_TK3sUZDPIm9MwC";

function RazorpayButton() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form || form.querySelector("script")) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.dataset.payment_button_id = RAZORPAY_BUTTON_ID;
    form.appendChild(script);
  }, []);

  return (
    <form
      ref={formRef}
      onClick={() => trackEvent("InitiateCheckout", { value: 59, currency: "INR" })}
      className="flex w-full justify-center"
    />
  );
}

function RegisterPage() {
  return (
    <div
      className="min-h-screen bg-white text-[#0a0a0a]"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif" }}
    >
      {/* Subtle top gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <div className="absolute left-1/2 top-[-120px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(225,29,42,0.18),transparent_70%)]" />
      </div>

      {/* Simple header */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" aria-label="GetIntoD2C home">
          <BrandLogo eager className="h-12 w-auto md:h-[3.25rem]" />
        </a>
        <div className="hidden text-xs uppercase tracking-[0.24em] text-[#0a0a0a]/50 sm:block">
          Workshop · 26th August
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto w-full max-w-4xl px-6 pt-8 pb-16 text-center md:pt-16 md:pb-24">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#e11d2a]/20 bg-[#e11d2a]/5 px-4 py-1.5 text-xs font-medium tracking-wide text-[#e11d2a]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          GetIntoD2C presents · Live webinar
        </motion.div>

        <motion.h1
          initial={{ opacity: 1, y: 0 }}
          className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          The Proven Playbook to Build a{" "}
          <span className="bg-gradient-to-r from-[#e11d2a] to-[#ff6b57] bg-clip-text text-transparent">
            D2C Brand in India
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 1, y: 0 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#0a0a0a]/60 md:text-lg"
        >
          One live session on what actually works: sourcing, first customers, pricing and scaling,
          from people who have done it, not talked about it.
        </motion.p>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-[#0a0a0a]/60"
        >
          <span>26th August</span>
          <span className="h-1 w-1 rounded-full bg-[#0a0a0a]/25" />
          <span>4:00 PM IST</span>
          <span className="h-1 w-1 rounded-full bg-[#0a0a0a]/25" />
          <span>Online webinar</span>
          <span className="h-1 w-1 rounded-full bg-[#0a0a0a]/25" />
          <span>
            <span className="line-through opacity-50">₹200</span>{" "}
            <span className="font-semibold text-[#e11d2a]">₹59</span> to reserve your seat
          </span>

        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#register"
            onClick={() => trackEvent("InitiateCheckout", { value: 59, currency: "INR" })}
            className="group inline-flex items-center gap-2 rounded-full bg-[#e11d2a] px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(225,29,42,0.6)] transition hover:bg-[#b8151f]"
          >
            Reserve My Seat — <span className="opacity-60 line-through">₹200</span> ₹59

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <div className="flex items-center gap-4 text-xs text-[#0a0a0a]/50">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> 26th August
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" /> Seats capped at 200
            </span>
          </div>
        </motion.div>

        <p className="mx-auto mt-6 max-w-xl text-sm text-[#0a0a0a]/50">
          Get a ready-to-implement copy of the playbook "The steps to build a D2C brand" after the
          webinar.
        </p>
      </section>

      {/* Problem */}
      <Section
        eyebrow="Why this session"
        title="Everyone has advice. Almost none of it is proven."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <p className="text-base leading-relaxed text-[#0a0a0a]/60">
            Search "how to start a D2C brand" and you will get a thousand opinions, most from people
            who have never built one. Generic checklists. Recycled frameworks. Advice that sounds
            right and falls apart the moment you try to use it.
          </p>
          <p className="text-base leading-relaxed text-[#0a0a0a]/60">
            This session is different. Three founders, three categories, one playbook each, tested
            with real money, real customers and real mistakes. Not theory. What actually worked.
          </p>
        </div>
      </Section>

      {/* Panel */}
      <Section eyebrow="The panel" title="Learn from the founders who have build it">
        <p className="max-w-2xl text-base leading-relaxed text-[#0a0a0a]/60">
          We are bringing together D2C founders who have built and scaled brands across different
          categories, along with investors who back early-stage consumer brands in India.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {/* Gaurav Virmani */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:flex-row sm:items-start sm:gap-5 sm:p-5 sm:text-left">
            <img
              src="/gaurav-virmani.jpg"
              alt="Gaurav Virmani"
              width={720}
              height={900}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-28 w-28 flex-none rounded-2xl object-cover sm:h-32 sm:w-32"
            />
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e11d2a]">
                Guest speaker
              </div>
              <div className="mt-2 text-xl font-semibold text-[#0a0a0a]">Gaurav Virmani</div>
              <p className="mt-1 text-sm leading-relaxed text-[#0a0a0a]/60">
                Founder @ Go Whipped, 3X D2C Founder
              </p>
            </div>
          </div>

          {/* Kandarp Malhotra */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:flex-row sm:items-start sm:gap-5 sm:p-5 sm:text-left">
            <img
              src="/kandarp-malhotra.jpeg"
              alt="Kandarp Malhotra"
              width={1104}
              height={1427}
              loading="lazy"
              decoding="async"
              className="h-28 w-28 flex-none rounded-2xl object-cover sm:h-32 sm:w-32"
            />
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e11d2a]">
                Guest speaker
              </div>
              <div className="mt-2 text-xl font-semibold text-[#0a0a0a]">Kandarp Malhotra</div>
              <p className="mt-1 text-sm leading-relaxed text-[#0a0a0a]/60">
                Growth Marketer @ XTCY, scaling consumer brands across Blinkit, Zepto & Instamart
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-sm text-[#0a0a0a]/50">
          More speakers are announced closer to the session for registered attendees.
        </p>
      </Section>

      {/* Playbook */}
      <Section eyebrow="Inside the session" title="The playbook, broken down">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Sourcing and supply", "How each of them found and vetted their first manufacturer or vendor."],
            ["First 100 customers", "The actual channel and tactic that worked, not the one they wish had worked."],
            ["Pricing and margins", "How they priced from day one without guessing."],
            ["Scaling spend", "When they knew it was time to put real money behind ads."],
            ["The one mistake to skip", "What each of them would tell a first-time founder to avoid entirely."],
            ["Live Q&A", "The last 15 minutes are open questions with the panel."],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-3 rounded-2xl border border-black/[0.06] bg-white p-5">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e11d2a]/10">
                <Check className="h-3 w-3 text-[#e11d2a]" strokeWidth={3} />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0a0a0a]">{t}</div>
                <p className="mt-1 text-sm leading-relaxed text-[#0a0a0a]/55">{d}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-[#0a0a0a]/55">
          Three different categories. The same hard-won lessons show up in all three. That is the
          playbook.
        </p>
      </Section>

      {/* Who it's for */}
      <Section eyebrow="Who should attend" title="This session is for you if">
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "You have an idea and haven't started yet, but you're serious about it",
            "You're mid-build on sourcing, branding or tech and want a playbook, not guesswork",
            "You've launched in the last 6 months and want to sanity-check your approach",
            "You've been live 6+ months and feel stuck on what's next",
          ].map((i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-[#0a0a0a]/70">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e11d2a]/10">
                <Check className="h-3 w-3 text-[#e11d2a]" strokeWidth={3} />
              </div>
              {i}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-[#0a0a0a]/50">
          If you're already scaling and looking for advanced growth tactics, this session will feel
          early-stage for you, but stick around, we run sessions for that stage too.
        </p>
      </Section>

      {/* Registration + Pricing */}
      <section id="register" className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_60px_-30px_rgba(0,0,0,0.15)]"
        >
          <div className="bg-gradient-to-br from-[#FFF5F5] to-white p-6 text-center sm:p-10">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-[#e11d2a]">
              Workshop Fee
            </div>
            <div className="mt-3 flex items-baseline justify-center gap-3">
              <span className="text-2xl font-medium text-[#0a0a0a]/35 line-through">₹200</span>
              <span
                className="text-5xl font-semibold tracking-tight text-[#0a0a0a]"
                style={{ letterSpacing: "-0.03em" }}
              >
                ₹{AMOUNT_TOTAL.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#e11d2a]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-[#e11d2a]">
              Limited time offer
            </div>
            <div className="mt-3 flex items-center justify-center gap-3 text-xs text-[#0a0a0a]/55">
              <span>All taxes included</span>
            </div>

          </div>

          <div className="space-y-3 border-t border-black/[0.06] p-6 sm:p-10">
            {[
              "Live Workshop with D2C founders",
              "Founder Q&A with Angel Investors",
              "The GetIntoD2C Playbook",
              "Access to a curated D2C Founder's Community",
            ].map((f) => (
              <div key={f} className="flex items-start gap-3 text-sm text-[#0a0a0a]/75">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e11d2a]/10">
                  <Check className="h-3 w-3 text-[#e11d2a]" strokeWidth={3} />
                </div>
                {f}
              </div>
            ))}
          </div>

          <div className="border-t border-black/[0.06] bg-white p-6 sm:p-10">
            <RazorpayButton />
            <p className="mt-4 text-center text-xs text-[#0a0a0a]/45">
              Secure payment via Razorpay · You'll get a confirmation email after payment.
            </p>
          </div>
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#0a0a0a]/45">
          <BookOpen className="h-3.5 w-3.5" />
          The webinar link is shared via email and WhatsApp after registration.
        </div>
      </section>

      {/* FAQ */}
      <Section eyebrow="Questions" title="Frequently asked">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            [
              "Is this recorded if I can't attend live?",
              "This is not a recorded session. It is a live webinar where you can ask questions to founders who have already built in this space.",
            ],
            [
              "Do I need to have a business idea already?",
              "No. This is built for anyone seriously exploring D2C, idea stage included.",
            ],
            [
              "Will there be time for questions?",
              "Yes. The last 15 minutes are open Q&A with the panel.",
            ],
            [
              "What does my ₹59 cover?",
              "Access to the exclusive D2C webinar plus a ready-to-implement copy of the playbook.",
            ],
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-black/[0.06] bg-white p-6">
              <div className="text-sm font-semibold text-[#0a0a0a]">{q}</div>
              <p className="mt-2 text-sm leading-relaxed text-[#0a0a0a]/55">{a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28">
        <div className="rounded-3xl border border-black/[0.06] bg-gradient-to-br from-[#FFF5F5] to-white p-10 text-center sm:p-14">
          <h2
            className="text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Seats are capped at 200. Reserve yours.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[#0a0a0a]/55">
            26th August · 4:00 PM IST · Link sent via WhatsApp and email after registration.
          </p>
          <a
            href="#register"
            onClick={() => trackEvent("InitiateCheckout", { value: 59, currency: "INR" })}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#e11d2a] px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(225,29,42,0.6)] transition hover:bg-[#b8151f]"
          >
            Reserve My Seat — <span className="opacity-60 line-through">₹200</span> ₹59
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>
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
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-[#e11d2a]">
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
