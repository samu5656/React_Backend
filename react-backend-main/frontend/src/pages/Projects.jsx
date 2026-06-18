import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';
import { ArrowUpRight, Leaf, FlaskConical, Sun, Flame, Waves, Monitor } from 'lucide-react';

// ─── Project data ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1, number: '01',
    title: 'Flushable Napkin',
    domain: 'Sustainable Hygiene',
    tags: ['Biodegradable', 'Biotech', "Women's Health"],
    description: 'Fully Disintegrable Sanitary Pads for Menstrual Hygiene',
    website: 'https://khyora.vercel.app/',
    accent: '#0d9488', lightBg: '#f0fdfa', Icon: Leaf,
  },
  {
    id: 2, number: '02',
    title: 'Solar Dryer',
    domain: 'Renewable Energy',
    tags: ['Solar', 'Thermal', 'Post-harvest'],
    description: 'Modular Solar Drying Sheet for Reducing Post-harvest losses in agricultural and coastal value chains',
    website: 'https://react.kct.ac.in/projects/therbel',
    accent: '#ea580c', lightBg: '#fff7ed', Icon: Sun,
  },
  {
    id: 3, number: '03',
    title: 'Mushroom Farming',
    domain: 'Agricultural IoT',
    tags: ['IoT', 'Automation', 'Sustainable Farming'],
    description: 'Plug-and-Play Smart Microclimate Control System for Mushroom Cultivation',
    website: 'https://flow-sync-lilac.vercel.app/',
    accent: '#d97706', lightBg: '#fffbeb', Icon: FlaskConical,
  },
  {
    id: 4, number: '04',
    title: 'Shrimp Farming',
    domain: 'Aquaculture IoT',
    tags: ['Precision Feeding', 'IoT', 'Aquaculture'],
    description: 'Precision Feeding and Early Health Monitoring System for shrimp farming',
    website: 'https://shrimpfeeder.vercel.app/',
    accent: '#0284c7', lightBg: '#f0f9ff', Icon: Waves,
  },
  {
    id: 5, number: '05',
    title: 'VR Simulator',
    domain: 'Immersive Technology',
    tags: ['Virtual Reality', 'EdTech', 'Simulation'],
    description: 'Immersive medical training simulator for retinoscope',
    website: 'http://react.kct.ac.in/projects/vrsimulator',
    accent: '#7c3aed', lightBg: '#faf5ff', Icon: Monitor,
  },
  {
    id: 6, number: '06',
    title: 'Portable Bio Gas',
    domain: 'Clean Energy',
    tags: ['Biogas', 'Circular Economy', 'Waste-to-Energy'],
    description: 'Converting Food Waste into Bio Gas',
    website: 'https://react.kct.ac.in/projects/biopod',
    accent: '#16a34a', lightBg: '#f0fdf4', Icon: Flame,
  },
];

// ─── Card dimensions ─────────────────────────────────────────────────────────
// CARD_H=260 (halfH=130). ROW=155 gives 50px inter-row gap and 59px breathing
// room at both top and bottom on a 768px screen.
// On 768px (688px avail, center=344): row0 top  = 344-155-130 = 59px ✓
//                                      row1 bot  = 344+155+130 = 629 < 688 ✓
//                                      row gap   = (344+155-130)-(344-155+130) = 50px ✓
const CARD_W = 340;
const CARD_H = 260;
const COL = 360; // column center-to-center
const ROW = 155; // row half-spacing — must be > halfH (130) to prevent row overlap

const GRID_POS = [
  { x: -COL, y: -ROW },
  { x:    0, y: -ROW },
  { x:  COL, y: -ROW },
  { x: -COL, y:  ROW },
  { x:    0, y:  ROW },
  { x:  COL, y:  ROW },
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
        className="flex shrink-0 items-center justify-between px-5 py-3.5"
        style={{ background: lightBg, borderBottom: `1px solid ${accent}28` }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: `${accent}1a` }}
          >
            <Icon size={16} style={{ color: accent }} strokeWidth={2} />
          </div>
          <span
            className="rounded-full px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em]"
            style={{ background: `${accent}16`, color: accent }}
          >
            {domain}
          </span>
        </div>
        <span className="text-[12px] font-black tracking-widest text-gray-200">{number}</span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col overflow-hidden px-5 py-4">
        <h3 className="mb-1.5 text-[16px] font-bold leading-snug tracking-tight text-gray-900">
          {title}
        </h3>
        <div className="mb-3 h-[2px] w-8 rounded-full" style={{ background: accent }} />
        <p className="mb-4 text-[13px] leading-relaxed text-gray-600">
          {description}
        </p>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 self-start rounded-lg px-4 py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: accent }}
          onClick={(e) => e.stopPropagation()}
        >
          View Project <ArrowUpRight size={13} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}

// ─── Desktop scroll animation ─────────────────────────────────────────────────
// The sticky container starts at top:80px (below navbar) and is calc(100vh-80px) tall.
// This ensures the navbar never overlaps the cards in any scroll state.
function ScrollRevealSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Physical spring for smooth scrubbing
  const smooth = useSpring(scrollYProgress, { damping: 22, stiffness: 90, mass: 0.6 });

  // ── Card 0: hero (Solar Dryer) → top-center ─────────────────────────────
  // Initial y=+100: at 768px viewport (container center=344), the scaled card
  // top sits at 344+100-150*1.5=219px — safely below the ~150px title block.
  // scale=1.5: card appears 450px tall, fits container with no clipping.
  const c0x     = useTransform(smooth, [0.06, 0.76], [0, GRID_POS[1].x]);
  const c0y     = useTransform(smooth, [0.06, 0.76], [100, GRID_POS[1].y]);
  const c0scale = useTransform(smooth, [0,    0.72], [1.5, 1]);

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

  // ── Card 4: bottom-center ────────────────────────────────────────────────
  const c4x     = useTransform(smooth, [0.18, 0.80], [0, GRID_POS[4].x]);
  const c4y     = useTransform(smooth, [0.18, 0.80], [0, GRID_POS[4].y]);
  const c4scale = useTransform(smooth, [0.16, 0.80], [0.05, 1]);
  const c4op    = useTransform(smooth, [0.16, 0.34], [0, 1]);

  // ── Card 5: bottom-right ─────────────────────────────────────────────────
  const c5x     = useTransform(smooth, [0.22, 0.82], [0, GRID_POS[5].x]);
  const c5y     = useTransform(smooth, [0.22, 0.82], [0, GRID_POS[5].y]);
  const c5scale = useTransform(smooth, [0.20, 0.82], [0.05, 1]);
  const c5op    = useTransform(smooth, [0.20, 0.38], [0, 1]);

  // ── Section title: visible at start, fades out as cards spread ───────────
  // useTransform clamps to first output when input < first input range key,
  // so titleOp = 1 at scroll=0.
  const titleOp = useTransform(smooth, [0.28, 0.48], [1, 0]);
  const titleY  = useTransform(smooth, [0.28, 0.48], [0, -12]);

  // ── Scroll hint: visible at start, fades out early ───────────────────────
  const hintOp  = useTransform(smooth, [0.14, 0.26], [1, 0]);

  const motionValues = [
    { x: c1x, y: c1y, scale: c1scale, opacity: c1op },  // Flushable Napkin (01) — regular
    { x: c0x, y: c0y, scale: c0scale, opacity: 1 },      // Solar Dryer (02) — hero
    { x: c2x, y: c2y, scale: c2scale, opacity: c2op },
    { x: c3x, y: c3y, scale: c3scale, opacity: c3op },
    { x: c4x, y: c4y, scale: c4scale, opacity: c4op },
    { x: c5x, y: c5y, scale: c5scale, opacity: c5op },
  ];

  const halfW = CARD_W / 2;
  const halfH = CARD_H / 2;

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
            Six social innovations built on real field research
          </p>
          <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-gray-400">
            From menstrual hygiene and smart mushroom cultivation to solar drying, clean biogas, precision shrimp farming, and immersive medical training — each project is engineered for real-world impact.
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
          <p className="mt-2 text-sm text-gray-500">Six social innovations built on real field research</p>
          <p className="mt-3 text-[13px] leading-relaxed text-gray-400">
            From menstrual hygiene and smart mushroom cultivation to solar drying, clean biogas, precision shrimp farming, and immersive medical training — each project is engineered for real-world impact.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          {PROJECTS.map((p) => <MobileCard key={p.id} project={p} />)}
        </div>
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
      {isMobile ? <MobileGrid /> : <ScrollRevealSection />}
      <CtaSection />
    </main>
  );
};
