"use client";
import { motion } from "framer-motion";

type Tile = {
  n: string;
  name: string;
  tag: string;
  desc: string;
  span: string;
  variant: "cream" | "sand" | "tan" | "clay";
};

const INDUSTRIES: Tile[] = [
  {
    n: "01",
    name: "Skincare & Wellness",
    tag: "Category · Ritual",
    desc: "Elevating routine into ritual. We help wellness brands master the art of the physical touchpoint.",
    span: "md:col-span-8",
    variant: "sand",
  },
  {
    n: "02",
    name: "FMCG",
    tag: "Category · Velocity",
    desc: "Everyday essentials, engineered for shelf velocity and repeat purchase.",
    span: "md:col-span-4",
    variant: "clay",
  },
  {
    n: "03",
    name: "Modern Snacking",
    tag: "Category · Craving",
    desc: "Clean labels, bold palettes, and high-frequency purchasing loops.",
    span: "md:col-span-4",
    variant: "cream",
  },
  {
    n: "04",
    name: "Health Supplements",
    tag: "Category · Efficacy",
    desc: "Bridging clinical rigor with lifestyle aesthetics that founders and buyers trust.",
    span: "md:col-span-4",
    variant: "cream",
  },
  {
    n: "05",
    name: "Beverage",
    tag: "Category · Craft",
    desc: "Botanicals, functional formats, and category-creating brand worlds.",
    span: "md:col-span-4",
    variant: "tan",
  },
  {
    n: "06",
    name: "Fashion Accessories",
    tag: "Category · Drop",
    desc: "Capsule drops, considered design cycles, and community-first launches.",
    span: "md:col-span-12",
    variant: "sand",
  },
];

const VARIANT_CLS: Record<Tile["variant"], string> = {
  cream: "bg-[#ffffff] border border-black/50 text-[#0a0a0a] hover:bg-[#f4f4f4]",
  sand: "bg-[#f4f4f4] border border-black/50 text-[#0a0a0a]",
  tan: "bg-[#e11d2a] text-[#ffffff]",
  clay: "bg-[#0a0a0a] text-[#ffffff]",
};

export function Industries() {
  return (
    <section
      id="industries"
      className="bg-gradient-rose-glow relative overflow-hidden py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
              GetintoD2C Portfolio
            </div>
            <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-[#0a0a0a] md:text-6xl lg:text-7xl">
              Six categories.
              <br />
              <span className="text-serif-italic">One studio.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#0a0a0a]/70 md:text-lg">
            Six D2C categories we have calibrated for zero-day success. Playbooks written, unit
            economics known cold, and creative that founders are proud to put their name on.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {INDUSTRIES.map((tile, i) => (
            <motion.article
              key={tile.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.19, 1, 0.22, 1] }}
              className={`group relative overflow-hidden rounded-[2rem] p-10 transition-colors duration-500 md:min-h-[280px] ${tile.span} ${VARIANT_CLS[tile.variant]}`}
            >
              <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.32em] opacity-60">
                    {tile.tag}
                  </div>
                  <h3 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                    {tile.name}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed opacity-80 md:text-base">
                    {tile.desc}
                  </p>
                </div>
                <div className="font-display text-5xl italic opacity-90 md:text-6xl">{tile.n}</div>
              </div>
              {tile.variant === "sand" && (
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[#e11d2a]/30 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
