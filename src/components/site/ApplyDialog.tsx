"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdaqelrv";

export function openCommunityApplyDialog() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-apply-dialog"));
  }
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ApplyDialog({ open, onOpenChange }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => onOpenChange(true);
    window.addEventListener("open-apply-dialog", handleOpen);
    return () => window.removeEventListener("open-apply-dialog", handleOpen);
  }, [onOpenChange]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.errors?.[0]?.message || "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-black/10 bg-[#ffffff] p-0 sm:max-w-lg">
        <div className="p-7 md:p-9">
          <DialogHeader className="space-y-3 text-left">
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
              Apply To Join
            </div>
            <DialogTitle className="font-display text-3xl leading-tight text-[#0a0a0a] md:text-4xl">
              Come sit at the table.
            </DialogTitle>
            <DialogDescription className="text-[#0a0a0a]/65">
              Two minutes. We read every application personally.
            </DialogDescription>
          </DialogHeader>

          {status === "success" ? (
            <div className="mt-8 rounded-2xl border border-[#e11d2a]/20 bg-[#fff5f6] p-6 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-[#e11d2a]" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-2xl text-[#0a0a0a]">Application received.</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#0a0a0a]/70">
                We'll be in touch on WhatsApp once we've reviewed it. In the meantime,
                keep building.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <Field label="Full name" name="name" required autoComplete="name" />
              <Field
                label="Professional email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
              <Field
                label="WhatsApp number"
                name="whatsapp"
                type="tel"
                required
                placeholder="+91 98xxxxxxxx"
                autoComplete="tel"
              />
              <Field label="Company name" name="company" required />
              <Field
                label="LinkedIn profile URL"
                name="linkedin"
                type="url"
                required
                placeholder="https://linkedin.com/in/..."
              />

              {error && (
                <p className="text-sm text-[#e11d2a]">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e11d2a] px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(225,29,42,0.55)] transition hover:bg-[#c8161f] disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Submit application
                    <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="pt-1 text-center text-[11px] uppercase tracking-[0.28em] text-[#0a0a0a]/45">
                Free · Invitation-based · WhatsApp-only
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-xs uppercase tracking-[0.18em] text-[#0a0a0a]/60">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-11 rounded-xl border-black/15 bg-white text-[#0a0a0a] focus-visible:ring-[#e11d2a]/40"
      />
    </div>
  );
}
