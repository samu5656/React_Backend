import { Reveal } from "../components/motion.jsx";
import CountUp from "../components/CountUp.jsx";

export default function Mission() {
  return (
    <section id="mission" className="section">
      <div className="wrap grid grid-cols-1 items-end gap-[clamp(32px,5vw,80px)] lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="left">
          <span className="eyebrow">The problem we feed against</span>
          <h2 className="h2 mt-[26px] max-w-[20ch]">
            Overfeeding wastes feed and poisons the water. We built a feeder that
            does neither.
          </h2>
        </Reveal>

        <Reveal className="right pb-2" delay={0.1}>
          <p className="lead">
            Hand-feeding and crude blowers dump feed unevenly — pellets pile,
            decay, and drive down dissolved oxygen. The Model 500 meters an exact
            dose and broadcasts it in a uniform 360° arc, so every pellet reaches
            the animal and the pond stays clean.
          </p>
          <div className="mt-[34px] grid grid-cols-2 gap-x-5 gap-y-7 border-t border-[var(--hair-light)] pt-[30px]">
            <div>
              <div className="text-[clamp(34px,4vw,50px)] font-light tracking-[-0.03em] text-on-light">
                up to{" "}
                <span className="font-normal text-accent">
                  <CountUp to={30} suffix="%" />
                </span>
              </div>
              <div className="mono mt-2 text-[11px] uppercase tracking-[0.16em] text-on-light-mut">
                Feed saved vs. manual
              </div>
            </div>
            <div>
              <div className="text-[clamp(34px,4vw,50px)] font-light tracking-[-0.03em] text-on-light">
                <span className="font-normal text-accent">
                  <CountUp to={360} suffix="°" />
                </span>
              </div>
              <div className="mono mt-2 text-[11px] uppercase tracking-[0.16em] text-on-light-mut">
                Even broadcast arc
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
