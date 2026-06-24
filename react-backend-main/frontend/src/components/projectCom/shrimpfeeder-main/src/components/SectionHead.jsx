import { Reveal } from "./motion.jsx";

/**
 * SectionHead — the eyebrow / heading / lead block used to open most sections.
 */
export default function SectionHead({ eyebrow, title, lead, className = "" }) {
  return (
    <Reveal className={`max-w-[760px] ${className}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h2 mt-6">{title}</h2>
      {lead && <p className="lead mt-[22px]">{lead}</p>}
    </Reveal>
  );
}
