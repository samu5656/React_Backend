import { Stagger, StaggerItem } from "../components/motion.jsx";
import CountUp from "../components/CountUp.jsx";

const cells = [
  { value: <CountUp to={500} />, label: "Model" },
  { value: (<><CountUp to={50} /><span className="u">KG</span></>), label: "Tank capacity" },
  { value: (<><CountUp to={360} /><span className="u">°</span></>), label: "Distribution arc" },
  { value: "24/7", label: "Automated cycles" },
  { value: "App", label: "Remote control" },
];

export default function SpecStrip() {
  return (
    <section
      id="specs"
      className="on-dark relative border-y border-[var(--hair-dark)] bg-steel text-on-dark"
    >
      <div className="mx-auto max-w-site">
        <Stagger className="grid grid-cols-1 border-l border-[var(--hair-dark)] sm:grid-cols-2 min-[880px]:grid-cols-5">
          {cells.map((c, i) => (
            <StaggerItem
              key={i}
              className="border-b border-r border-[var(--hair-dark)] px-[26px] py-[clamp(26px,4vw,46px)] min-[880px]:border-b-0"
            >
              <div className="text-[clamp(40px,5.2vw,68px)] font-extralight leading-none tracking-[-0.03em] text-on-dark [&_.u]:ml-1 [&_.u]:align-baseline [&_.u]:text-[0.42em] [&_.u]:font-normal [&_.u]:tracking-normal [&_.u]:text-accent">
                {c.value}
              </div>
              <div className="mono mt-4 text-[11px] uppercase tracking-[0.18em] text-on-dark-mut">
                {c.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
