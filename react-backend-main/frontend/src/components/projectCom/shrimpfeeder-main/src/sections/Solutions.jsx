import { motion } from "framer-motion";
import { Stagger } from "../components/motion.jsx";
import SectionHead from "../components/SectionHead.jsx";
import { Arrow } from "../components/icons.jsx";
import { solutions } from "../data.js";

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } },
};

export default function Solutions() {
  return (
    <section id="solutions" className="section">
      <div className="wrap">
        <SectionHead eyebrow="Where it works" title="One feeder, many operations." />

        <Stagger className="mt-[clamp(44px,6vh,80px)] grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => (
            <motion.article
              key={s.title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group flex flex-col overflow-hidden rounded-[var(--r)] border border-[var(--hair-light)] bg-white shadow-none transition-shadow duration-500 hover:shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1000ms] ease-smooth group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-[9px] px-[22px] pb-[26px] pt-6">
                <div className="mono text-[10px] uppercase tracking-[0.2em] text-accent-ink">
                  {s.k}
                </div>
                <h3 className="text-[21px] font-semibold tracking-[-0.01em]">
                  {s.title}
                </h3>
                <p className="flex-1 text-[14px] text-on-light-mut">{s.body}</p>
                <a className="textlink mt-2 text-on-light" href="#contact">
                  Learn more <Arrow />
                </a>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
