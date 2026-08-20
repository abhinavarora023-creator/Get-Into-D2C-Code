"use client";
import { motion } from "framer-motion";

const STEPS = [
  {
    n: "01",
    title: "Deep Immersion",
    desc: "We dive into the chemistry, origin and founder story to find the unique emotional hook that becomes the brand's north star.",
  },
  {
    n: "02",
    title: "Tactile Identity",
    desc: "Designing for the hand and the eye. High-fidelity packaging, storefronts and interfaces that feel like the brand you always imagined.",
  },
  {
    n: "03",
    title: "Market Activation",
    desc: "A surgical launch across D2C, social and key retail partners. Growth engines primed, retention flows armed, first buyers waiting.",
  },
  {
    n: "04",
    title: "Compounding Growth",
    desc: "Monthly rhythm of experiments, reviews and roadmap. Not a hand-off, a partnership until the brand runs on its own gravity.",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-gradient-rose-glow relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#e11d2a]/12 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#0a0a0a]/6 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
              GetintoD2C Process
            </div>
            <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-[#0a0a0a] md:text-6xl lg:text-7xl">
              Methodical, <span className="text-serif-italic">warm</span>, and
              built for founders.
            </h2>
          </div>
          <p className="max-w-sm text-serif-italic text-xl leading-snug text-[#0a0a0a]/70 md:text-right">
            "We combine the rigor of a supply-chain operator with the eye of a
            creative director."
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="relative"
            >
              <div className="pointer-events-none absolute -top-10 -left-2 font-display text-[110px] leading-none text-[#e11d2a]/25">
                {step.n}
              </div>
              <div className="relative">
                <div className="text-[10px] uppercase tracking-[0.35em] text-[#e11d2a]">
                  Step {step.n}
                </div>
                <h3 className="mt-4 font-display text-2xl text-[#0a0a0a] md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[#0a0a0a]/70">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
