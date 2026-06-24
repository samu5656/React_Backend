import { Reveal, Stagger, StaggerItem } from "../components/motion.jsx";
import SectionHead from "../components/SectionHead.jsx";
import Tilt from "../components/Tilt.jsx";
import { engineeringSpecs } from "../data.js";

export default function Engineering() {
  return (
    <section id="engineering" className="section on-dark bg-ink text-on-dark">
      <div className="wrap">
        <SectionHead
          eyebrow="Intelligent systems · under the hood"
          title="Separated dual-motor architecture. Nothing left to chance."
          lead="Drive and distribution run on independent motors, so conveyor metering and broadcast spin never fight each other — precision at both ends of the feed path."
        />

        <div className="mt-[clamp(44px,6vh,80px)] grid grid-cols-1 items-center gap-[clamp(34px,5vw,72px)] lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <Tilt max={5} className="relative">
              <div
                className="absolute -inset-x-[10%] -inset-y-[6%] z-0 animate-glow"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 60%, rgba(63,169,201,0.16), transparent 62%)",
                }}
              />
              <img
                src="/assets/05-exploded.jpeg"
                alt="Dark exploded engineering render of the feeder showing its separated dual-motor system, conveyor, rotary distributor and controller"
                loading="lazy"
                decoding="async"
                className="relative z-[1] mx-auto w-auto animate-float lg:max-h-[78vh]"
              />
            </Tilt>
          </Reveal>

          <Stagger className="grid gap-[2px]">
            {engineeringSpecs.map((s, i) => (
              <StaggerItem
                key={s.no}
                className={`grid grid-cols-[auto_1fr] items-start gap-5 border-b border-[var(--hair-dark)] py-[22px] ${
                  i === 0 ? "border-t border-[var(--hair-dark)]" : ""
                }`}
              >
                <span className="mono pt-1 text-[12px] text-accent">{s.no}</span>
                <div>
                  <h3 className="text-[clamp(19px,2vw,24px)] font-normal tracking-[-0.01em] text-on-dark">
                    {s.title}
                  </h3>
                  <p className="mt-[6px] max-w-[46ch] text-[14.5px] text-on-dark-mut">
                    {s.body}
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
