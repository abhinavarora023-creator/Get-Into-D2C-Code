"use client";

import { motion } from "framer-motion";
import { ClipboardCheck } from "lucide-react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfi3NF8f96yU7FWcuR1-7Eqj1HGHBssHzY4apiFaZQlI-Fgbg/viewform?embedded=true";

export function FinalCTA() {
  return (
    <section
      id="book"
      className="relative overflow-hidden bg-[#0a0a0a] py-24 text-[#ffffff] md:py-32"
    >
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#e11d2a]/25 blur-3xl" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#ffffff]/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-[#ffffff]/70"
          >
            <span className="h-px w-8 bg-[#ffffff]/60" />
            The Launch
            <span className="h-px w-8 bg-[#ffffff]/60" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="font-display text-5xl leading-[1] tracking-tight md:text-7xl lg:text-[96px]"
          >
            Ready to build your{" "}
            <span className="text-serif-italic">icon?</span>
          </motion.h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[#ffffff]/70 md:text-lg">
            We partner with a small cohort of ambitious founders each quarter.
            Tell us about your brand, your vision, and where you need momentum.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="mt-14 overflow-hidden rounded-[1.75rem] border border-white/15 bg-white shadow-[0_40px_100px_-45px_rgba(225,29,42,0.5)] md:mt-16 md:rounded-[2.25rem]"
        >
          <div className="flex flex-col gap-3 border-b border-black/10 bg-[#f7f7f5] px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-9 md:py-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0a0a0a] text-white">
                <ClipboardCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e11d2a]">
                  Launchpad application
                </p>
                <p className="mt-1 text-sm text-black/60">
                  Share the essentials. We’ll review every submission personally.
                </p>
              </div>
            </div>
            <span className="self-start rounded-full border border-black/10 bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-black/50 sm:self-center">
              Takes 3–5 minutes
            </span>
          </div>

          <iframe
            src={GOOGLE_FORM_URL}
            title="GetIntoD2C Launchpad application form"
            width="640"
            height="1782"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            loading="lazy"
            className="block min-h-[1782px] w-full border-0 bg-white"
          >
            Loading…
          </iframe>
        </motion.div>
      </div>
    </section>
  );
}
