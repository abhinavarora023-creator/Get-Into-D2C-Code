"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What is GetIntoD2C and who is it for?",
    a: "GetIntoD2C is an India-focused D2C growth studio and founder community for consumer brands. We serve early-stage and scaling consumer founders across FMCG, skincare, snacking, supplements, beverages, and fashion accessories who want senior-level thinking on positioning, GTM, unit economics, and compounding retention.",
  },
  {
    q: "What is the difference between the Growth Studio and the Founder Community?",
    a: "The Growth Studio is our advisory and launchpad arm that works directly with brands on diagnostics, positioning, launch strategy, and margin optimization. The Founder Community is our curated, invitation-only WhatsApp network where operators share unfiltered playbooks and attend private founder dinners.",
  },
  {
    q: "What services does GetIntoD2C offer?",
    a: "We offer six core modular capabilities: D2C Brand Audit, Positioning & Identity, Growth Engine (Performance Marketing), GTM Strategy, CRO & Funnel Optimization, and Customer Retention Systems. We also provide end-to-end brand launch advisory.",
  },
  {
    q: "Which consumer categories do you specialize in?",
    a: "We specialize in six consumer product verticals calibrated for Indian market dynamics: Skincare & Personal Care, FMCG, Healthy Snacking, Health Supplements & Nutraceuticals, Beverages, and Fashion Accessories.",
  },
  {
    q: "What is the relationship between GetIntoD2C and Parlexa?",
    a: "GetIntoD2C is a specialized unit of Parlexa, an established digital transformation and growth consultancy founded in 2013. GetIntoD2C combines Parlexa's decade-plus institutional background with dedicated focus on consumer brand building.",
  },
  {
    q: "How do we get started with GetIntoD2C?",
    a: "Submit the brief at the bottom of this page or schedule a discovery slot. We evaluate your category, current stage, and unit economics before booking a 1:1 diagnostic call to align on the right roadmap.",
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
