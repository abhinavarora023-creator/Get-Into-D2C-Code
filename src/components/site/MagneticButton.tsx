"use client";
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  strength?: number;
  variant?: "primary" | "ghost";
};

export function MagneticButton({
  children,
  strength = 0.2,
  variant = "primary",
  className,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      setPos({ x: x * strength, y: y * strength });
    };
    const onLeave = () => setPos({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <button
      ref={ref}
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-all duration-300 will-change-transform",
        variant === "primary" &&
          "bg-[#0a0a0a] text-[#ffffff] hover:bg-[#000000] hover:shadow-[0_18px_40px_-18px_rgba(139,115,85,0.55)]",
        variant === "ghost" &&
          "border border-black bg-transparent text-[#0a0a0a] hover:bg-[#f4f4f4]",
        className,
      )}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
