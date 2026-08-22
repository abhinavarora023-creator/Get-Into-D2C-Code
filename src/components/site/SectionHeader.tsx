"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`mb-14 flex flex-col gap-6 ${alignCls}`}>
      <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
        {eyebrow}
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        className="font-display text-4xl leading-[1.02] tracking-tight text-[#0a0a0a] md:text-6xl lg:text-7xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <p className={`max-w-xl text-base text-[#0a0a0a]/70 md:text-lg ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
