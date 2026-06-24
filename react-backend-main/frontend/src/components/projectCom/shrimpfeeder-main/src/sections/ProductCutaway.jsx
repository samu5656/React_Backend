import { Reveal, Stagger, StaggerItem } from "../components/motion.jsx";
import SectionHead from "../components/SectionHead.jsx";
import Tilt from "../components/Tilt.jsx";
import { cutawayAnnotations } from "../data.js";

export default function ProductCutaway() {
  return (
    <section id="product" className="section bg-paper-2">
      <div className="wrap">
        <SectionHead
          eyebrow="Inside the machine"
          title="An advanced aquaculture feeder with precise, uniform distribution."
          lead="Every subsystem is built around one goal: deliver the exact ration, evenly, every cycle — without clogging, spoilage, or waste."
        />

        <div className="mt-[clamp(48px,7vh,90px)] grid grid-cols-1 items-center gap-[clamp(34px,5vw,72px)] lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <Tilt
              max={8}
              className="relative overflow-hidden rounded-[var(--r)] border border-[var(--hair-light)] bg-gradient-to-br from-white to-paper-2 p-[18px] shadow-soft"
            >
              <span className="mono absolute left-[26px] top-[26px] z-[2] rounded-[2px] border border-[var(--hair-light)] bg-[rgba(246,245,242,0.82)] px-[11px] py-[6px] text-[10px] uppercase tracking-[0.2em] text-on-light-mut backdrop-blur-[4px]">
                Cutaway · Model 500
              </span>
              <img
                src="/assets/03-cutaway.jpeg"
                alt="Labelled cutaway render of the Model 500 feeder showing storage tank, motor, conveyor, rotary distributor and broadcaster nozzle"
                loading="lazy"
                decoding="async"
                className="w-full rounded-[2px]"
              />
            </Tilt>
          </Reveal>

          <Stagger as="ul" className="flex flex-col">
            {cutawayAnnotations.map((a, i) => (
              <StaggerItem
                as="li"
                key={a.idx}
                className={`grid grid-cols-[auto_1fr] gap-[18px] border-t border-[var(--hair-light)] py-5 ${
                  i === cutawayAnnotations.length - 1
                    ? "border-b border-[var(--hair-light)]"
                    : ""
                }`}
              >
                <span className="mono pt-[3px] text-[12px] text-accent-ink">
                  {a.idx}
                </span>
                <div>
                  <h3 className="text-[18px] font-semibold leading-[1.2] tracking-[-0.01em]">
                    {a.title}
                  </h3>
                  <p className="mt-[5px] max-w-[42ch] text-[14.5px] text-on-light-mut">
                    {a.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
