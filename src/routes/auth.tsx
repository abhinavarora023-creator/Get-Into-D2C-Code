"use client";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { MagneticButton } from "@/components/site/MagneticButton";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Admin sign in — GetIntoD2C" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const credentialsSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(200),
  password: z.string().min(8, "Password must be at least 8 characters").max(200),
});

function AuthPage() {
  const { redirect } = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled && data.session) {
        navigate({ to: redirect ?? "/admin", replace: true });
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate({ to: redirect ?? "/admin", replace: true });
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [navigate, redirect]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = credentialsSchema.safeParse({
      email: form.get("email"),
      password: form.get("password"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check the form");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created. You are signed in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#ffffff] text-[#0a0a0a] paper-bg grain">
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-[2rem] border border-black/10 bg-[#ffffff] p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.25)] md:p-10"
        >
          <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
            Admin Access
          </div>
          <h1 className="font-display text-3xl leading-tight text-[#0a0a0a] md:text-4xl">
            {mode === "signin" ? (
              <>
                Sign in to <span className="text-serif-italic">the studio</span>.
              </>
            ) : (
              <>
                Create the first{" "}
                <span className="text-serif-italic">admin account</span>.
              </>
            )}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#0a0a0a]/65">
            {mode === "signup"
              ? "The first account to sign up becomes the admin automatically."
              : "For team members managing events and applications."}
          </p>

          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-[0.28em] text-[#0a0a0a]/60">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                maxLength={200}
                className="h-12 w-full rounded-full border border-black bg-[#ffffff] px-5 text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#0a0a0a] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-[0.28em] text-[#0a0a0a]/60">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                maxLength={200}
                className="h-12 w-full rounded-full border border-black bg-[#ffffff] px-5 text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#0a0a0a] focus:outline-none"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setMode((m) => (m === "signin" ? "signup" : "signin"))
                }
                className="text-xs uppercase tracking-[0.28em] text-[#0a0a0a]/60 hover:text-[#0a0a0a]"
              >
                {mode === "signin" ? "Create account" : "Have an account? Sign in"}
              </button>
              <MagneticButton type="submit" disabled={busy}>
                {busy ? "…" : mode === "signin" ? "Sign in" : "Create"}
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </form>
        </motion.div>
        <a
          href="/"
          className="mt-8 text-center text-[11px] uppercase tracking-[0.32em] text-[#0a0a0a]/55 hover:text-[#0a0a0a]"
        >
          ← Back to site
        </a>
      </div>
      <Toaster theme="light" position="top-center" />
    </main>
  );
}
