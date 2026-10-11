"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";

const CAL_LINK = "abhinav-arora/getintod2c";
const CAL_URL = "https://cal.id/abhinav-arora/getintod2c";
function CalInlineEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      try {
        if (!(window as any).Cal) {
          await new Promise<void>((resolve, reject) => {
            const existing = document.querySelector<HTMLScriptElement>(
              'script[data-cal-embed="1"]',
            );
            if (existing) {
              existing.addEventListener("load", () => resolve(), { once: true });
              existing.addEventListener("error", () => reject(new Error("cal load")), {
                once: true,
              });
              if ((window as any).Cal) resolve();
              return;
            }
            const s = document.createElement("script");
            s.src = "https://app.cal.com/embed/embed.js";
            s.async = true;
            s.dataset.calEmbed = "1";
            s.onload = () => resolve();
            s.onerror = () => reject(new Error("Failed to load Cal embed"));
            document.head.appendChild(s);
          });
        }

        if (cancelled) return;
        const Cal = (window as any).Cal;
        if (!Cal || !containerRef.current) {
          setFailed(true);
          return;
        }

        Cal("init", "getintod2c", { origin: "https://cal.id" });
        Cal.ns.getintod2c("inline", {
          elementOrSelector: containerRef.current,
          calLink: CAL_LINK,
          layout: "month_view",
          config: { theme: "light" },
        });
        Cal.ns.getintod2c("ui", {
          theme: "light",
          hideEventTypeDetails: false,
          layout: "month_view",
          styles: { branding: { brandColor: "#0a0a0a" } },
        });
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-black/50 bg-[#ffffff] p-10 text-center">
        <Calendar className="h-8 w-8 text-[#0a0a0a]/70" />
        <p className="text-[#0a0a0a]/80">
          Couldn't load the inline scheduler. Open it in a new tab:
        </p>
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-medium text-[#ffffff] hover:bg-[#000000]"
        >
          Pick a time slot
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-[640px] w-full overflow-hidden rounded-2xl border border-black/40 bg-[#ffffff]"
    />
  );
}

export function FinalCTA() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section id="book" className="relative overflow-hidden bg-[#0a0a0a] py-28 text-[#ffffff] md:py-36">
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#e11d2a]/25 blur-3xl" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#ffffff]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
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
          <p className="mx-auto mt-8 max-w-xl text-lg text-[#ffffff]/80">
            Now accepting a small cohort of founders each quarter. Send us the
            brief, or pick a time on the calendar. We'll bring the audit.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="rounded-[2rem] border border-[#ffffff]/20 bg-[#ffffff]/10 p-4 backdrop-blur-xl md:p-6"
          >
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-[#ffffff]/70">
                <Calendar className="h-4 w-4" />
                Pick a slot
              </div>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#ffffff]/60 hover:text-[#ffffff]"
              >
                Open in new tab ↗
              </a>
            </div>
            {mounted && <CalInlineEmbed />}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="overflow-hidden rounded-[2rem] border border-[#ffffff]/20 bg-[#ffffff] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]"
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfi3NF8f96yU7FWcuR1-7Eqj1HGHBssHzY4apiFaZQlI-Fgbg/viewform?embedded=true"
              title="GetIntoD2C Launchpad application form"
              width="640"
              height="1782"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              loading="lazy"
              className="block min-h-[1782px] w-full border-0"
            >
              Loading…
            </iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
