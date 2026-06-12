import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { ArrowRight, Linkedin, Globe, Mail, ExternalLink, Copy, Check } from 'lucide-react';

// ── Assets ──────────────────────────────────────────────────────────────────
import Video from '../../assets/videos/video-hero.mp4';

// People (Testimonials)
import Aparna from '../../assets/people/Aparna.jpg';
import Jana from '../../assets/people/Jana.jpg';
import Nandeesh from '../../assets/people/Nandeesh.jpg';
import Sangeetha from '../../assets/people/Sangeetha.jpg';
import Sivakeerthana from '../../assets/people/Sivakeerthana.jpg';

// ── CONFIG ───────────────────────────────────────────────────────────────────
const CENTRE_NAME = 'Centre for REACT';

// ── SVG DOMAIN ICONS ─────────────────────────────────────────────────────────
function AgricultureIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M20 35V18" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 18C20 10 12 6 6 8" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 18C20 10 28 6 34 8" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 24C17 23 14 21 12 17" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 24C23 23 26 21 28 17" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HealthIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M20 32C20 32 6 24 6 14C6 10 9 7 13 7C16 7 18.5 8.5 20 11C21.5 8.5 24 7 27 7C31 7 34 10 34 14C34 24 20 32 20 32Z" stroke="#9F1239" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 20H18L20 15L22 25L24 20H26" stroke="#9F1239" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EnvironmentIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M20 34V20" stroke="#065F46" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 20C20 12 10 6 6 6C6 6 8 16 20 20" stroke="#065F46" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 20C20 12 30 6 34 6C34 6 32 16 20 20" stroke="#065F46" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 32C13 29 16 28 20 30C24 32 27 31 30 28" stroke="#065F46" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CultureIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="13" stroke="#5B21B6" strokeWidth="2.5" />
      <path d="M10 20H30" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 7C20 7 14 13 14 20C14 27 20 33 20 33" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 7C20 7 26 13 26 20C26 27 20 33 20 33" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CommunityIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M8 20L20 8L32 20V34H24V26H16V34H8V20Z" stroke="#0C4A6E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="17" r="2.5" stroke="#0C4A6E" strokeWidth="2" />
    </svg>
  );
}

function EducationIcon({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M6 15L20 8L34 15L20 22L6 15Z" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 15V25" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 19V28C12 28 15 32 20 32C25 32 28 28 28 28V19" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── DATA ─────────────────────────────────────────────────────────────────────

const domains = [
  {
    title: 'Agriculture and Food Systems',
    desc: 'Smallholder farming, supply chains, food security, postharvest loss, agricultural markets.',
    Icon: AgricultureIcon,
    color: 'from-amber-50 to-orange-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
    shadowColor: 'rgba(251,191,36,0.35)',
  },
  {
    title: 'Health and Wellbeing',
    desc: 'Primary care access, diagnostics, maternal health, mental health, community health systems.',
    Icon: HealthIcon,
    color: 'from-rose-50 to-pink-50',
    border: 'border-rose-200',
    iconBg: 'bg-rose-100',
    shadowColor: 'rgba(251,113,133,0.35)',
  },
  {
    title: 'Environment and Climate',
    desc: 'Water, waste, energy, climate adaptation, ecological restoration, urban sustainability.',
    Icon: EnvironmentIcon,
    color: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    shadowColor: 'rgba(52,211,153,0.35)',
  },
  {
    title: 'Culture and Creative Economy',
    desc: 'Indigenous knowledge, craft, performing arts, creative livelihoods, cultural heritage.',
    Icon: CultureIcon,
    color: 'from-violet-50 to-purple-50',
    border: 'border-violet-200',
    iconBg: 'bg-violet-100',
    shadowColor: 'rgba(167,139,250,0.35)',
  },
  {
    title: 'Sustainable Communities',
    desc: 'Housing, infrastructure, governance, mobility, civic systems, community resilience.',
    Icon: CommunityIcon,
    color: 'from-sky-50 to-blue-50',
    border: 'border-sky-200',
    iconBg: 'bg-sky-100',
    shadowColor: 'rgba(56,189,248,0.35)',
  },
  {
    title: 'Education and Livelihood',
    desc: 'Learning access, vocational pathways, skills systems, income security, economic mobility.',
    Icon: EducationIcon,
    color: 'from-yellow-50 to-lime-50',
    border: 'border-yellow-200',
    iconBg: 'bg-yellow-100',
    shadowColor: 'rgba(250,204,21,0.35)',
  },
];

const outputs = [
  'A published or submitted research paper',
  'A filed patent or documented IP record',
  'A working proof of concept, tested and documented in the field',
  'A minimum viable product or prototype tested with real users in real conditions',
  'A submitted grant proposal',
  'An investor pitch deck presented at a public Demo Day before investors, industry, and community members',
  'A registered or actively developing social venture with a verified community impact report',
];

const testimonials = [
  {
    name: 'Jana',
    title: 'Young Innovator (TNSPC)',
    quote: "Working in policy and grassroots innovation, I've always believed in the power of field-based education. REACT is the first program I've seen that truly embodies that vision.",
    img: Jana,
    linkedin: 'https://www.linkedin.com/in/connectwithjana/',
  },
  {
    name: 'Sivakeerthana',
    title: 'R and D Engineer (Zoho Corp)',
    quote: "As someone immersed in applied research, I've been waiting to see a program that connects students to the real world meaningfully. REACT does that with clarity and conviction.",
    img: Sivakeerthana,
    linkedin: 'https://www.linkedin.com/in/sivakeerthana/',
  },
  {
    name: 'Sangeetha',
    title: 'Professor',
    quote: "For years, I've watched students struggle to connect theory with the reality outside. REACT filled that gap in the most profound way. It brings back meaning to education.",
    img: Sangeetha,
    linkedin: 'https://www.linkedin.com/in/dr-sangeetha-n-ab397258/',
  },
  {
    name: 'Aparna',
    title: 'Student',
    quote: "I had never walked through a village and asked, 'How can I help?' REACT made me do that — and it changed how I see engineering forever.",
    img: Aparna,
    linkedin: 'https://www.linkedin.com/in/aparnarm2904/',
  },
  {
    name: 'Nandeeswaran',
    title: 'Student',
    quote: "We built a working prototype with farmers. Not for them, but with them. That experience taught me more than any textbook ever could.",
    img: Nandeesh,
    linkedin: 'https://www.linkedin.com/in/nandeeswaran-k/',
  },
];

const featuredProjects = [
  {
    name: 'Flushable Napkin',
    domain: 'Health and Wellbeing',
    domainColor: 'bg-rose-100 text-rose-800',
    desc: 'A biodegradable, flushable sanitary napkin co-developed with rural women to address menstrual hygiene and waste disposal challenges.',
    link: '/projects',
    accentColor: '#9F1239',
  },
  {
    name: 'Therbal',
    domain: 'Environment and Climate',
    domainColor: 'bg-emerald-100 text-emerald-800',
    desc: 'A community-led water management initiative addressing seasonal scarcity in peri-urban zones.',
    link: '/projects/therbal',
    accentColor: '#065F46',
  },
  {
    name: 'Mushroom Farming',
    domain: 'Agriculture and Food Systems',
    domainColor: 'bg-amber-100 text-amber-800',
    desc: 'A low-cost mushroom cultivation system designed with smallholder farmers to diversify income and improve nutrition.',
    link: '/projects',
    accentColor: '#92400E',
  },
  {
    name: 'Shrimp Farming',
    domain: 'Agriculture and Food Systems',
    domainColor: 'bg-orange-100 text-orange-800',
    desc: 'An automated shrimp feeding system built with coastal farming communities to reduce waste and increase yield.',
    link: '/projects/shrimp-feeder',
    accentColor: '#9A3412',
  },
  {
    name: 'VR Simulator',
    domain: 'Education and Livelihood',
    domainColor: 'bg-violet-100 text-violet-800',
    desc: 'A virtual reality simulator for vocational skill training, co-designed with industry partners and students.',
    link: '/projects/vision-x',
    accentColor: '#5B21B6',
  },
];

const programmes = [
  {
    title: 'Social Innovation Fellowship',
    duration: 'Two years',
    credential: "Diploma in Social Innovation + Partner Master's degree from Kumaraguru Institutions.",
    eligibility: 'For postgraduate students.',
    tag: 'Flagship',
    anchor: '/programme#social-innovation-fellowship',
    accentColor: '#F59E0B',
  },
  {
    title: 'Social Innovation Programme',
    duration: 'One year',
    credential: 'Full REACT methodology. The same Diploma.',
    eligibility: 'Open to any graduate anywhere in the world.',
    tag: null,
    anchor: '/programme#social-innovation-programme',
    accentColor: '#38BDF8',
  },
  {
    title: 'Social Innovation Certification',
    duration: 'One semester',
    credential: 'Foundational skill — understanding a problem deeply enough that it is worth solving.',
    eligibility: 'Open to any current student at any institution.',
    tag: null,
    anchor: '/programme#social-innovation-certification',
    accentColor: '#A78BFA',
  },
  {
    title: 'Field Internship',
    duration: 'Variable duration',
    credential: 'Immersive engagement with live programme work alongside active fellows and field partners.',
    eligibility: 'For students and early-career professionals. Rolling intake.',
    tag: 'Rolling',
    anchor: '/programme#field-internship',
    accentColor: '#34D399',
  },
];

const cohortLinks = [
  {
    label: 'reactfellowship.kumaraguru.in',
    href: 'https://reactfellowship.kumaraguru.in',
    Icon: Globe,
    action: 'link',
  },
  {
    label: 'react.kct.ac.in',
    href: 'https://react.kct.ac.in',
    Icon: Globe,
    action: 'link',
  },
  {
    label: 'info.react@kumaraguru.in',
    href: 'mailto:info.react@kumaraguru.in',
    Icon: Mail,
    action: 'copy',
    copyText: 'info.react@kumaraguru.in',
  },
];

// ── SHARED HELPERS ────────────────────────────────────────────────────────────

function CohortLinkBtn({ item }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(item.copyText);
    } catch {
      const el = document.createElement('textarea');
      el.value = item.copyText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2800);
  }

  const base =
    'inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-sm cursor-pointer';

  if (item.action === 'link') {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={base}>
        <item.Icon className="h-4 w-4 opacity-75" />
        <span>{item.label}</span>
        <ExternalLink className="h-3 w-3 opacity-45" />
      </a>
    );
  }

  return (
    <button onClick={handleCopy} className={base}>
      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <item.Icon className="h-4 w-4 opacity-75" />}
      <span>{copied ? 'Copied to clipboard!' : item.label}</span>
      {!copied && <Copy className="h-3 w-3 opacity-45" />}
    </button>
  );
}

// 3D tilt card hook
function use3DTilt() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glare: { x: 50, y: 50 } });

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -12;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 12;
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ x: rx, y: ry, glare: { x: glareX, y: glareY } });
  }, []);

  const onMouseLeave = useCallback(() => setTilt({ x: 0, y: 0, glare: { x: 50, y: 50 } }), []);

  return { ref, tilt, onMouseMove, onMouseLeave };
}

// ── SECTION COMPONENTS ────────────────────────────────────────────────────────

/* ── Hero animation variants ── */
const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};
const heroHeading = {
  hidden: { opacity: 0, y: 50, filter: 'blur(14px)', scale: 0.97 },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)', scale: 1,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── S01: Hero ── */
function HeroSection() {
  return (
    <section
      id="home-hero"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Video — slow Ken Burns zoom-out on load */}
      <motion.video
        src={Video}
        autoPlay
        loop
        muted
        playsInline
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.38 }}
        transition={{ duration: 2.4, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay — fades in after video */}
      <motion.div
        className="absolute inset-0 bg-gray-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.68 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/65" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Staggered content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={heroItem}
          className="text-xs sm:text-sm tracking-[0.28em] uppercase font-bold mb-6"
          style={{ color: '#D97706' }}
        >
          {CENTRE_NAME} · Kumaraguru Institutions, Coimbatore
        </motion.p>

        {/* Main heading — own variant for bigger pop */}
        <motion.h1
          variants={heroHeading}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-8"
          style={{ fontWeight: 900, textShadow: '0 4px 48px rgba(0,0,0,0.7)', letterSpacing: '-0.02em' }}
        >
          Where real problems meet<br className="hidden sm:block" />{' '}
          <span style={{ color: '#D97706' }}>people willing</span>
          <br className="hidden sm:block" /> to solve them.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={heroItem}
          className="max-w-3xl text-base sm:text-lg text-white/70 leading-relaxed mb-12"
        >
          REACT — Real World Engineering And Application through Collaborative Transformation — is a methodology
          for learning by doing, building by living, and creating change by working with the people who carry the problem.
          This is the centre where that happens.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4 items-center">
          <Link to="/apply">
            <button
              className="px-9 py-4 font-black text-sm uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:-translate-y-1"
              style={{
                background: '#D97706',
                color: '#000',
                boxShadow: '0 8px 28px rgba(217,119,6,0.35)',
              }}
              onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,255,255,0.2)'; }}
              onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(217,119,6,0.35)'; }}
            >
              Apply Now
            </button>
          </Link>
          <Link to="/about">
            <button className="px-9 py-4 border-2 border-white/50 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:border-amber-500 hover:text-amber-500 transition-all duration-300 hover:-translate-y-1">
              What is REACT?
            </button>
          </Link>
        </motion.div>
      </motion.div>

    </section>
  );
}

/* ── S02: What REACT Is ── */
function WhatReactIsSection() {
  return (
    <section
      id="what-react-is"
      className="bg-white py-24 px-6 min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
          The Methodology
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-950 mb-6 leading-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          Not a classroom. Not a competition.<br /> A way of working.
        </motion.h2>
        <p className="text-lg text-amber-700 font-bold mb-8 italic">
          Real World Engineering and Application through Collaborative Transformation. Every word is a principle.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-gray-700 text-base leading-relaxed">
          <div className="space-y-5">
            <p>
              <span className="font-bold text-gray-900">Real world</span> — because the field is the classroom.{' '}
              <span className="font-bold text-gray-900">Application</span> — because knowledge that cannot be used on a real problem is incomplete.
            </p>
            <p>
              <span className="font-bold text-gray-900">Collaborative</span> — because no meaningful social problem has ever been solved by one person working alone.{' '}
              <span className="font-bold text-gray-900">Transformation</span> — because the measure of the work is whether something genuinely changed for the people it was built for.
            </p>
          </div>
          <div className="space-y-5">
            <p>
              Fellows do not study social problems from a distance. They live inside them. They work alongside communities.
              They build <em>with</em> people, not <em>for</em> them. And they do not leave until something real exists —
              a tested solution, a filed patent, a registered venture, a community that is measurably better off.
            </p>
            <p>
              The centre exists to make that possible. It provides the structure, the methodology, the field access,
              the mentors, and the institutional backing. The fellow does the work.
            </p>
          </div>
        </div>

        <Link
          to="/about"
          className="inline-flex items-center gap-2 mt-10 text-sm font-bold text-gray-900 hover:text-amber-600 transition-colors group"
        >
          About the REACT methodology
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

/* ── S03: Six Impact Domains ── */
function DomainCard({ d, i }) {
  const { ref, tilt, onMouseMove, onMouseLeave } = use3DTilt();
  const isActive = tilt.x !== 0 || tilt.y !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.07, y: -8, zIndex: 10 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: isActive
          ? `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
        transition: 'box-shadow 0.35s ease',
        boxShadow: isActive
          ? `0 24px 48px ${d.shadowColor}, 0 8px 20px rgba(0,0,0,0.12)`
          : '0 2px 8px rgba(0,0,0,0.06)',
        position: 'relative',
      }}
      className={`bg-gradient-to-br ${d.color} border ${d.border} rounded-2xl p-6 cursor-pointer overflow-hidden`}
    >
      {/* Glare */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${tilt.glare.x}% ${tilt.glare.y}%, rgba(255,255,255,0.22) 0%, transparent 60%)`,
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Icon */}
      <div
        className={`w-14 h-14 ${d.iconBg} rounded-2xl flex items-center justify-center mb-5`}
        style={{ boxShadow: `0 4px 14px ${d.shadowColor}` }}
      >
        <d.Icon className="w-8 h-8" />
      </div>

      <h3 className="font-black text-gray-900 text-base mb-2" style={{ letterSpacing: '-0.01em' }}>
        {d.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">{d.desc}</p>
    </motion.div>
  );
}

function DomainsSection() {
  return (
    <section
      id="domains"
      className="bg-gray-50 py-20 px-6 min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
          Where Fellows Work
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-black text-gray-950 mb-3"
          style={{ letterSpacing: '-0.02em' }}
        >
          Six domains. Real communities. No simulations.
        </motion.h2>
        <p className="text-gray-600 text-base max-w-2xl mb-12 leading-relaxed">
          Every fellow chooses one domain at entry and works within it for the full duration of their programme.
          The domain shapes everything — the problem they work on, the field partner they are placed with, the mentor network
          they access, and the venture they build.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((d, i) => (
            <DomainCard key={d.title} d={d} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── S04: What Fellows Produce ── */
function OutputsSection() {
  return (
    <section
      id="outputs"
      className="bg-white py-20 px-6 min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-4xl mx-auto w-full">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
          Real Outputs
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-black text-gray-950 mb-3 leading-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          A degree is the minimum.<br />Here is what else fellows leave with.
        </motion.h2>
        <p className="text-gray-600 text-base mb-10 leading-relaxed max-w-2xl">
          Every fellow who completes the programme produces all of the following. These are not optional enrichment activities.
          They are the gates through which the programme advances.
        </p>

        <ul className="space-y-3">
          {outputs.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 6 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-amber-300 hover:bg-amber-50/40 transition-colors duration-200 group cursor-default"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 + 0.15, type: 'spring', stiffness: 200 }}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-700 text-xs font-black flex items-center justify-center mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200"
              >
                {i + 1}
              </motion.span>
              <span className="text-gray-800 text-sm sm:text-base leading-relaxed font-medium">{item}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 p-5 bg-gray-900 rounded-2xl text-white"
        >
          <p className="text-sm leading-relaxed text-gray-300">
            Each cohort targets <span className="text-white font-bold">thirty fellows</span> and{' '}
            <span className="text-white font-bold">twelve registered ventures</span>. Those ventures exist after graduation.
            They continue serving the communities they were built for.
          </p>
        </motion.div>

        <Link
          to="/programme"
          className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-gray-900 hover:text-amber-600 transition-colors group"
        >
          See how the programme works
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

/* ── S05: The REACT Fellow ── */
function ReactFellowSection() {
  return (
    <section
      id="react-fellow"
      className="bg-gray-950 py-24 px-6 relative overflow-hidden min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center w-full">
        <p className="text-xs tracking-[0.22em] uppercase text-amber-400 font-bold mb-6">
          The Highest Recognition
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-10 leading-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          Not everyone who completes the programme<br className="hidden md:block" /> becomes a REACT Fellow.
        </motion.h2>

        <div className="text-left space-y-5 text-gray-300 text-base leading-relaxed mb-14 max-w-3xl mx-auto">
          <p>
            Every fellow who completes the programme receives a{' '}
            <span className="text-white font-bold">Diploma in Social Innovation</span> and a{' '}
            <span className="text-white font-bold">Partner Master's degree from Kumaraguru Institutions</span>.
            That is what completion earns.
          </p>
          <p>
            The REACT Fellow designation is something else. It is awarded only to those who register a startup or NGO
            during the programme — an organisation directly connected to their project, built for the community they spent
            two years understanding. It cannot be applied for. It cannot be negotiated. It is triggered by one act:
            registering an entity that proves the work was real.
          </p>
          <p>
            REACT Fellows enter a permanent network — mentor access, incubation pipeline, grant introductions,
            and investor connections — that continues two years beyond graduation.
          </p>
        </div>

        {/* Pull quote — no decorative character */}
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="border-l-4 border-amber-500 pl-8 text-left max-w-2xl mx-auto"
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-black text-white italic leading-relaxed"
            style={{ letterSpacing: '-0.01em' }}>
            "The institution does not determine the designation. The venture does."
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}

/* ── S06: For Partners ── */
function PartnersSection() {
  return (
    <section
      id="for-partners"
      className="bg-white py-24 px-6 min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
              For Organisations and Communities
            </p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-black text-gray-950 mb-6 leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              The centre works with partners who have real problems worth solving.
            </motion.h2>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 mt-2 px-7 py-3.5 bg-gray-950 text-white font-bold text-sm rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 group">
                Partner with us
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="space-y-5 text-gray-700 text-base leading-relaxed">
            <p>
              Field partners are not a backdrop for student projects. They are co-authors of the work. Every problem
              a fellow works on is validated with and by the organisation or community that carries it. Every solution
              is tested in their conditions. Every impact report is verified by them.
            </p>
            <p>
              If your organisation works on the ground in any of the six domains — if you have a problem that has resisted
              easy answers, a community that deserves a better solution, or knowledge that the next generation of social
              innovators needs — there is a place for you here.
            </p>
            <p>
              The centre partners with NGOs, civil society organisations, community groups, development practitioners,
              and institutional funders. Beyond the fellowship programmes, the centre convenes events and collaborations
              that connect social innovation practice across sectors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── S07: Featured Projects ── */
function ProjectCard({ p, i }) {
  const { ref, tilt, onMouseMove, onMouseLeave } = use3DTilt();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06, y: -8, zIndex: 10 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: tilt.x || tilt.y
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
        transition: 'box-shadow 0.35s ease',
        boxShadow: tilt.x || tilt.y
          ? `0 24px 48px rgba(0,0,0,0.14), 0 4px 16px ${p.accentColor}30`
          : '0 2px 8px rgba(0,0,0,0.06)',
      }}
      className="relative overflow-hidden"
    >
      <Link to={p.link} className="block group">
        <div
          className="bg-white border border-gray-200 rounded-2xl p-7 h-full relative overflow-hidden"
          style={{
            borderTop: `3px solid ${p.accentColor}`,
          }}
        >
          {/* Glare */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${tilt.glare.x}% ${tilt.glare.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
              opacity: tilt.x || tilt.y ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          />
          <div className="flex items-start justify-between mb-4">
            <h3
              className="text-xl font-black text-gray-950 group-hover:transition-colors duration-200"
              style={{
                letterSpacing: '-0.01em',
                color: tilt.x || tilt.y ? p.accentColor : undefined,
                transition: 'color 0.3s',
              }}
            >
              {p.name}
            </h3>
            <ArrowRight
              size={18}
              className="text-gray-300 group-hover:translate-x-1 transition-all mt-1 flex-shrink-0"
              style={{ color: tilt.x || tilt.y ? p.accentColor : undefined, transition: 'color 0.3s' }}
            />
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${p.domainColor}`}>
            {p.domain}
          </span>
          <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
        </div>
      </Link>
    </motion.div>
  );
}

function ProjectsSection() {
  return (
    <section
      id="featured-projects"
      className="bg-gray-50 py-20 px-6 min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
          Built Inside the Centre
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-black text-gray-950 mb-3"
          style={{ letterSpacing: '-0.02em' }}
        >
          These are not assignments. They are products.
        </motion.h2>
        <p className="text-gray-600 text-base mb-12 max-w-2xl leading-relaxed">
          Every project here was built by fellows working on a real problem, in a real community, through the REACT
          methodology. Each went through field validation, a proof of concept, and user testing before it became what you see.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-amber-600 transition-colors group"
        >
          See all projects
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

/* ── S08: Testimonials ── */
function TestimonialCard({ item }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="bg-gray-50 border border-gray-100 rounded-2xl p-7 h-full"
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex gap-3 items-center">
          <img
            src={item.img}
            alt={item.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
          />
          <div>
            <p className="font-black text-gray-900 leading-tight">{item.name}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{item.title}</p>
          </div>
        </div>
        <a
          href={item.linkedin}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          <Linkedin size={18} />
        </a>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed italic">"{item.quote}"</p>
    </motion.div>
  );
}

function StickyNote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotate: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 80, damping: 14, delay: 0.2 }}
      whileHover={{ rotate: 0, scale: 1.04, y: -4 }}
      className="relative"
      style={{
        background: 'linear-gradient(145deg, #FEF9C3 0%, #FDE68A 100%)',
        borderRadius: '3px',
        boxShadow: '4px 5px 14px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.08)',
        maxWidth: 280,
        width: '100%',
      }}
    >
      {/* Tape */}
      <div
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm"
        style={{ background: 'rgba(251,191,36,0.55)', boxShadow: '0 1px 2px rgba(0,0,0,0.12)' }}
      />
      <div className="px-4 py-5 flex items-start gap-3">
        <div
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm mt-0.5"
          style={{ background: 'rgba(251,191,36,0.45)' }}
        >
          🌐
        </div>
        <p className="text-gray-800 text-xs leading-relaxed font-medium">
          The centre's work is{' '}
          <span className="font-black text-gray-950">featured in</span> the YOUNGO Youth Project Compilation on
          Food, Agriculture and Climate Action (Vol. 1, 2025), published by the official Youth Constituency of the
          United Nations Framework Convention on Climate Change.
        </p>
      </div>
    </motion.div>
  );
}

function TestimonialsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const animationRef = useRef(null);
  const cardWidthWithGap = 432;
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const startScroll = useCallback(() => {
    const totalSetWidth = cardWidthWithGap * testimonials.length;
    animationRef.current = animate(x, x.get() - totalSetWidth, {
      duration: 30,
      ease: 'linear',
      repeat: Infinity,
      onUpdate: (latest) => {
        if (latest <= -totalSetWidth) x.set(latest + totalSetWidth);
      },
    });
  }, [x]);

  useEffect(() => {
    if (!isMobile) startScroll();
    return () => animationRef.current?.stop();
  }, [isMobile, startScroll]);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <section
      id="testimonials"
      className="bg-white py-14 overflow-hidden min-h-screen flex flex-col justify-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Header + sticky note side by side */}
      <div className="max-w-6xl mx-auto px-6 mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
            From the People Inside It
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-950" style={{ letterSpacing: '-0.02em' }}>
            From the people who have been inside it.
          </h2>
          <p className="text-gray-600 text-base mt-3 max-w-xl leading-relaxed">
            Fellows, mentors, and community members on what the work looks like from where they stand.
          </p>
        </div>

        {/* Sticky note pinned alongside the heading */}
        <div className="flex-shrink-0 flex justify-center lg:justify-end" style={{ paddingTop: '3rem' }}>
          <StickyNote />
        </div>
      </div>

      {isMobile ? (
        <div className="px-6">
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-amber-500 w-6' : 'bg-gray-300 w-2'}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="w-full cursor-grab active:cursor-grabbing"
          onMouseEnter={() => animationRef.current?.stop()}
          onMouseLeave={() => startScroll()}
        >
          <motion.div
            className="flex gap-6 pl-6"
            style={{ x, width: 'max-content' }}
            drag="x"
            dragConstraints={{ left: -(cardWidthWithGap * testimonials.length * 2), right: 0 }}
            onDragStart={() => animationRef.current?.stop()}
            onDragEnd={() => startScroll()}
          >
            {extendedTestimonials.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-[400px] select-none">
                <TestimonialCard item={item} />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}

/* ── S09: Programmes in Brief ── */
function ProgrammeCard({ prog, i }) {
  const { ref, tilt, onMouseMove, onMouseLeave } = use3DTilt();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.07, y: -8, zIndex: 10 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: tilt.x || tilt.y
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
        transition: 'box-shadow 0.35s ease',
        boxShadow: tilt.x || tilt.y
          ? `0 24px 48px rgba(0,0,0,0.3), 0 0 0 1px ${prog.accentColor}40`
          : '0 4px 16px rgba(0,0,0,0.15)',
      }}
      className="relative flex flex-col justify-between bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 overflow-hidden"
    >
      {/* Accent top border */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ background: prog.accentColor }}
      />

      {/* Glare */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${tilt.glare.x}% ${tilt.glare.y}%, rgba(255,255,255,0.08) 0%, transparent 55%)`,
          opacity: tilt.x || tilt.y ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      {prog.tag && (
        <span
          className="absolute top-5 right-5 px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full font-bold"
          style={{ background: `${prog.accentColor}25`, color: prog.accentColor }}
        >
          {prog.tag}
        </span>
      )}

      <div>
        <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">{prog.duration}</p>
        <h3 className="text-white font-black text-lg leading-snug mb-3" style={{ letterSpacing: '-0.01em' }}>
          {prog.title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-2">{prog.credential}</p>
        <p className="text-gray-500 text-xs leading-relaxed">{prog.eligibility}</p>
      </div>

      <Link to={prog.anchor} className="mt-6 block">
        <button
          className="w-full text-center text-xs font-bold text-white/80 hover:text-white border border-white/20 hover:border-white/60 rounded-lg py-2.5 transition-all duration-200 hover:bg-white/5"
          style={{ borderColor: `${prog.accentColor}40` }}
          onMouseOver={(e) => (e.currentTarget.style.borderColor = prog.accentColor)}
          onMouseOut={(e) => (e.currentTarget.style.borderColor = `${prog.accentColor}40`)}
        >
          Know more →
        </button>
      </Link>
    </motion.div>
  );
}

function ProgrammesSection() {
  return (
    <section
      id="programmes"
      className="bg-gray-950 py-20 px-6 relative overflow-hidden min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 50%, #a78bfa 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4">
          Entry Points
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-black text-white mb-4"
          style={{ letterSpacing: '-0.02em' }}
        >
          Four ways to work through REACT.
        </motion.h2>
        <p className="text-gray-400 text-base mb-12 max-w-2xl leading-relaxed">
          Every programme at this centre is built on the REACT methodology — the same field immersion, the same proprietary
          frameworks, the same standard of real-world output. What changes is duration, credential, and where you are in your journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {programmes.map((prog, i) => (
            <ProgrammeCard key={prog.title} prog={prog} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── S11: Closing CTA ── */
function ClosingCTASection() {
  return (
    <section
      id="closing-cta"
      className="bg-gray-950 border-t border-white/5 py-24 px-6 min-h-screen flex items-center"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-3xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Cohort 2 admissions are open<br className="hidden sm:block" /> for the 2026 batch.
          </h2>
          <p className="text-gray-400 text-base mb-10 leading-relaxed max-w-xl mx-auto">
            Each programme has a fixed number of seats. If you are a prospective fellow, now is the time.
            If you are an organisation looking to partner, we want to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/apply">
              <button className="px-9 py-4 bg-white text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-xl hover:shadow-amber-400/30 hover:-translate-y-1">
                Apply Now
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-9 py-4 border-2 border-white/30 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                Talk to Us
              </button>
            </Link>
          </div>

          {/* CohortLink-style contact buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {cohortLinks.map((item) => (
              <CohortLinkBtn key={item.label} item={item} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── ROOT EXPORT ───────────────────────────────────────────────────────────────

export default function HomeLanding() {
  // Apply scroll snap to the html element while on this page
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = 'y proximity';
    html.style.scrollBehavior = 'smooth';
    return () => {
      html.style.scrollSnapType = '';
      html.style.scrollBehavior = '';
    };
  }, []);

  return (
    <main>
      <HeroSection />
      <WhatReactIsSection />
      <DomainsSection />
      <OutputsSection />
      <ReactFellowSection />
      <PartnersSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ProgrammesSection />
      <ClosingCTASection />
    </main>
  );
}
