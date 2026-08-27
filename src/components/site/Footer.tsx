import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="relative border-t border-black/50 bg-[#ffffff]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <BrandLogo className="h-12 w-auto md:h-[3.25rem]" />
            <p className="mt-4 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
              A Unit of Parlexa, Est. 2013
            </p>
            <p className="text-serif-italic mt-6 max-w-sm text-2xl leading-snug text-[#0a0a0a]/80">
              The studio for the next generation of consumer icons.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#0a0a0a]/70">
            <a href="#top" className="hover:text-[#0a0a0a]">
              Home
            </a>
            <a href="#industries" className="hover:text-[#0a0a0a]">
              Studio
            </a>
            <a href="#services" className="hover:text-[#0a0a0a]">
              Services
            </a>
            <a href="#process" className="hover:text-[#0a0a0a]">
              Process
            </a>
            <a href="#faq" className="hover:text-[#0a0a0a]">
              FAQs
            </a>
            <a href="#book" className="hover:text-[#0a0a0a]">
              Contact
            </a>
          </nav>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-black/40 pt-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-2 text-[11px] uppercase tracking-[0.3em] text-[#0a0a0a]/50">
            <div>© 2025 GetIntoD2C</div>
            <div>Made with care, in India.</div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#0a0a0a]/60">
              Official Partners:
            </span>
            <div className="flex items-center gap-2">
              <div className="rounded-xl border border-black/10 bg-white px-2 py-1 shadow-sm">
                <img
                  src="/cashfree-certified-partner.png"
                  alt="Cashfree Payments Certified Partner"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <div className="rounded-xl border border-black/10 bg-white px-2 py-1 shadow-sm">
                <img
                  src="/meta-partner-logo.png"
                  alt="Meta Partner"
                  className="h-5 w-auto object-contain"
                />
              </div>
              <div className="rounded-xl border border-black/10 bg-white px-2 py-1 shadow-sm">
                <img
                  src="/razorpay-partner-logo.png"
                  alt="Razorpay Partner"
                  className="h-4 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
