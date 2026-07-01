import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — a thin golden bar pinned to the very top of the page
 * that fills as the visitor scrolls through the document.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[200] h-[3px] origin-left bg-gradient-to-r from-accent via-accent-br to-accent"
      aria-hidden="true"
    />
  );
}
