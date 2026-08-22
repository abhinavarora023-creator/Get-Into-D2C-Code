"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowUpRight, Mail, CheckCircle2, Calendar } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CAL_LINK = "abhinav-arora/getintod2c";
const CAL_URL = "https://cal.id/abhinav-arora/getintod2c";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xlgalrzz";

const schema = z.object({
  fullName: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid work email").max(120),
  brand: z.string().trim().min(1, "Add your brand name").max(80),
  stage: z.enum(["idea", "early", "scaling", "established"]),
  challenge: z.string().trim().min(10, "Give us a sentence or two").max(1000),
});

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
  const [stage, setStage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => setMounted(true), []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      fullName: form.get("fullName"),
      email: form.get("email"),
      brand: form.get("brand"),
      stage,
      challenge: form.get("challenge"),
    };
    const result = schema.safeParse(payload);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    try {
      const body = new FormData();
      body.append("Full Name", result.data.fullName);
      body.append("Email", result.data.email);
      body.append("Brand", result.data.brand);
      body.append("Stage", result.data.stage);
      body.append("Challenge", result.data.challenge);
      body.append("_subject", `New GetIntoD2C brief from ${result.data.fullName} (${result.data.brand})`);
      body.append("_replyto", result.data.email);
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Submission failed");
      }
      setSuccess(true);
      formEl.reset();
      setStage("");
      toast.success("Sent. We'll be in touch shortly.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative rounded-[2rem] border border-[#ffffff]/20 bg-[#ffffff] p-6 text-[#0a0a0a] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] md:p-8"
          >
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="flex min-h-[440px] flex-col items-center justify-center gap-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  className="grid h-20 w-20 place-items-center rounded-full bg-[#0a0a0a]"
                >
                  <CheckCircle2 className="h-10 w-10 text-[#ffffff]" strokeWidth={2.2} />
                </motion.div>
                <div>
                  <h3 className="font-display text-3xl text-[#0a0a0a]">
                    Thank you. We'll be in touch shortly.
                  </h3>
                  <p className="mt-3 text-[#0a0a0a]/70">
                    While you wait, grab a time on the calendar to lock in your call.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="text-[11px] uppercase tracking-[0.3em] text-[#0a0a0a]/60 hover:text-[#0a0a0a]"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <>
                <div className="grid gap-4">
                  <Field label="Full name" name="fullName" placeholder="Jane Founder" />
                  <Field label="Work email" name="email" type="email" placeholder="jane@brand.com" />
                  <Field label="Brand name" name="brand" placeholder="Your brand" />
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-[0.28em] text-[#0a0a0a]/60">
                      Current stage
                    </label>
                    <Select value={stage} onValueChange={setStage}>
                      <SelectTrigger className="h-12 rounded-full border-black bg-[#ffffff] px-5 text-[#0a0a0a]">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">Idea Stage</SelectItem>
                        <SelectItem value="early">Early Revenue</SelectItem>
                        <SelectItem value="scaling">Scaling</SelectItem>
                        <SelectItem value="established">Established</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <label className="text-[11px] uppercase tracking-[0.28em] text-[#0a0a0a]/60">
                    Biggest challenge
                  </label>
                  <textarea
                    name="challenge"
                    rows={4}
                    maxLength={1000}
                    placeholder="Where is growth stuck? What have you tried?"
                    className="w-full resize-none rounded-2xl border border-black bg-[#ffffff] px-5 py-3 text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#0a0a0a] focus:outline-none"
                  />
                </div>

                <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <a
                    href="mailto:team@getintod2c.in"
                    className="inline-flex items-center gap-2 text-sm text-[#0a0a0a]/70 transition-colors hover:text-[#0a0a0a]"
                  >
                    <Mail className="h-4 w-4" />
                    team@getintod2c.in
                  </a>
                  <MagneticButton type="submit" disabled={submitting}>
                    {submitting ? "Sending..." : "Send Brief"}
                    <ArrowUpRight className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] uppercase tracking-[0.28em] text-[#0a0a0a]/60">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={120}
        className="h-12 w-full rounded-full border border-black bg-[#ffffff] px-5 text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#0a0a0a] focus:outline-none"
      />
    </div>
  );
}
