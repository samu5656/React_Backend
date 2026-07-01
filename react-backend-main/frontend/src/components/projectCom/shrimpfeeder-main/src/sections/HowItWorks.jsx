import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "../components/motion.jsx";
import SectionHead from "../components/SectionHead.jsx";
import { Spark } from "../components/icons.jsx";
import { steps } from "../data.js";

export default function HowItWorks() {
  return (
    <section id="how" className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="Optimizing pond feeding"
          title="From pontoon to pond, in four steps."
          lead="Built to deploy on any pond and run hands-off — load it, schedule it from your phone, and let it feed on water-quality cues."
        />

        <Stagger className="mt-[clamp(44px,6vh,80px)] grid grid-cols-1 gap-px overflow-hidden rounded-[var(--r)] border border-[var(--hair-light)] bg-[var(--hair-light)] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <StaggerItem
              key={s.n}
              className="group flex min-h-[270px] flex-col gap-4 bg-paper p-[clamp(24px,2.4vw,32px)] transition-colors duration-500 hover:bg-white"
            >
              <span className="mono inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border border-accent text-[15px] text-accent-ink transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                {s.n}
              </span>
              <h3 className="mt-[6px] text-[19px] font-semibold tracking-[-0.01em]">
                {s.title}
              </h3>
              <p className="text-[14.5px] text-on-light-mut">{s.body}</p>
              <div className="mt-auto flex flex-wrap gap-[7px]">
                {s.chips.map((c) => (
                  <span
                    key={c}
                    className="mono rounded-[2px] border border-[var(--hair-light)] px-[9px] py-[5px] text-[10px] uppercase tracking-[0.12em] text-on-light-mut"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <motion.span
            whileHover={{ scale: 1.02 }}
            className="mt-[30px] inline-flex items-center gap-[14px] rounded-full border border-accent bg-[var(--accent-soft)] px-[22px] py-4"
          >
            <Spark className="h-[18px] w-[18px] animate-spin-slow" />
            <b className="text-[14px] font-semibold tracking-[0.02em]">
              Easy-Clean Mechanism
            </b>
            <span className="text-[13.5px] text-on-light-mut">
              Tool-free access to the conveyor and distributor for a fast rinse
              between cycles.
            </span>
          </motion.span>
        </Reveal>
      </div>
    </section>
  );
}
