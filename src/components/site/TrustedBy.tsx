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

export function TrustedBy() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section className="relative border-y border-black/40 bg-[#ffffff] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
          Founders and brands we have built with
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
    </section>
  );
}
