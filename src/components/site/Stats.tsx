"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { label: "Brands Launched", value: 120, suffix: "+" },
  { label: "Campaigns Deployed", value: 350, suffix: "+" },
  { label: "Founder Capital Raised", value: 140, suffix: "M+", prefix: "$" },
  { label: "Years In GetintoD2C", value: 12, suffix: "" },
];

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCurrent(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{current}</span>;
}

export function Stats() {
  return (
    <section id="proof" className="bg-gradient-dark-accent relative overflow-hidden py-28 text-[#ffffff] md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#ffffff]/60">
              A Decade On The Shelf
            </div>
            <h2 className="font-display text-4xl leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
              The <span className="text-serif-italic">quiet</span> record.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#ffffff]/80 md:text-lg">
            Twelve years. Six categories. Hundreds of launches. The numbers we
            care about most are the ones behind founders sleeping better.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-[#ffffff]/15 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="relative bg-[#0a0a0a] p-8 md:p-12"
            >
              <div className="font-display text-5xl leading-none tracking-tight md:text-7xl">
                {"prefix" in s && s.prefix}
                <Counter value={s.value} />
                {s.suffix}
              </div>
              <div className="mt-5 text-[11px] uppercase tracking-[0.35em] text-[#ffffff]/70">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
