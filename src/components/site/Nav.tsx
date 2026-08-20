"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

const LINKS: [string, string][] = [
  ["Categories", "/#industries"],
  ["Services", "/#services"],
  ["Process", "/#process"],
  ["Webinars", "/registerations"],
  ["For Founders", "/for-founders"],
  ["Journal", "/blog"],
  ["FAQs", "/#faq"],
];

export function Nav() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 160], ["rgba(10,10,10,0)", "rgba(10,10,10,0.92)"]);
  const border = useTransform(scrollY, [0, 160], ["rgba(255,255,255,0)", "rgba(255,255,255,0.15)"]);

  return (
    <motion.header
      style={mounted ? { backgroundColor: bg, borderColor: border } : undefined}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-3">
          <BrandLogo eager className="h-12 w-auto md:h-[3.25rem]" />
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="/#book"
          className="hidden items-center gap-2 rounded-full bg-[#e11d2a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#c41a24] md:inline-flex"
        >
          Build Your Brand
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/15 bg-[#0a0a0a]/95 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-white hover:bg-white/10"
              >
                {label}
              </a>
            ))}
            <a
              href="/#book"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#e11d2a] px-5 py-3 text-sm font-medium text-white"
            >
              Build Your Brand
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
