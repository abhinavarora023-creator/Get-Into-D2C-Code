"use client";
import { motion } from "framer-motion";

const SERVICES = [
  {
    n: "01",
    title: "Brand Audit",
    desc: "A calm, honest look at where a brand leaks margin: positioning, pricing, and unit economics.",
    span: "md:col-span-6",
    tone: "sand",
  },
  {
    n: "02",
    title: "Positioning & Identity",
    desc: "Sharper messaging and a visual system that actually feels like the brand founders describe.",
    span: "md:col-span-6",
    tone: "cream",
  },
  {
    n: "03",
    title: "Growth Engine",
    desc: "Meta, Google, marketplace and creator strategy built for compounding scale.",
    span: "md:col-span-4",
    tone: "clay",
  },
  {
    n: "04",
    title: "GTM Strategy",
    desc: "Launch plans, pricing logic and clear timelines from first shelf to first crore.",
    span: "md:col-span-4",
    tone: "cream",
  },
  {
    n: "05",
    title: "CRO & Funnel",
    desc: "Higher AOV, cleaner checkout, considered detail pages that convert on the first visit.",
    span: "md:col-span-4",
    tone: "cream",
  },
  {
    n: "06",
    title: "Retention Systems",
    desc: "Repeat rate, subscription and lifecycle flows that turn buyers into a community.",
    span: "md:col-span-12",
    tone: "tan",
  },
];

const TONE: Record<string, string> = {
  cream: "bg-[#ffffff] border border-black/50 text-[#0a0a0a]",
  sand: "bg-[#f4f4f4] border border-black/40 text-[#0a0a0a]",
  tan: "bg-[#e11d2a] text-[#ffffff]",
  clay: "bg-[#0a0a0a] text-[#ffffff]",
};

export function Services() {
  return (
    <section id="services" className="bg-gradient-warm relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
              Full-Stack Launch Capabilities
            </div>
            <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-[#0a0a0a] md:text-6xl lg:text-7xl">
              Six services.
              <br />
              <span className="text-serif-italic">One launchpad.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#0a0a0a]/70 md:text-lg">
            Not an agency retainer. A founder's operating system, six modules that stack into a
            compounding growth engine built for launch and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.19, 1, 0.22, 1] }}
              className={`group relative overflow-hidden rounded-[2rem] p-10 transition-transform duration-500 hover:-translate-y-1 md:min-h-[240px] ${s.span} ${TONE[s.tone]}`}
            >
              <div className="flex h-full flex-col justify-between gap-10">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.35em] opacity-60">
                    Service · {s.n}
                  </div>
                  <h3 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed opacity-80 md:text-base">
                    {s.desc}
                  </p>
                </div>
                <div className="font-display text-5xl italic opacity-90 md:text-6xl">{s.n}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
