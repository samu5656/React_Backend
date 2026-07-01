import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Tilt — smooth 3D pointer-follow tilt with optional lift.
 * Uses spring-smoothed motion values so the rotation eases naturally.
 */
export default function Tilt({
  children,
  className = "",
  max = 8,
  lift = 0,
  ...rest
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const springCfg = { stiffness: 220, damping: 22, mass: 0.6 };
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), springCfg);
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), springCfg);
  const ty = useSpring(useMotionValue(0), springCfg);

  function handleMove(e) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
    ty.set(lift);
  }
  function handleLeave() {
    px.set(0);
    py.set(0);
    ty.set(0);
  }

  if (reduce) {
    return (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        y: ty,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
