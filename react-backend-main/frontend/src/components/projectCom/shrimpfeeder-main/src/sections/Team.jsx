import { motion } from "framer-motion";
import { Stagger } from "../components/motion.jsx";
import SectionHead from "../components/SectionHead.jsx";
import { LinkedInIcon, MailIcon } from "../components/icons.jsx";
import { team, contact } from "../data.js";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } },
};

export default function Team() {
  return (
    <section id="team" className="section on-dark bg-steel text-on-dark">
      <div className="wrap">
        <SectionHead
          eyebrow="The people behind it"
          title="A team of engineers building for the pond."
          lead="Mechanical design, aquaculture and sustainability — brought together to make precision feeding practical on a working farm."
        />

        <Stagger className="mt-[clamp(44px,6vh,80px)] grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <motion.article
              key={m.name}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="group flex flex-col overflow-hidden rounded-lg border border-[var(--hair-dark)] bg-steel-soft transition-shadow duration-500 hover:border-[rgba(210,162,76,0.5)] hover:shadow-[0_30px_60px_-34px_rgba(0,0,0,0.7),0_0_0_1px_rgba(210,162,76,0.12)]"
            >
              <div className="relative aspect-square overflow-hidden bg-[#0c1115]">
                <img
                  src={m.photo}
                  alt={`Portrait of ${m.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[50%_24%] saturate-[0.94] transition-[transform,filter] duration-[1100ms] ease-smooth group-hover:scale-105 group-hover:saturate-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(22,34,43,0.55)] to-transparent to-[42%]" />
              </div>
              <div className="flex flex-1 flex-col gap-[7px] px-5 py-[22px]">
                {m.badge && (
                  <span className="mono mb-1 inline-flex items-center gap-[7px] self-start rounded-full border border-[rgba(210,162,76,0.4)] px-[10px] py-1 text-[9.5px] uppercase tracking-[0.18em] text-accent">
                    {m.badge}
                  </span>
                )}
                <h3 className="text-[20px] font-semibold leading-[1.15] tracking-[-0.01em] text-on-dark">
                  {m.name}
                </h3>
                <div className="mono text-[10.5px] uppercase tracking-[0.16em] text-accent">
                  {m.role}
                </div>
                <p className="flex-1 text-[13.5px] leading-[1.55] text-on-dark-mut">
                  {m.bio}
                </p>
                <div className="mt-[14px] flex gap-[10px] border-t border-[var(--hair-dark)] pt-4">
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${m.name} on LinkedIn`}
                    className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[var(--hair-dark)] text-on-dark-mut transition-all duration-300 hover:-translate-y-[3px] hover:border-accent hover:bg-accent hover:text-ink [&_svg]:h-4 [&_svg]:w-4"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    aria-label={`Email ${m.name}`}
                    className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[var(--hair-dark)] text-on-dark-mut transition-all duration-300 hover:-translate-y-[3px] hover:border-accent hover:bg-accent hover:text-ink [&_svg]:h-4 [&_svg]:w-4"
                  >
                    <MailIcon />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
