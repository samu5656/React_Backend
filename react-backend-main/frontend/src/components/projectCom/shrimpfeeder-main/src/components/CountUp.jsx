import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * CountUp — animates a number from 0 to `to` (cubic ease-out) the first
 * time it scrolls into view. Respects prefers-reduced-motion.
 */
export default function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1400,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf;
    let start;
    const step = (ts) => {
      if (start == null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
      else setValue(to);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
