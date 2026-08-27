"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Play, Users } from "lucide-react";
import { trackEvent } from "@/lib/meta-pixel";

const STORAGE_KEY = "gid2c_webinar_popup_dismissed";

export function WebinarPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    // Don't interrupt initial page load; user can trigger webinar dialog via CTA
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="D2C workshop registration"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-black/10 bg-white text-left shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-black/10 text-[#0a0a0a]/60 transition hover:bg-black/5"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-7 pb-7 pt-9">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#e11d2a]">
                Recorded Masterclass · Free Access
              </span>
              <h2 className="mt-4 font-display text-3xl leading-tight text-[#0a0a0a]">
                The Proven Playbook to Build a D2C Brand
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#0a0a0a]/60">
                Watch the complete recorded session with founders who have built it: sourcing, first
                customers, pricing, unit economics, and quick commerce scaling.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#0a0a0a]/60">
                <span className="inline-flex items-center gap-1.5">
                  <Play className="h-3.5 w-3.5 text-[#e11d2a]" /> Full Video Recording
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-[#e11d2a]" /> 4 Panelists & Founders
                </span>
              </div>

              <a
                href="/webinars/proven-playbook-to-build-a-d2c-brand"
                onClick={() => {
                  trackEvent("ViewContent", { content_name: "Webinar Recording" });
                  close();
                }}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e11d2a] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#b8151f]"
              >
                Watch Recording Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <button
                onClick={close}
                className="mt-3 w-full text-center text-xs text-[#0a0a0a]/45 transition hover:text-[#0a0a0a]/70"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
