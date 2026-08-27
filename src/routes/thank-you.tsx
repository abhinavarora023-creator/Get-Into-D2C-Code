"use client";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Mail, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/meta-pixel";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Registration Successful — GetIntoD2C Workshop" },
      {
        name: "description",
        content:
          "Your seat for the Proven Playbook to Build a D2C Brand workshop on 26th August is confirmed.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  useEffect(() => {
    trackEvent("Purchase", { value: 59, currency: "INR" });
  }, []);

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-16 text-[#0a0a0a]"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif" }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px]">
        <div className="absolute left-1/2 top-[-120px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(225,29,42,0.18),transparent_70%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto w-full max-w-lg rounded-3xl border border-black/[0.06] bg-white p-10 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_60px_-30px_rgba(0,0,0,0.15)]"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 18 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e11d2a]/10"
        >
          <CheckCircle2 className="h-9 w-9 text-[#e11d2a]" strokeWidth={2} />
        </motion.div>

        <h1
          className="mt-6 text-3xl font-semibold tracking-tight text-[#0a0a0a] sm:text-4xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Registration Successful <span aria-hidden>🎉</span>
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[#0a0a0a]/60">
          Your seat has been confirmed. A confirmation email is on its way.
        </p>

        <div className="mt-8 space-y-3 rounded-2xl border border-black/[0.06] bg-[#F7FAFF] p-5 text-left">
          <div className="flex items-center gap-3 text-sm text-[#0a0a0a]/75">
            <Mail className="h-4 w-4 text-[#e11d2a]" />
            Check your inbox for community details and access links.
          </div>
        </div>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
        >
          Back to GetIntoD2C
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
