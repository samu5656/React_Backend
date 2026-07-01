import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Spark } from "../components/icons.jsx";
import { contact } from "../data.js";

const cols = [
  {
    h: "Product",
    links: [
      { href: "#product", label: "Cutaway" },
      { href: "#engineering", label: "Technology" },
      { href: "#specs", label: "Specs" },
      { href: "#how", label: "How it works" },
    ],
  },
  {
    h: "Solutions",
    links: [
      { href: "#solutions", label: "Shrimp ponds" },
      { href: "#solutions", label: "Fish aquaculture" },
      { href: "#solutions", label: "Multi-pond farms" },
      { href: "#solutions", label: "Hatcheries" },
    ],
  },
  {
    h: "Contact",
    links: [
      { href: `mailto:${contact.email}`, label: contact.email },
      { href: contact.phoneHref, label: contact.phone },
      { href: "#contact", label: "Get in touch" },
    ],
  },
];

export default function Footer() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-4%", "2%"]);

  return (
    <footer
      ref={ref}
      className="border-t border-[var(--hair-dark)] bg-ink-2 pb-9 pt-[clamp(60px,8vh,100px)] text-on-dark"
    >
      <div className="wrap">
        <motion.div
          style={reduce ? undefined : { x }}
          className="text-[clamp(38px,8vw,118px)] font-[200] leading-[0.96] tracking-[-0.04em] text-[rgba(234,237,239,0.1)]"
        >
          Precision aquaculture feeding.
        </motion.div>

        <div className="mt-[clamp(48px,7vh,86px)] grid grid-cols-2 gap-x-8 gap-y-10 border-t border-[var(--hair-dark)] pt-11 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <a
              href="#top"
              className="group inline-flex items-center text-on-dark"
            >
              <b className="text-[19px] font-semibold tracking-[0.01em] transition-colors hover:text-accent">
                ShrimpFeeder
              </b>
            </a>
            <p className="mt-4 max-w-[34ch] text-[14px] text-on-dark-mut">
              Engineered hardware for calibrated, even, waste-free feeding on the
              modern aquaculture farm.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.h}>
              <h4 className="mono mb-[18px] text-[11px] font-bold uppercase tracking-[0.2em] text-on-dark-mut">
                {c.h}
              </h4>
              <ul className="flex flex-col gap-[11px]">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14.5px] text-on-dark opacity-[0.82] transition-[opacity,color] hover:text-accent hover:opacity-100"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-[50px] flex flex-wrap items-center justify-between gap-4 border-t border-[var(--hair-dark)] pt-[26px] text-[12.5px] text-on-dark-mut">
          <span>© 2026 Feeder Systems. All rights reserved.</span>
          <div className="flex flex-wrap gap-[22px]">
            <a href="#" className="hover:text-accent">Privacy</a>
            <a href="#" className="hover:text-accent">Terms</a>
          </div>
          <span className="inline-flex items-center gap-2">
            Designed with <Spark className="h-3 w-3" /> precision
          </span>
        </div>
      </div>
    </footer>
  );
}
