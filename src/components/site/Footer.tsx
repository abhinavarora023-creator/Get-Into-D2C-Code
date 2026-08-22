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
            <a href="#top" className="hover:text-[#0a0a0a]">Home</a>
            <a href="#industries" className="hover:text-[#0a0a0a]">Studio</a>
            <a href="#services" className="hover:text-[#0a0a0a]">Services</a>
            <a href="#process" className="hover:text-[#0a0a0a]">Process</a>
            <a href="#faq" className="hover:text-[#0a0a0a]">FAQs</a>
            <a href="#book" className="hover:text-[#0a0a0a]">Contact</a>
          </nav>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-black/40 pt-8 text-[11px] uppercase tracking-[0.3em] text-[#0a0a0a]/50 md:flex-row md:items-center">
          <div>© 2025 GetIntoD2C</div>
          <div>Made with care, in India.</div>
        </div>
      </div>
    </footer>
  );
}
