import { Stagger, StaggerItem } from "../components/motion.jsx";
import SectionHead from "../components/SectionHead.jsx";
import { gallery } from "../data.js";

export default function FieldGallery() {
  return (
    <section id="field" className="section on-dark bg-ink text-on-dark">
      <div className="wrap">
        <SectionHead
          eyebrow="In the field"
          title="Proven on the water. Proven in the harvest."
        />

        <Stagger className="mt-[clamp(44px,6vh,80px)] grid auto-rows-fr grid-cols-1 gap-[14px] md:grid-cols-[2fr_1fr]">
          {gallery.map((g) => (
            <StaggerItem
              as="figure"
              key={g.src + g.k}
              className={`group relative min-h-[280px] overflow-hidden rounded-[var(--r)] ${
                g.tall ? "md:row-span-2" : ""
              }`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-smooth group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,20,23,0.82)] to-transparent to-[55%]" />
              <figcaption className="absolute inset-x-[22px] bottom-5 z-[2] text-on-dark">
                <div className="mono text-[10px] uppercase tracking-[0.2em] text-accent-br">
                  {g.k}
                </div>
                <div className="mt-[6px] text-[clamp(17px,1.7vw,21px)] font-normal tracking-[-0.01em]">
                  {g.t}
                </div>
              </figcaption>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
