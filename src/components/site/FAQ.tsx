"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Who is this studio for?",
    a: "Founders and operators building D2C brands who want senior-level thinking on positioning, growth, and retention. If you're between ₹50L and ₹100Cr ARR, or serious about getting there, we are built for you.",
  },
  {
    q: "What's the difference between a Brand Audit and the 3-Month Partnership?",
    a: "The Brand Audit is a focused, one-time diagnostic. We surface the biggest gaps and hand you a prioritized action plan. The 3-Month Partnership is an ongoing engagement, with weekly 1:1s, reviews, and hands-on coaching as you implement.",
  },
  {
    q: "Do you include execution, or just strategy?",
    a: "Our partnership is strategy, decisions, and accountability. If you need done-for-you campaigns, creative, or CRO builds, we offer those separately as À La Carte services from the studio.",
  },
  {
    q: "How do I get started?",
    a: "Fill out the brief below. We'll send a top-level audit before we meet, then book a 1:1 call to walk through it and decide the right next step together.",
  },
  {
    q: "Do I need an existing brand to join?",
    a: "No. We work with pre-launch founders on positioning and GTM, and with revenue-stage brands on scale. What matters is intent and the willingness to move with care.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-gradient-warm relative py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-6 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
          Questions
        </div>
        <h2 className="mb-14 font-display text-4xl leading-[1.02] tracking-tight text-[#0a0a0a] md:text-6xl">
          Frequently asked, <span className="text-serif-italic">answered.</span>
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-black/50 bg-[#ffffff] px-6 transition-colors data-[state=open]:bg-[#ffffff] data-[state=open]:shadow-[0_10px_30px_-20px_rgba(0,0,0,0.15)]"
            >
              <AccordionTrigger className="py-6 text-left font-display text-lg text-[#0a0a0a] hover:no-underline md:text-xl">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-[#0a0a0a]/75">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
