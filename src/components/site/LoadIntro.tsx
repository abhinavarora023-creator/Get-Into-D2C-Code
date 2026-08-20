"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadIntro() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#ffffff]"
          onClick={() => setGone(true)}
        >
          <div className="relative text-center">
            <motion.div
              initial={{ letterSpacing: "0.4em", opacity: 0 }}
              animate={{ letterSpacing: "-0.01em", opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
              className="font-display text-4xl text-[#0a0a0a] md:text-6xl"
            >
              GetInto<span className="text-serif-italic">D2C</span>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: "easeInOut" }}
              className="mt-6 h-px w-full origin-left bg-[#e11d2a]"
            />
            <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-[#e11d2a]">
              GetintoD2C, Est. 2013
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
