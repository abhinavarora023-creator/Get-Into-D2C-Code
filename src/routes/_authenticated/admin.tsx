"use client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Calendar,
  MapPin,
  Plus,
  Trash2,
  Users,
  X,
  Inbox,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Star,
  Edit3,
  LogOut,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EventRow = {
  id: string;
  name: string;
  city: string;
  venue: string | null;
  event_date: string | null;
  capacity: number | null;
  theme: string | null;
  description: string | null;
  status: "upcoming" | "past" | string;
  is_featured: boolean;
  seats_note: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type ApplicationRow = {
  id: string;
  full_name: string;
  brand: string;
  designation: string;
  email: string;
  phone: string;
  website: string | null;
  linkedin: string | null;
  revenue: string;
  why: string;
  event_id: string | null;
  status: "new" | "shortlisted" | "invited" | "rejected" | string;
  admin_notes: string | null;
  created_at: string;
};

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [{ title: "Admin — GetIntoD2C" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"events" | "applications">("events");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      if (!cancelled) setEmail(userData.user.email ?? "");
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: userData.user.id,
        _role: "admin",
      });
      if (cancelled) return;
      if (error) {
        toast.error("Could not verify admin role");
        setIsAdmin(false);
        return;
      }
      setIsAdmin(Boolean(data));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (isAdmin === null) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f4f4f4] text-[#0a0a0a]">
        <p className="text-sm text-[#0a0a0a]/60">Loading…</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f4f4f4] px-6 text-[#0a0a0a]">
        <div className="max-w-md rounded-3xl border border-black/10 bg-white p-10 text-center">
          <h1 className="font-display text-3xl">Not an admin</h1>
          <p className="mt-3 text-sm text-[#0a0a0a]/65">
            Your account ({email}) does not have admin access. Ask an existing admin to grant it, or
            sign in with an admin account.
          </p>
          <button
            onClick={signOut}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.28em] text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f4f4] text-[#0a0a0a]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <a href="/" className="font-display text-lg leading-none text-[#0a0a0a]">
              GetIntoD2C
            </a>
            <span className="rounded-full border border-black/15 bg-[#f4f4f4] px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-[#0a0a0a]/60">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-[#0a0a0a]/60 sm:inline">{email}</span>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#0a0a0a]/70 hover:bg-[#f4f4f4]"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl gap-1 px-6">
          <TabButton active={tab === "events"} onClick={() => setTab("events")}>
            <Calendar className="h-4 w-4" /> Events
          </TabButton>
          <TabButton active={tab === "applications"} onClick={() => setTab("applications")}>
            <Inbox className="h-4 w-4" /> Applications
          </TabButton>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {tab === "events" ? <EventsPanel /> : <ApplicationsPanel />}
      </div>
      <Toaster theme="light" position="top-center" />
    </main>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm transition-colors ${
        active
          ? "border-[#e11d2a] text-[#0a0a0a]"
          : "border-transparent text-[#0a0a0a]/55 hover:text-[#0a0a0a]"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------------- events panel ---------------- */

const eventSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(160),
  city: z.string().trim().min(1, "City is required").max(80),
  venue: z.string().trim().max(160).optional().or(z.literal("")),
  event_date: z.string().max(40).optional().or(z.literal("")),
  capacity: z.union([z.string().length(0), z.coerce.number().int().min(1).max(10000)]).optional(),
  theme: z.string().trim().max(160).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  status: z.enum(["upcoming", "past"]),
  is_featured: z.boolean(),
  seats_note: z.string().trim().max(80).optional().or(z.literal("")),
  sort_order: z.coerce.number().int().min(0).max(9999),
});

type EventFormValues = z.infer<typeof eventSchema>;

function EventsPanel() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EventRow | null>(null);
  const [creating, setCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("event_date", { ascending: true, nullsFirst: false });
    if (error) {
      toast.error(error.message);
    } else {
      setEvents((data ?? []) as EventRow[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Event deleted");
    load();
  };

  return (
    <section>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl leading-tight md:text-4xl">
            Upcoming & past editions
          </h2>
          <p className="mt-2 text-sm text-[#0a0a0a]/65">
            The featured event is shown on the public page. Toggle the star to mark it.
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-3 text-xs font-medium uppercase tracking-[0.28em] text-white hover:bg-[#000]"
        >
          <Plus className="h-4 w-4" /> New event
        </button>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-dashed border-black/10 bg-white p-16 text-center text-sm text-[#0a0a0a]/50">
          Loading…
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-black/10 bg-white p-16 text-center">
          <p className="font-display text-2xl text-[#0a0a0a]">No events yet</p>
          <p className="mt-2 text-sm text-[#0a0a0a]/60">
            Add your first edition — it will appear on the /for-founders page.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {events.map((e) => (
            <div
              key={e.id}
              className="flex flex-col justify-between gap-4 rounded-3xl border border-black/10 bg-white p-6 md:flex-row md:items-center"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.32em]">
                  <span
                    className={`rounded-full px-2 py-0.5 ${
                      e.status === "upcoming"
                        ? "bg-[#e11d2a]/10 text-[#e11d2a]"
                        : "bg-[#0a0a0a]/10 text-[#0a0a0a]/70"
                    }`}
                  >
                    {e.status}
                  </span>
                  {e.is_featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#0a0a0a] px-2 py-0.5 text-white">
                      <Star className="h-3 w-3" /> Featured
                    </span>
                  )}
                  <span className="text-[#0a0a0a]/45">order {e.sort_order}</span>
                </div>
                <h3 className="mt-3 font-display text-xl text-[#0a0a0a] md:text-2xl">{e.name}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#0a0a0a]/65">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {e.city}
                    {e.venue ? ` · ${e.venue}` : ""}
                  </span>
                  {e.event_date && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {e.event_date}
                    </span>
                  )}
                  {e.capacity != null && (
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> {e.capacity}
                    </span>
                  )}
                </div>
                {e.theme && (
                  <div className="mt-2 text-sm text-[#0a0a0a]/70">
                    <em className="text-serif-italic text-[#e11d2a]">Theme:</em> {e.theme}
                  </div>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => setEditing(e)}
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#0a0a0a]/80 hover:bg-[#f4f4f4]"
                >
                  <Edit3 className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  onClick={() => remove(e.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#e11d2a]/30 bg-white px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#e11d2a] hover:bg-[#e11d2a]/5"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <EventFormDialog
        open={creating || editing !== null}
        onOpenChange={(open) => {
          if (!open) {
            setCreating(false);
            setEditing(null);
          }
        }}
        initial={editing}
        onSaved={() => {
          setCreating(false);
          setEditing(null);
          load();
        }}
      />
    </section>
  );
}

function EventFormDialog({
  open,
  onOpenChange,
  initial,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial: EventRow | null;
  onSaved: () => void;
}) {
  const [values, setValues] = useState<EventFormValues>(() => defaults(initial));
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setValues(defaults(initial));
  }, [initial, open]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = eventSchema.safeParse(values);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check the form");
      return;
    }
    setBusy(true);
    const payload = {
      name: parsed.data.name,
      city: parsed.data.city,
      venue: parsed.data.venue || null,
      event_date: parsed.data.event_date || null,
      capacity: typeof parsed.data.capacity === "number" ? parsed.data.capacity : null,
      theme: parsed.data.theme || null,
      description: parsed.data.description || null,
      status: parsed.data.status,
      is_featured: parsed.data.is_featured,
      seats_note: parsed.data.seats_note || null,
      sort_order: parsed.data.sort_order,
    };

    let error;
    if (initial) {
      ({ error } = await supabase.from("events").update(payload).eq("id", initial.id));
    } else {
      ({ error } = await supabase.from("events").insert(payload));
    }

    // If featured, unset featured on others
    if (!error && parsed.data.is_featured) {
      await supabase
        .from("events")
        .update({ is_featured: false })
        .neq("id", initial?.id ?? "00000000-0000-0000-0000-000000000000")
        .eq("is_featured", true);
    }

    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(initial ? "Event updated" : "Event created");
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {initial ? "Edit event" : "New event"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4 pt-2 sm:grid-cols-2">
          <FieldWrap label="Name" className="sm:col-span-2">
            <input
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              maxLength={160}
              className="input-adm"
            />
          </FieldWrap>
          <FieldWrap label="City">
            <input
              value={values.city}
              onChange={(e) => setValues({ ...values, city: e.target.value })}
              maxLength={80}
              className="input-adm"
            />
          </FieldWrap>
          <FieldWrap label="Venue">
            <input
              value={values.venue ?? ""}
              onChange={(e) => setValues({ ...values, venue: e.target.value })}
              maxLength={160}
              className="input-adm"
            />
          </FieldWrap>
          <FieldWrap label="Date (free text, e.g. 'March 12, 2026')">
            <input
              value={values.event_date ?? ""}
              onChange={(e) => setValues({ ...values, event_date: e.target.value })}
              maxLength={40}
              className="input-adm"
            />
          </FieldWrap>
          <FieldWrap label="Capacity">
            <input
              type="number"
              min={1}
              value={values.capacity ?? ""}
              onChange={(e) =>
                setValues({
                  ...values,
                  capacity: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
              className="input-adm"
            />
          </FieldWrap>
          <FieldWrap label="Theme" className="sm:col-span-2">
            <input
              value={values.theme ?? ""}
              onChange={(e) => setValues({ ...values, theme: e.target.value })}
              maxLength={160}
              className="input-adm"
            />
          </FieldWrap>
          <FieldWrap label="Description" className="sm:col-span-2">
            <textarea
              rows={4}
              value={values.description ?? ""}
              onChange={(e) => setValues({ ...values, description: e.target.value })}
              maxLength={2000}
              className="input-adm resize-none rounded-2xl"
            />
          </FieldWrap>
          <FieldWrap label="Status">
            <Select
              value={values.status}
              onValueChange={(v) => setValues({ ...values, status: v as "upcoming" | "past" })}
            >
              <SelectTrigger className="input-adm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="past">Past</SelectItem>
              </SelectContent>
            </Select>
          </FieldWrap>
          <FieldWrap label="Seats note (e.g. 'Limited Seats · 32 Founders')">
            <input
              value={values.seats_note ?? ""}
              onChange={(e) => setValues({ ...values, seats_note: e.target.value })}
              maxLength={80}
              className="input-adm"
            />
          </FieldWrap>
          <FieldWrap label="Sort order (lower = higher on page)">
            <input
              type="number"
              min={0}
              value={values.sort_order}
              onChange={(e) => setValues({ ...values, sort_order: Number(e.target.value) })}
              className="input-adm"
            />
          </FieldWrap>
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/10 bg-[#f4f4f4] px-4 py-3 text-sm sm:col-span-2">
            <input
              type="checkbox"
              checked={values.is_featured}
              onChange={(e) => setValues({ ...values, is_featured: e.target.checked })}
              className="h-4 w-4"
            />
            Feature this event on the public page (only one at a time)
          </label>

          <DialogFooter className="sm:col-span-2 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-full border border-black/15 px-5 py-2.5 text-xs uppercase tracking-[0.28em] text-[#0a0a0a]/70"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-5 py-2.5 text-xs uppercase tracking-[0.28em] text-white disabled:opacity-60"
            >
              {busy ? "Saving…" : initial ? "Save changes" : "Create event"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function defaults(initial: EventRow | null): EventFormValues {
  if (!initial)
    return {
      name: "",
      city: "",
      venue: "",
      event_date: "",
      capacity: "" as unknown as number,
      theme: "",
      description: "",
      status: "upcoming",
      is_featured: false,
      seats_note: "",
      sort_order: 0,
    };
  return {
    name: initial.name,
    city: initial.city,
    venue: initial.venue ?? "",
    event_date: initial.event_date ?? "",
    capacity: initial.capacity ?? ("" as unknown as number),
    theme: initial.theme ?? "",
    description: initial.description ?? "",
    status: (initial.status === "past" ? "past" : "upcoming") as "upcoming" | "past",
    is_featured: initial.is_featured,
    seats_note: initial.seats_note ?? "",
    sort_order: initial.sort_order,
  };
}

function FieldWrap({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-[11px] uppercase tracking-[0.28em] text-[#0a0a0a]/60">{label}</label>
      {children}
    </div>
  );
}

/* ---------------- applications panel ---------------- */

const STATUSES = ["new", "shortlisted", "invited", "rejected"] as const;

function ApplicationsPanel() {
  const [apps, setApps] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<(typeof STATUSES)[number] | "all">("all");
  const [selected, setSelected] = useState<ApplicationRow | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setApps((data ?? []) as ApplicationRow[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? apps : apps.filter((a) => a.status === filter)),
    [apps, filter],
  );

  const setStatus = async (id: string, status: (typeof STATUSES)[number]) => {
    const { error } = await supabase.from("applications").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Status updated");
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Application deleted");
    setSelected(null);
    load();
  };

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: apps.length };
    for (const s of STATUSES) map[s] = 0;
    for (const a of apps) map[a.status] = (map[a.status] ?? 0) + 1;
    return map;
  }, [apps]);

  return (
    <section>
      <div className="mb-6">
        <h2 className="font-display text-3xl leading-tight md:text-4xl">Applications</h2>
        <p className="mt-2 text-sm text-[#0a0a0a]/65">
          Every submission from the /for-founders page lands here.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {(["all", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em] transition-colors ${
              filter === s
                ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                : "border-black/15 bg-white text-[#0a0a0a]/70 hover:border-[#0a0a0a]"
            }`}
          >
            {s}
            <span
              className={`rounded-full px-1.5 text-[10px] ${
                filter === s ? "bg-white/15 text-white" : "bg-[#0a0a0a]/5 text-[#0a0a0a]/60"
              }`}
            >
              {counts[s] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="rounded-3xl border border-dashed border-black/10 bg-white p-16 text-center text-sm text-[#0a0a0a]/50">
          Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-black/10 bg-white p-16 text-center">
          <p className="font-display text-2xl text-[#0a0a0a]">Nothing here yet</p>
          <p className="mt-2 text-sm text-[#0a0a0a]/60">
            When founders apply, their submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f4f4f4] text-[10px] uppercase tracking-[0.28em] text-[#0a0a0a]/60">
              <tr>
                <th className="px-5 py-3">Founder</th>
                <th className="px-5 py-3">Brand</th>
                <th className="px-5 py-3">Revenue</th>
                <th className="px-5 py-3">Received</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-t border-black/5 hover:bg-[#f4f4f4]/60">
                  <td className="px-5 py-4">
                    <div className="font-medium">{a.full_name}</div>
                    <div className="text-xs text-[#0a0a0a]/55">{a.designation}</div>
                  </td>
                  <td className="px-5 py-4">{a.brand}</td>
                  <td className="px-5 py-4 text-[#0a0a0a]/70">{a.revenue}</td>
                  <td className="px-5 py-4 text-[#0a0a0a]/60">
                    {new Date(a.created_at).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={a.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelected(a)}
                      className="text-xs uppercase tracking-[0.28em] text-[#0a0a0a]/70 hover:text-[#0a0a0a]"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-[#0a0a0a]/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.aside
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white p-8"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.32em] text-[#e11d2a]">
                    Application
                  </div>
                  <h3 className="mt-2 font-display text-3xl leading-tight">{selected.full_name}</h3>
                  <p className="mt-1 text-sm text-[#0a0a0a]/60">
                    {selected.designation} · {selected.brand}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-black/15"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <dl className="grid gap-3 text-sm">
                <Detail
                  icon={Mail}
                  label="Email"
                  value={
                    <a href={`mailto:${selected.email}`} className="underline underline-offset-2">
                      {selected.email}
                    </a>
                  }
                />
                <Detail
                  icon={Phone}
                  label="Phone"
                  value={
                    <a href={`tel:${selected.phone}`} className="underline underline-offset-2">
                      {selected.phone}
                    </a>
                  }
                />
                {selected.website && (
                  <Detail
                    icon={Globe}
                    label="Website"
                    value={
                      <a
                        href={
                          selected.website.startsWith("http")
                            ? selected.website
                            : `https://${selected.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        {selected.website}
                      </a>
                    }
                  />
                )}
                {selected.linkedin && (
                  <Detail
                    icon={Linkedin}
                    label="LinkedIn"
                    value={
                      <a
                        href={
                          selected.linkedin.startsWith("http")
                            ? selected.linkedin
                            : `https://${selected.linkedin}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        {selected.linkedin}
                      </a>
                    }
                  />
                )}
                <Detail icon={Users} label="Monthly revenue" value={selected.revenue} />
              </dl>

              <div className="mt-6 rounded-2xl border border-black/10 bg-[#f4f4f4] p-5">
                <div className="text-[10px] uppercase tracking-[0.32em] text-[#0a0a0a]/60">
                  Why they want to attend
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#0a0a0a]/80">
                  {selected.why}
                </p>
              </div>

              <div className="mt-6">
                <div className="mb-2 text-[10px] uppercase tracking-[0.32em] text-[#0a0a0a]/60">
                  Status
                </div>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(selected.id, s)}
                      className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em] transition-colors ${
                        selected.status === s
                          ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                          : "border-black/15 bg-white text-[#0a0a0a]/70 hover:border-[#0a0a0a]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#0a0a0a]/45">
                  Received{" "}
                  {new Date(selected.created_at).toLocaleString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
                <button
                  onClick={() => remove(selected.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#e11d2a]/30 bg-white px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#e11d2a] hover:bg-[#e11d2a]/5"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#0a0a0a]/50" />
      <div className="min-w-0 flex-1">
        <dt className="text-[10px] uppercase tracking-[0.28em] text-[#0a0a0a]/55">{label}</dt>
        <dd className="mt-0.5 break-words text-sm text-[#0a0a0a]">{value}</dd>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-[#e11d2a]/10 text-[#e11d2a]",
    shortlisted: "bg-amber-500/15 text-amber-700",
    invited: "bg-emerald-500/15 text-emerald-700",
    rejected: "bg-[#0a0a0a]/8 text-[#0a0a0a]/55",
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.28em] ${
        styles[status] ?? "bg-[#0a0a0a]/10 text-[#0a0a0a]/60"
      }`}
    >
      {status}
    </span>
  );
}
