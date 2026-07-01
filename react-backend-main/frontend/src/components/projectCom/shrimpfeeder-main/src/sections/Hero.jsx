import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import HeroMotes from "../components/HeroMotes.jsx";
import { Arrow } from "../components/icons.jsx";

const EASE = [0.22, 0.61, 0.36, 1];
const heroImage = new URL("../../public/assets/04-pond-golden.jpeg", import.meta.url).href;

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: image drifts down + scales, content lifts and fades.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      {/* background image + overlays */}
      <div className="absolute inset-x-0 -inset-y-[8%] z-0">
        <motion.img
          src={heroImage}
          alt="The Model 500 feeder broadcasting feed across a shrimp pond at golden hour"
          fetchpriority="high"
          style={reduce ? undefined : { y: imgY, scale: imgScale }}
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(14,20,23,0.94) 6%, rgba(14,20,23,0.4) 46%, rgba(14,20,23,0.55) 100%), linear-gradient(to right, rgba(14,20,23,0.7), rgba(14,20,23,0.1) 60%)",
          }}
        />
        <HeroMotes />
      </div>

      {/* content */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-[2] mx-auto w-full max-w-site px-[var(--gut)] pb-[clamp(56px,10vh,110px)]"
      >
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="eyebrow text-accent underline decoration-accent/60 decoration-1 underline-offset-4"
          >
            Automatic Aquaculture Feeder · Model 500
          </motion.span>
          <motion.h1
            variants={item}
            className="display mt-[22px] max-w-[16ch] text-on-dark"
          >
            Precision feeding for the modern shrimp farm.
          </motion.h1>
          <motion.p
            variants={item}
            className="lead mt-[26px] max-w-[52ch] text-[#D7DCDE]"
          >
            Calibrated, even, waste-free distribution — engineered hardware that
            feeds the whole pond uniformly and protects your water, your feed
            budget, and your yield.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-[18px]"
          >
            <a href="#contact" className="btn btn--primary">
              Get in Touch <Arrow />
            </a>
            <a
              href="#engineering"
              className="textlink"
              style={{ color: "var(--on-dark)" }}
            >
              See the technology <Arrow />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <span className="absolute bottom-[26px] left-[var(--gut)] z-[2] hidden items-center gap-3 sm:inline-flex">
        <span className="relative block h-10 w-px overflow-hidden bg-gradient-to-b from-accent to-transparent">
          <span className="absolute left-0 top-[-40px] h-10 w-px animate-cue bg-accent" />
        </span>
        <span className="mono text-[10.5px] uppercase tracking-[0.26em] text-on-dark-mut">
          Scroll
        </span>
      </span>
    </section>
  );
}
