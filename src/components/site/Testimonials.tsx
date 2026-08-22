"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Ashok Mathur",
    role: "Founder, Plan Your Legacy",
    initials: "AM",
    quote:
      "The team is helping us set Plan Your Legacy up from the ground up so we can start serving clients the right way, with clarity and calm.",
  },
  {
    name: "Manav",
    role: "Imarticus Training",
    initials: "M",
    quote:
      "We came in with a brief and left with content that genuinely converted. Their ability to simplify complex messaging into compelling visuals is unmatched.",
  },
  {
    name: "Anushk Johri",
    role: "Founder, Benny's Bowl",
    initials: "AJ",
    quote:
      "For a young food brand, visuals are everything. They made our product look so good, our DMs were full before the campaign even officially launched.",
  },
  {
    name: "Raunak Mahandarani",
    role: "Founder, Healthy Snacking",
    initials: "RM",
    quote:
      "Launching a healthy snacking brand is no small task. Having this team in my corner has made all the difference. They get the vision.",
  },
  {
    name: "Aditya Kashid",
    role: "Content Head, Trakin Tech",
    initials: "AK",
    quote:
      "We produce a massive volume of content and needed a team that could match our pace without compromising on quality. They delivered, every single time.",
  },
  {
    name: "Anubhav Jain",
    role: "CEO, Nitara",
    initials: "AJ",
    quote:
      "Sharp, professional, and genuinely collaborative. They brought creative thinking that elevated our brief into something we are proud to put our brand behind.",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-65%"]);

  return (
    <section ref={ref} className="relative bg-[#ffffff]">
      <div className="h-[260vh]">
        <div className="sticky top-0 flex h-screen flex-col items-center overflow-hidden py-12 md:py-16">
          <div className="mx-auto mb-6 w-full max-w-7xl px-6 md:mb-8">
            <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
              Founder Voices
            </div>
            <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-[#0a0a0a] md:text-6xl lg:text-7xl">
              What founders <span className="text-serif-italic">say.</span>
            </h2>
          </div>

          <motion.div style={{ x }} className="flex w-max gap-6 pl-6 md:pl-16">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className="relative flex w-[85vw] shrink-0 flex-col justify-between rounded-[2rem] border border-black/50 bg-[#f4f4f4]/60 p-6 md:w-[520px] md:p-8 md:h-[380px] lg:h-[420px] lg:p-10"
              >
                <div>
                  <div className="mb-6 font-display text-6xl italic leading-none text-[#e11d2a]">
                    &ldquo;
                  </div>
                  <p className="text-serif-italic text-xl leading-relaxed text-[#0a0a0a]/90 md:text-2xl">
                    {t.quote}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4 border-t border-black/50 pt-6">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[#e11d2a] font-display text-lg text-[#ffffff]">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-display text-lg text-[#0a0a0a]">{t.name}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#0a0a0a]/60">
                      {t.role}
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <div className="w-[10vw] shrink-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
