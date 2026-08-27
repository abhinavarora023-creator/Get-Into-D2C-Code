"use client";
import { motion } from "framer-motion";

const LINES = [
  { text: "Your brand is", italic: false },
  { text: "leaking margin.", italic: true },
  { text: "Your positioning", italic: false },
  { text: "confuses buyers.", italic: true },
  { text: "Your ad spend", italic: false },
  { text: "isn't compounding.", italic: true },
];

export function Problem() {
  return (
    <section className="bg-gradient-warm relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
          The Honest Diagnostic
        </div>

        <div className="space-y-2">
          {LINES.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1,
                  delay: i * 0.08,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className={`font-display text-5xl leading-[1.08] tracking-[-0.01em] text-[#0a0a0a] md:text-7xl lg:text-8xl ${
                  line.italic ? "italic text-[#0a0a0a]/95" : "text-[#0a0a0a]/70"
                }`}
              >
                {line.text}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-16 grid gap-10 border-t border-black/60 pt-10 md:grid-cols-[2fr_1fr]"
        >
          <p className="max-w-xl text-lg leading-relaxed text-[#0a0a0a]/75">
            Every plateau has a reason. We find it, name it, and give you the sequence to break
            through, with the calm of people who have done this at scale.
          </p>
          <p className="text-serif-italic text-2xl leading-snug text-[#0a0a0a]/70 md:text-right">
            "A brand is not what you say it is. It is what your customer feels when they hold it."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
