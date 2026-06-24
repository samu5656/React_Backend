import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1];

/**
 * Reveal — fades + slides its children in when scrolled into view.
 * Honors prefers-reduced-motion by rendering statically.
 */
export function Reveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  y = 24,
  once = true,
  amount = 0.2,
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger — container that orchestrates a staggered reveal of its
 * <StaggerItem> children as the group enters the viewport.
 */
export function Stagger({
  as = "div",
  children,
  className = "",
  stagger = 0.09,
  once = true,
  amount = 0.15,
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function StaggerItem({ as = "div", children, className = "", ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag className={className} variants={itemVariants} {...rest}>
      {children}
    </MotionTag>
  );
}

export { EASE };
