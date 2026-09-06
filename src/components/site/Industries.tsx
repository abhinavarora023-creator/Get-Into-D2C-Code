"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Tile = {
  n: string;
  slug: string;
  name: string;
  tag: string;
  desc: string;
  span: string;
  variant: "cream" | "sand" | "tan" | "clay";
};

const INDUSTRIES: Tile[] = [
  {
    n: "01",
    slug: "skincare",
    name: "Skincare & Wellness",
    tag: "Category · Ritual",
    desc: "Elevating routine into ritual. We help wellness brands master the art of the physical touchpoint.",
    span: "md:col-span-8",
    variant: "sand",
  },
  {
    n: "02",
    slug: "fmcg",
    name: "FMCG",
    tag: "Category · Velocity",
    desc: "Everyday essentials, engineered for shelf velocity and repeat purchase.",
    span: "md:col-span-4",
    variant: "clay",
  },
  {
    n: "03",
    slug: "healthy-snacking",
    name: "Modern Snacking",
    tag: "Category · Craving",
    desc: "Clean labels, bold palettes, and high-frequency purchasing loops.",
    span: "md:col-span-4",
    variant: "cream",
  },
  {
    n: "04",
    slug: "health-supplements",
    name: "Health Supplements",
    tag: "Category · Efficacy",
    desc: "Bridging clinical rigor with lifestyle aesthetics that founders and buyers trust.",
    span: "md:col-span-4",
    variant: "cream",
  },
  {
    n: "05",
    slug: "beverages",
    name: "Beverage",
    tag: "Category · Craft",
    desc: "Botanicals, functional formats, and category-creating brand worlds.",
    span: "md:col-span-4",
    variant: "tan",
  },
  {
    n: "06",
    slug: "fashion-accessories",
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
    <section id="industries" className="bg-gradient-rose-glow relative overflow-hidden py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
              GetintoD2C Portfolio
            </div>
            <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-[#0a0a0a] md:text-6xl lg:text-7xl">
              Six categories.<br />
              <span className="text-serif-italic">One studio.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-md text-base leading-relaxed text-[#0a0a0a]/70 md:text-lg">
              Six D2C categories we have calibrated for zero-day success. Playbooks
              written, unit economics known cold, and creative that founders are
              proud to put their name on.
            </p>
            <a
              href="/categories"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#e11d2a] transition-colors hover:text-[#0a0a0a]"
            >
              Explore All Categories
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {INDUSTRIES.map((tile, i) => (
            <motion.div
              key={tile.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.19, 1, 0.22, 1] }}
              className={`group relative overflow-hidden rounded-[2rem] transition-colors duration-500 md:min-h-[280px] ${tile.span} ${VARIANT_CLS[tile.variant]}`}
            >
              <a
                href={`/categories/${tile.slug}`}
                className="relative z-10 flex h-full flex-col justify-between gap-10 p-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-label={`Explore ${tile.name} Category Playbook and Case Studies`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.32em] opacity-60">
                    <span>{tile.tag}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-4 font-display text-3xl leading-tight md:text-4xl group-hover:underline decoration-1 underline-offset-4">
                    {tile.name}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed opacity-80 md:text-base">
                    {tile.desc}
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <div className="font-display text-5xl italic opacity-90 md:text-6xl">
                    {tile.n}
                  </div>
                  <span className="text-xs uppercase tracking-wider opacity-0 transition-opacity duration-300 group-hover:opacity-80">
                    Category Playbook &rarr;
                  </span>
                </div>
              </a>
              {tile.variant === "sand" && (
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[#e11d2a]/30 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
