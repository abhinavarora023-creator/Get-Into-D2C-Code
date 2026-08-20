"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function FloatingCTA() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setMounted(true);
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;
  return (
    <motion.a
      href="#book"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-medium text-[#ffffff] shadow-[0_20px_50px_-20px_rgba(139,115,85,0.6)] transition-colors hover:bg-[#000000] md:inline-flex"
      onClick={(e) => {
        const el = document.getElementById("book");
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      Build Your Brand
      <ArrowUpRight className="h-4 w-4" />
    </motion.a>
  );
}
