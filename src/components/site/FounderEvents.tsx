import { motion } from "framer-motion";
import { openCommunityApplyDialog } from "./ApplyDialog";

const EVENTS = [
  {
    title: "Founders' Table, Bengaluru",
    date: "Coming Soon",
    desc: "An intimate dinner for eight D2C founders. Off the record conversations on category, capital, and craft.",
    tag: "Dinner",
  },
  {
    title: "Shelf Studio, Mumbai",
    date: "Coming Soon",
    desc: "A working session on packaging, positioning, and pricing with our studio leads and a guest retailer.",
    tag: "Workshop",
  },
  {
    title: "Launchpad Live, Delhi",
    date: "Coming Soon",
    desc: "A closed door showcase of six brands going live this quarter. Investors, buyers, and press only.",
    tag: "Showcase",
  },
];

export function FounderEvents() {
  return (
    <section id="events" className="bg-gradient-rose-glow relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute -top-32 -right-32 h-[450px] w-[450px] rounded-full bg-[#e11d2a]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-[#0a0a0a]/5 blur-[100px]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
              Founder Events
            </div>
            <h2 className="font-display text-4xl leading-[1.02] tracking-tight text-[#0a0a0a] md:text-6xl lg:text-7xl">
              Rooms built for <span className="text-serif-italic">founders</span>.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#0a0a0a]/70 md:text-lg">
            Small, deliberate gatherings where operators trade notes with the studio and the people
            building the next shelf.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {EVENTS.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-black/10 bg-[#ffffff] p-8 transition-colors hover:border-[#e11d2a]/40 md:p-10"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-[#0a0a0a]/50">
                  <span>{e.tag}</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#e11d2a]/40 bg-[#e11d2a]/5 px-3 py-1 text-[#e11d2a]">
                    <span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-[#e11d2a]" />
                    {e.date}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl leading-tight text-[#0a0a0a] md:text-3xl">
                  {e.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#0a0a0a]/70 md:text-base">
                  {e.desc}
                </p>
              </div>
              <div className="mt-10 border-t border-black/10 pt-5 text-[11px] uppercase tracking-[0.32em] text-[#0a0a0a]/50">
                Invitations open soon
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-[2rem] border border-black/10 bg-[#f4f4f4] p-8 md:flex-row md:items-center md:p-10">
          <p className="max-w-xl text-base leading-relaxed text-[#0a0a0a]/80 md:text-lg">
            Want first dibs when a city and date go live? Leave your email and we will send an
            invite before the room fills.
          </p>
          <button
            type="button"
            onClick={() => openCommunityApplyDialog()}
            className="inline-flex items-center gap-2 rounded-full bg-[#e11d2a] px-6 py-3 text-sm font-medium text-[#ffffff] transition-colors hover:bg-[#0a0a0a]"
          >
            Join the Founders' Community
          </button>
        </div>
      </div>
    </section>
  );
}
