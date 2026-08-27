"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

const CATEGORY_TAGS = [
  "FMCG",
  "Skincare",
  "Snacking",
  "Health Supplements",
  "Beverage",
  "Fashion Accessories",
];

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden paper-bg grain">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pb-20 pt-32 text-center md:pt-40">
        <motion.span
          initial={{ opacity: 1, y: 0 }}
          className="mb-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#e11d2a]"
        >
          <span className="h-px w-8 bg-[#e11d2a]" />
          GetintoD2C, A Unit of Parlexa
          <span className="h-px w-8 bg-[#e11d2a]" />
        </motion.span>

        <motion.h1
          initial={{ opacity: 1, y: 0 }}
          className="font-display text-5xl leading-[0.98] tracking-[-0.01em] text-[#0a0a0a] sm:text-6xl md:text-7xl lg:text-[104px]"
        >
          Architecting the next <span className="text-serif-italic">generation</span> of consumer
          icons.
        </motion.h1>

        <motion.p
          initial={{ opacity: 1, y: 0 }}
          className="mt-10 max-w-2xl text-base leading-relaxed text-[#0a0a0a]/75 md:text-xl"
        >
          A D2C launchpad for founders of consumer brands. We move founders from scattered ideas to
          shelf-ready clarity, across FMCG, skincare, snacking, health supplements, beverage and
          fashion accessories.
        </motion.p>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="mt-12 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center"
        >
          <a href="#book" className="w-full sm:w-auto">
            <MagneticButton>
              Build Your Brand
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </a>
          <a href="#industries" className="w-full sm:w-auto">
            <MagneticButton variant="ghost" strength={0.12}>
              Explore GetintoD2C
            </MagneticButton>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 1 }}
          className="mt-20 flex w-full flex-col items-center gap-5"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#e11d2a]">
            Categories We Build For
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORY_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/70 bg-[#ffffff]/60 px-4 py-1.5 text-xs text-[#0a0a0a]/80 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative rule */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#e11d2a]/40" />
    </section>
  );
}
