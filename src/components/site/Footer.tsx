import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="relative border-t border-black/50 bg-[#ffffff]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <BrandLogo className="h-12 w-auto md:h-[3.25rem]" />
            <p className="mt-4 text-[11px] uppercase tracking-[0.32em] text-[#e11d2a]">
              A Unit of Parlexa · Parent Co. Est. 2013
            </p>
            <p className="text-serif-italic mt-6 max-w-sm text-2xl leading-snug text-[#0a0a0a]/80">
              The growth studio and founder community for consumer brands.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#0a0a0a]/70">
            <a href="/" className="hover:text-[#0a0a0a]">Home</a>
            <a href="/about" className="hover:text-[#0a0a0a]">About</a>
            <a href="/services" className="hover:text-[#0a0a0a]">Services</a>
            <a href="/categories" className="hover:text-[#0a0a0a]">Categories</a>
            <a href="/case-studies" className="hover:text-[#0a0a0a]">Case Studies</a>
            <a href="/resources" className="hover:text-[#0a0a0a]">Resources</a>
            <a href="/webinars" className="hover:text-[#0a0a0a]">Webinars</a>
            <a href="/blog" className="hover:text-[#0a0a0a]">Journal</a>
            <a href="/for-founders" className="hover:text-[#0a0a0a]">Community</a>
            <a href="/privacy-policy" className="hover:text-[#0a0a0a]">Privacy</a>
            <a href="/terms" className="hover:text-[#0a0a0a]">Terms</a>
            <a href="/#book" className="hover:text-[#0a0a0a]">Contact</a>
          </nav>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-black/40 pt-8 text-[11px] uppercase tracking-[0.3em] text-[#0a0a0a]/50 md:flex-row md:items-center">
          <div>© 2026 GetIntoD2C. A Unit of Parlexa.</div>
          <div>Made with care, in India.</div>
        </div>
      </div>
    </footer>
  );
}
