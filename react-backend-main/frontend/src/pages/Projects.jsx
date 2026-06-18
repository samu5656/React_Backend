import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';
import { ArrowUpRight, Leaf, FlaskConical, Sun, Flame, Waves, Monitor, Brain, Activity, Microscope } from 'lucide-react';

// ─── Project data ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1, number: '01',
    title: 'Fully Disintegrable Sanitary Pads',
    domain: 'Sustainable Hygiene',
    tags: ['Biodegradable', 'Biotech', "Women's Health"],
    description: 'A sustainable sanitary pad developed using natural fibers and a biodegradable bio-superabsorbent system to replace plastic-based materials. It provides effective absorbency, comfort, and leakage protection while safely degrading after disposal, reducing menstrual waste pollution and supporting eco-friendly menstrual hygiene.',
    website: 'https://khyora.vercel.app/',
    accent: '#0d9488', lightBg: '#f0fdfa', Icon: Leaf,
  },
  {
    id: 2, number: '02',
    title: 'Modular Solar Drying Sheet',
    domain: 'Renewable Energy',
    tags: ['Solar', 'Thermal', 'Post-harvest'],
    description: 'A flexible solar thermal system designed to efficiently convert sunlight into heat through advanced photothermal materials, enabling effective drying of agricultural and marine products. It reduces post-harvest losses by providing a portable, low-cost alternative to fossil fuel dryers.',
    website: 'https://react.kct.ac.in/projects/therbel',
    accent: '#ea580c', lightBg: '#fff7ed', Icon: Sun,
  },
  {
    id: 3, number: '03',
    title: 'Plug-and-Play Smart Microclimate Control for Mushroom Cultivation',
    domain: 'Agricultural IoT',
    tags: ['IoT', 'Automation', 'Sustainable Farming'],
    description: 'A portable automated climate-control system designed for mushroom growing chambers, maintaining optimal humidity, temperature, CO₂, and light levels through continuous monitoring and real-time adjustments to maximise yield and minimise crop failure.',
    website: 'https://flow-sync-lilac.vercel.app/',
    accent: '#d97706', lightBg: '#fffbeb', Icon: FlaskConical,
  },
  {
    id: 4, number: '04',
    title: 'Precision Feeding and Health Monitoring for Shrimp Farming',
    domain: 'Aquaculture IoT',
    tags: ['Precision Feeding', 'IoT', 'Aquaculture'],
    description: 'An intelligent feeding solution for shrimp farms that delivers precise and timely feed distribution by tracking real-time shrimp behaviour and health indicators, reducing feed waste and improving overall pond health and harvest productivity.',
    website: 'https://shrimpfeeder.vercel.app/',
    accent: '#0284c7', lightBg: '#f0f9ff', Icon: Waves,
  },
  {
    id: 5, number: '05',
    title: 'Immersive Medical Training Simulator for Retinoscope',
    domain: 'Immersive Technology',
    tags: ['Virtual Reality', 'EdTech', 'Simulation'],
    description: 'A virtual reality training platform that simulates retinoscopy procedures, allowing medical students and ophthalmology trainees to practise refraction and eye examination skills in a realistic, risk-free environment without the need for real patients.',
    website: 'http://react.kct.ac.in/projects/vrsimulator',
    accent: '#7c3aed', lightBg: '#faf5ff', Icon: Monitor,
  },
  {
    id: 6, number: '06',
    title: 'Converting Food Waste into Biogas',
    domain: 'Clean Energy',
    tags: ['Biogas', 'Circular Economy', 'Waste-to-Energy'],
    description: 'An advanced two-stage bioreactor that converts food waste into high-purity methane through optimised anaerobic digestion, providing a scalable clean energy solution for households and small institutions while reducing organic waste disposal.',
    website: 'https://react.kct.ac.in/projects/biopod',
    accent: '#16a34a', lightBg: '#f0fdf4', Icon: Flame,
  },
  {
    id: 7, number: '07',
    title: 'AI-Enabled Smart Patient Flow Monitoring System',
    domain: 'Healthcare AI',
    tags: ['AI', 'IoT', 'Hospital Management'],
    description: 'An intelligent hospital management system that uses wearable patient wristbands, real-time tracking, and AI analytics to monitor patient movement and predict bottlenecks, improving care delivery and reducing emergency wait times.',
    website: '#',
    accent: '#0891b2', lightBg: '#ecfeff', Icon: Brain,
  },
  {
    id: 8, number: '08',
    title: 'Intelligent Early Warning System for Cardiac and Stroke Risks',
    domain: 'Preventive Healthcare',
    tags: ['Cardiac Monitoring', 'AI', 'Wearable'],
    description: 'A real-time health monitoring system that continuously tracks vital cardiovascular parameters such as heart rate, ECG, SpO₂, and HRV, using AI to detect early warning signs of cardiac events and stroke, enabling timely medical intervention.',
    website: '#',
    accent: '#dc2626', lightBg: '#fef2f2', Icon: Activity,
  },
  {
    id: 9, number: '09',
    title: 'Non-Destructive Sex Determination in Papaya Seeds',
    domain: 'AgriTech',
    tags: ['Spectroscopy', 'ML', 'Horticulture'],
    description: 'A spectroscopy-based system that identifies the sex of papaya seeds without damaging them, enabling farmers to selectively cultivate only female or hermaphrodite plants, significantly improving yield efficiency and reducing crop waste.',
    website: '#',
    accent: '#65a30d', lightBg: '#f7fee7', Icon: Microscope,
  },
];

// ─── Card dimensions ─────────────────────────────────────────────────────────
const CARD_W = 340;
const CARD_H = 400;
const COL    = 360;
const ROW    = 415;

const GRID_POS = [
  { x: -COL, y: -ROW },  // top-left
  { x:    0, y: -ROW },  // top-center
  { x:  COL, y: -ROW },  // top-right
  { x: -COL, y:    0 },  // middle-left
  { x:    0, y:    0 },  // middle-center (hero destination)
  { x:  COL, y:    0 },  // middle-right
  { x: -COL, y:  ROW },  // bottom-left
  { x:    0, y:  ROW },  // bottom-center
  { x:  COL, y:  ROW },  // bottom-right
];

// ─── Light-theme project card ────────────────────────────────────────────────
function ProjectCard({ project }) {
  const { Icon, accent, lightBg, number, domain, title, description, website } = project;
  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md"
      style={{ width: CARD_W, height: CARD_H }}
    >
      {/* Header strip */}
      <div
        className="flex shrink-0 items-center justify-between px-5 py-4"
        style={{ background: lightBg, borderBottom: `1px solid ${accent}28` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `${accent}1a` }}
          >
            <Icon size={20} style={{ color: accent }} strokeWidth={2} />
          </div>
          <span
            className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ background: `${accent}16`, color: accent }}
          >
            {domain}
          </span>
        </div>
        <span className="text-[13px] font-black tracking-widest text-gray-200">{number}</span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col overflow-hidden px-5 py-4">
        <h3 className="mb-2 text-[15px] font-bold leading-snug tracking-tight text-gray-900">
          {title}
        </h3>
        <div className="mb-3 h-[2px] w-10 rounded-full" style={{ background: accent }} />
        <p className="mb-3 text-[13px] leading-relaxed text-gray-600">
          {description}
        </p>
        {website !== '#' && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 self-start rounded-lg px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: accent }}
            onClick={(e) => e.stopPropagation()}
          >
            View Project <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Desktop scroll animation ─────────────────────────────────────────────────
// The sticky container starts at top:80px (below navbar) and is calc(100vh-80px) tall.
// This ensures the navbar never overlaps the cards in any scroll state.
function ScrollRevealSection() {
  const sectionRef = useRef(null);

  const halfH = CARD_H / 2;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Physical spring for smooth scrubbing
  const smooth = useSpring(scrollYProgress, { damping: 22, stiffness: 90, mass: 0.6 });

  // ── Card 0: hero (Solar Dryer) → top-center (2nd position) ─────────────
  const c0x     = useTransform(smooth, [0.06, 0.76], [0, GRID_POS[1].x]);
  const c0y     = useTransform(smooth, [0.06, 0.76], [60, GRID_POS[1].y]);
  const c0scale = useTransform(smooth, [0,    0.72], [1.2, 1]);

  // ── Card 1: Flushable Napkin → top-left ─────────────────────────────────
  const c1x     = useTransform(smooth, [0.12, 0.76], [0, GRID_POS[0].x]);
  const c1y     = useTransform(smooth, [0.12, 0.76], [0, GRID_POS[0].y]);
  const c1scale = useTransform(smooth, [0.10, 0.76], [0.05, 1]);
  const c1op    = useTransform(smooth, [0.10, 0.28], [0, 1]);

  // ── Card 2: top-right ────────────────────────────────────────────────────
  const c2x     = useTransform(smooth, [0.16, 0.78], [0, GRID_POS[2].x]);
  const c2y     = useTransform(smooth, [0.16, 0.78], [0, GRID_POS[2].y]);
  const c2scale = useTransform(smooth, [0.14, 0.78], [0.05, 1]);
  const c2op    = useTransform(smooth, [0.14, 0.32], [0, 1]);

  // ── Card 3: bottom-left ──────────────────────────────────────────────────
  const c3x     = useTransform(smooth, [0.12, 0.76], [0, GRID_POS[3].x]);
  const c3y     = useTransform(smooth, [0.12, 0.76], [0, GRID_POS[3].y]);
  const c3scale = useTransform(smooth, [0.10, 0.76], [0.05, 1]);
  const c3op    = useTransform(smooth, [0.10, 0.28], [0, 1]);

  // ── Card 4: VR Simulator → middle-center (repurposed; Solar Dryer is now hero) ──
  const c4x     = useTransform(smooth, [0.18, 0.80], [0, GRID_POS[4].x]);
  const c4y     = useTransform(smooth, [0.18, 0.80], [0, GRID_POS[4].y]);
  const c4scale = useTransform(smooth, [0.16, 0.80], [0.05, 1]);
  const c4op    = useTransform(smooth, [0.16, 0.34], [0, 1]);

  // ── Card 5: middle-right ─────────────────────────────────────────────────
  const c5x     = useTransform(smooth, [0.22, 0.82], [0, GRID_POS[5].x]);
  const c5y     = useTransform(smooth, [0.22, 0.82], [0, GRID_POS[5].y]);
  const c5scale = useTransform(smooth, [0.20, 0.82], [0.05, 1]);
  const c5op    = useTransform(smooth, [0.20, 0.38], [0, 1]);

  // ── Card 6: bottom-left ──────────────────────────────────────────────────
  const c6x     = useTransform(smooth, [0.14, 0.78], [0, GRID_POS[6].x]);
  const c6y     = useTransform(smooth, [0.14, 0.78], [0, GRID_POS[6].y]);
  const c6scale = useTransform(smooth, [0.12, 0.78], [0.05, 1]);
  const c6op    = useTransform(smooth, [0.12, 0.30], [0, 1]);

  // ── Card 7: bottom-center ────────────────────────────────────────────────
  const c7x     = useTransform(smooth, [0.20, 0.82], [0, GRID_POS[7].x]);
  const c7y     = useTransform(smooth, [0.20, 0.82], [0, GRID_POS[7].y]);
  const c7scale = useTransform(smooth, [0.18, 0.82], [0.05, 1]);
  const c7op    = useTransform(smooth, [0.18, 0.36], [0, 1]);

  // ── Card 8: bottom-right ─────────────────────────────────────────────────
  const c8x     = useTransform(smooth, [0.24, 0.86], [0, GRID_POS[8].x]);
  const c8y     = useTransform(smooth, [0.24, 0.86], [0, GRID_POS[8].y]);
  const c8scale = useTransform(smooth, [0.22, 0.86], [0.05, 1]);
  const c8op    = useTransform(smooth, [0.22, 0.40], [0, 1]);

  // ── Section title: visible at start, fades out as cards spread ───────────
  // useTransform clamps to first output when input < first input range key,
  // so titleOp = 1 at scroll=0.
  const titleOp = useTransform(smooth, [0.28, 0.48], [1, 0]);
  const titleY  = useTransform(smooth, [0.28, 0.48], [0, -12]);

  // ── Scroll hint: visible at start, fades out early ───────────────────────
  const hintOp  = useTransform(smooth, [0.14, 0.26], [1, 0]);

  const motionValues = [
    { x: c1x, y: c1y, scale: c1scale, opacity: c1op },  // [0] Sanitary Pads (01) — top-left
    { x: c0x, y: c0y, scale: c0scale, opacity: 1 },     // [1] Solar Dryer (02) — HERO → top-center
    { x: c2x, y: c2y, scale: c2scale, opacity: c2op },  // [2] Mushroom (03) — top-right
    { x: c3x, y: c3y, scale: c3scale, opacity: c3op },  // [3] Shrimp (04) — middle-left
    { x: c4x, y: c4y, scale: c4scale, opacity: c4op },  // [4] VR Simulator (05) — middle-center
    { x: c5x, y: c5y, scale: c5scale, opacity: c5op },  // [5] Biogas (06) — middle-right
    { x: c6x, y: c6y, scale: c6scale, opacity: c6op },  // [6] AI Flow (07) — bottom-left
    { x: c7x, y: c7y, scale: c7scale, opacity: c7op },  // [7] Cardiac (08) — bottom-center
    { x: c8x, y: c8y, scale: c8scale, opacity: c8op },  // [8] Papaya (09) — bottom-right
  ];

  const halfW = CARD_W / 2;

  return (
    // Outer section drives the scroll range
    <section ref={sectionRef} className="relative" style={{ height: '290vh' }}>
      {/*
        Sticky container starts at 80px from viewport top (below the fixed navbar).
        Height = 100vh - 80px so it fills the rest of the screen exactly.
        This prevents any card from ever appearing behind the navbar.
      */}
      <div
        className="sticky overflow-hidden bg-[#F5F7FA]"
        style={{ top: '80px', height: 'calc(100vh - 80px)' }}
      >
        {/* Section label — shown from page load, fades as cards spread */}
        <motion.div
          style={{ opacity: titleOp, y: titleY }}
          className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2 text-center"
        >
          <p className="text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#E76758]">
            Centre for REACT · Field Innovation
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Our Projects
          </h2>
          <p className="mt-1.5 text-sm text-gray-500">
            Nine social innovations built on real field research
          </p>
        </motion.div>

        {/* Animated project cards */}
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: -halfW,
              marginTop: -halfH,
              // Framer Motion drives translation + scale + opacity
              x: motionValues[i].x,
              y: motionValues[i].y,
              scale: motionValues[i].scale,
              opacity: motionValues[i].opacity,
              zIndex: i === 1 ? 10 : 5,
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}

        {/* Scroll hint — shown from load, fades out after first scroll */}
        <motion.div
          style={{ opacity: hintOp }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-400">
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Mobile: plain scrollable grid ───────────────────────────────────────────
function MobileCard({ project }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { Icon, accent, lightBg, number, domain, title, description, tags, website } = project;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
    >
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ background: lightBg, borderBottom: `1px solid ${accent}28` }}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: `${accent}1a` }}>
            <Icon size={16} style={{ color: accent }} strokeWidth={2} />
          </div>
          <span className="rounded-full px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em]"
            style={{ background: `${accent}16`, color: accent }}>
            {domain}
          </span>
        </div>
        <span className="text-[12px] font-black tracking-widest text-gray-200">{number}</span>
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
        <div className="mb-3 h-[2px] w-8 rounded-full" style={{ background: accent }} />
        <p className="mb-5 text-[14px] leading-relaxed text-gray-600">{description}</p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-md border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10.5px] font-medium text-gray-500">
              {tag}
            </span>
          ))}
        </div>
        <a href={website} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: accent }}>
          View Project <ArrowUpRight size={13} strokeWidth={2.5} />
        </a>
      </div>
    </motion.div>
  );
}

function MobileGrid() {
  return (
    <section className="bg-[#F5F7FA] px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#E76758]">
            Centre for REACT · Field Innovation
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Our Projects</h2>
          <p className="mt-2 text-sm text-gray-500">Nine social innovations built on real field research</p>
        </div>
        <div className="flex flex-col gap-5">
          {PROJECTS.map((p) => <MobileCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Desktop: static full-size grid (shown below the scroll animation) ───────
function DesktopGrid() {
  return (
    <section className="bg-[#F5F7FA] px-8 pb-20 pt-8">
      <div
        className="mx-auto grid grid-cols-3 gap-5"
        style={{ maxWidth: CARD_W * 3 + 40 }}
      >
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <section className="border-t border-gray-100 bg-white py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl px-6 text-center"
      >
        <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.28em] text-[#E76758]">
          Want to learn more?
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900">
          Every project starts with a real problem.
        </h2>
        <p className="mb-8 text-base leading-relaxed text-gray-500">
          Explore how REACT fellows research, build, and deploy social innovations
          in collaboration with real communities.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a href="/programme"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800">
            Explore Programmes <ArrowUpRight size={14} />
          </a>
          <a href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300">
            Get in Touch
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────
export const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1100);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <main className="min-h-screen bg-[#F5F7FA]">
      {isMobile ? <MobileGrid /> : (
        <>
          <ScrollRevealSection />
          <DesktopGrid />
        </>
      )}
      <CtaSection />
    </main>
  );
};
