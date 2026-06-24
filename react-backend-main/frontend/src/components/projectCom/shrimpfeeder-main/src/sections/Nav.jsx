import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Arrow } from "../components/icons.jsx";
import { navLinks } from "../data.js";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-[var(--hair-dark)] bg-[rgba(14,20,23,0.86)] backdrop-blur-[14px] backdrop-saturate-150"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-[var(--gut)] py-[18px]">
        {/* logo */}
        <a
          href="#top"
          aria-label="ShrimpFeeder — home"
          className="group inline-flex items-center text-on-dark"
        >
          <b className="text-[19px] font-semibold tracking-[0.01em] transition-colors duration-[400ms] group-hover:text-accent">
            ShrimpFeeder
          </b>
        </a>

        {/* desktop links */}
        <nav className="hidden items-center gap-[30px] lg:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[14px] tracking-[0.02em] text-on-dark-mut transition-colors duration-300 hover:text-on-dark"
            >
              {l.label}
              <span className="absolute -bottom-[6px] left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[400ms] ease-smooth group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn--ghost-dark hidden lg:inline-flex">
          Get in Touch <Arrow />
        </a>

        {/* burger */}
        <button
          className="flex h-[42px] w-[42px] flex-col items-center justify-center gap-1 rounded-[var(--r)] border border-[rgba(234,237,239,0.3)] lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-[1.5px] w-[17px] bg-on-dark transition-all duration-300 ${open ? "translate-y-[5.5px] rotate-45" : ""}`} />
          <span className={`h-[1.5px] w-[17px] bg-on-dark transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`h-[1.5px] w-[17px] bg-on-dark transition-all duration-300 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden border-b border-[var(--hair-dark)] bg-[rgba(14,20,23,0.97)] backdrop-blur-[14px] lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col items-start gap-[22px] px-[var(--gut)] pb-9 pt-7">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[18px] text-on-dark-mut transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn btn--ghost-dark mt-2">
                Get in Touch <Arrow />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
