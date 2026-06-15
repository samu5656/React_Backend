const items = [
  'Real World', 'Engineering', 'Application', 'Collaborative', 'Transformation',
  'Domain Intelligence', 'MMD Build', 'CALIBRATE', 'Kumaraguru', 'REACT',
  'Real World', 'Engineering', 'Application', 'Collaborative', 'Transformation',
  'Domain Intelligence', 'MMD Build', 'CALIBRATE', 'Kumaraguru', 'REACT',
];

export const Marquee = () => (
  <div className="about-marquee-root relative overflow-hidden py-5">
    <div className="about-marquee-fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
      style={{ background: 'linear-gradient(to right, #F5F7FA 0%, transparent 100%)' }} />
    <div className="about-marquee-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
      style={{ background: 'linear-gradient(to left, #F5F7FA 0%, transparent 100%)' }} />
    <div className="about-marquee-track flex gap-10">
      {items.map((label, i) => (
        <span
          key={i}
          className="flex-shrink-0 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400"
        >
          {label}
          <span className="ml-10 text-[#E76758]">·</span>
        </span>
      ))}
    </div>
  </div>
);
