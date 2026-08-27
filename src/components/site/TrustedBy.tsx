"use client";

const LOGOS = [
  "Aircall",
  "ASF",
  "Eicher Motors",
  "Ericsson",
  "Lenovo",
  "Oppo",
  "Philips",
  "Tata Teleservices",
  "Unacademy",
  "Plan Your Legacy",
  "BakedBuzz",
  "Crex",
  "Modicare",
  "Nive Media",
  "GoWhipped",
];

const PARTNERS = [
  {
    name: "Cashfree Payments",
    role: "Certified Payments Partner",
    badge: "/cashfree-certified-partner.png",
    tag: "Certified Partner",
    description:
      "Direct collaboration for preferred gateway rates, seamless 1-click checkout, automated COD verification, and instant refunds.",
  },
  {
    name: "Meta",
    role: "Growth & Performance Ads",
    badge: "/meta-partner-logo.png",
    tag: "Growth Ecosystem",
    description:
      "Scalable ad frameworks, precision Conversions API (CAPI) setups, and high-ROAS creative testing systems for D2C scaling.",
  },
  {
    name: "Razorpay",
    role: "Payments & Subscriptions",
    badge: "/razorpay-partner-logo.png",
    tag: "Checkout & Gateway",
    description:
      "Direct integration with Magic Checkout, international payments, and recurring subscription billing infrastructure.",
  },
];

export function TrustedBy() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section className="relative border-y border-black/40 bg-[#ffffff] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
          Build with the team that has worked on brands like
        </div>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-14 px-8">
          {doubled.map((name, i) => (
            <div key={i} className="flex h-14 shrink-0 items-center px-4">
              <span className="font-display text-2xl text-[#0a0a0a]/50 transition-colors duration-300 hover:text-[#0a0a0a] md:text-3xl">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Official Ecosystem & Technology Partners */}
      <div className="mx-auto mt-16 max-w-6xl px-6">
        <div className="mb-8 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e11d2a]">
            Our Official Ecosystem & Technology Partners
          </span>
          <h3 className="mt-2 font-display text-2xl text-[#0a0a0a] sm:text-3xl">
            Backed by the best in D2C infrastructure.
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-[#0a0a0a]/65">
            We partner directly with leading platforms to unlock exclusive processing rates, direct
            API integrations, and enterprise-grade tools for every brand we build.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="group flex flex-col justify-between rounded-3xl border border-black/10 bg-[#fafafa] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#e11d2a]/30 hover:bg-white hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]"
            >
              <div>
                <div className="flex h-20 items-center justify-center rounded-2xl border border-black/5 bg-white p-3 shadow-sm transition group-hover:border-black/10">
                  <img
                    src={partner.badge}
                    alt={partner.name}
                    className="max-h-12 w-auto max-w-full object-contain"
                  />
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="rounded-full bg-[#e11d2a]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#e11d2a]">
                    {partner.tag}
                  </span>
                </div>

                <h4 className="mt-3 font-display text-lg text-[#0a0a0a]">{partner.name}</h4>
                <p className="text-xs font-medium text-[#0a0a0a]/60">{partner.role}</p>

                <p className="mt-3 text-xs leading-relaxed text-[#0a0a0a]/70">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
