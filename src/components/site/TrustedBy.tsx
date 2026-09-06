"use client";

const D2C_BRANDS = [
  "GoWhipped",
  "BakedBuzz",
  "Benny's Bowl",
  "Plan Your Legacy",
  "Nitara",
];

const ENTERPRISE_HERITAGE = [
  "Lenovo",
  "Tata Teleservices",
  "Philips",
  "Eicher Motors",
  "Ericsson",
  "Oppo",
  "Aircall",
  "Unacademy",
  "Trakin Tech",
  "Imarticus",
  "Crex",
  "Modicare",
  "Nive Media",
];

export function TrustedBy() {
  const doubledD2C = [...D2C_BRANDS, ...D2C_BRANDS, ...D2C_BRANDS];
  const doubledEnterprise = [...ENTERPRISE_HERITAGE, ...ENTERPRISE_HERITAGE];

  return (
    <section className="relative border-y border-black/20 bg-[#ffffff] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-4 text-center text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
          Verified Proof &amp; Track Record
        </div>
        <h2 className="text-center font-display text-2xl text-[#0a0a0a] sm:text-3xl">
          Consumer brands we partner with, backed by a decade of enterprise pedigree.
        </h2>
      </div>

      {/* Row 1: Consumer & D2C Brands */}
      <div className="mt-10">
        <div className="mb-3 text-center text-[10px] font-mono uppercase tracking-[0.25em] text-[#0a0a0a]/60">
          — Consumer &amp; D2C Brands —
        </div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-14 px-8">
            {doubledD2C.map((name, i) => (
              <div key={i} className="flex h-12 shrink-0 items-center px-4">
                <span className="font-display text-2xl font-medium text-[#0a0a0a] md:text-3xl">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Enterprise & Growth Engagements (Parlexa Heritage) */}
      <div className="mt-8 pt-6 border-t border-black/10">
        <div className="mb-3 text-center text-[10px] font-mono uppercase tracking-[0.25em] text-[#0a0a0a]/50">
          — Enterprise &amp; Growth Projects (Parlexa Heritage) —
        </div>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee-reverse gap-12 px-8">
            {doubledEnterprise.map((name, i) => (
              <div key={i} className="flex h-10 shrink-0 items-center px-3">
                <span className="font-display text-lg text-[#0a0a0a]/50 transition-colors duration-300 hover:text-[#0a0a0a] md:text-xl">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
