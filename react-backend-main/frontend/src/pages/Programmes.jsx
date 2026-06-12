import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowRight,
  Mail,
  X,
  Globe,
  Copy,
  Check,
  ExternalLink,
  FileText,
  MessageSquare,
  Mic,
  Award,
  Users,
  Calendar,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const programmes = [
  {
    id: 'social-innovation-fellowship',
    number: '01',
    title: 'Social Innovation Fellowship',
    duration: '2 Years',
    credential: 'Diploma in Social Innovation + Partner Degree',
    openTo: 'UG and PG students at Kumaraguru Institutions',
    applicationWindow: 'February to July · Once a year',
    summary:
      'The flagship programme. Two years embedded inside a degree at Kumaraguru Institutions — engineering, management, or social work. You graduate with a credential and a venture, not one or the other.',
    accent: '#E76758',
    gradientFrom: '#E76758',
    gradientTo: '#0F2A44',
    details: [
      {
        heading: 'Who this is for',
        body: 'UG students from second year onward and PG students at KCT, KCTBS, and KCLAS — any branch, any discipline. Students already enrolled at Kumaraguru apply directly.',
      },
      {
        heading: 'Available degree tracks',
        items: [
          'BE / BTech / ME / MTech at KCT',
          'MBA in Entrepreneurship at KCTBS',
          'MSW in Community Development / MA / BSc / BA at KCLAS',
        ],
      },
      { heading: 'Credits', body: '40 credits across 4 semesters' },
      { heading: 'Cohort size', body: '30 fellows per batch' },
      {
        heading: 'What you produce across two years',
        items: [
          'A published or submitted research paper',
          'A filed patent or documented IP record',
          'A working proof of concept, tested and documented in the field',
          'A minimum viable product tested with real users in real conditions',
          'A submitted grant proposal',
          'An investor pitch deck presented at a public Demo Day',
          'A registered or actively developing social venture with a verified community impact report',
        ],
      },
    ],
    applyLabel: 'Apply for the Social Innovation Fellowship',
    learnLabel: 'Learn more about this programme',
    learnHref: '/fellowship/social-innovation-fellowship',
    applyHref: '/apply',
  },
  {
    id: 'social-impact-fellowship',
    number: '02',
    title: 'Social Impact Fellowship',
    duration: '1 Year',
    credential: 'Diploma in Social Innovation',
    openTo: 'Any graduate, anywhere in the world',
    applicationWindow: 'February to July · Once a year',
    summary:
      'The gap year with a permanent outcome. One year, full-time, intensive. For graduates who want to go deep on a real problem before their next chapter. Open to any graduate from any institution.',
    accent: '#0F2A44',
    gradientFrom: '#0F2A44',
    gradientTo: '#1e4a6e',
    details: [
      {
        heading: 'Who this is for',
        body: 'Any graduate from any discipline, any institution, anywhere in the world. Designed for graduates between a first degree and doctoral research, or at the point of deciding which direction their work takes.',
      },
      { heading: 'Credits', body: '40 credits · Full-time · Immersive' },
      {
        heading: 'What you produce',
        items: [
          'A published or submitted research paper',
          'A filed patent or documented IP record',
          'A working proof of concept, tested and documented',
          'A minimum viable product tested with real users',
          'A submitted grant proposal',
          'An investor pitch deck at a public Demo Day',
          'A registered or actively developing social venture with a verified community impact report',
        ],
      },
    ],
    applyLabel: 'Apply for the Social Impact Fellowship',
    learnLabel: 'Learn more about this programme',
    learnHref: '/fellowship/social-impact-fellowship',
    applyHref: '/apply',
  },
  {
    id: 'social-innovation-certification',
    number: '03',
    title: 'Social Innovation Certification',
    duration: 'One Semester',
    credential: 'Certification in Social Innovation',
    openTo: 'Any current student at any institution',
    applicationWindow: 'May–July · Dec–Jan · Twice a year',
    summary:
      'The foundational skill every programme here is built on. One semester. Four gap types. One validated problem statement you carry back to wherever you came from.',
    accent: '#C06840',
    gradientFrom: '#C06840',
    gradientTo: '#E76758',
    details: [
      {
        heading: 'Who this is for',
        body: 'Any current UG, PG, or PhD student at any institution. You return with a validated problem statement, a structured gap analysis, and a documented community understanding.',
      },
      {
        heading: 'The four gaps you learn to map',
        items: [
          'Community Gap — what the community needs that current systems do not provide',
          'Solution Gap — where existing solutions fall short and why they fail at scale',
          'Market Gap — the unserved population and the viable economic model to reach them',
          'User Gap — the distance between what a user says they need and what they will actually adopt',
        ],
      },
      {
        heading: 'What you produce',
        items: [
          'Validated problem statement',
          'Structured gap analysis across all four gap types',
          'Documented community understanding',
        ],
      },
    ],
    applyLabel: 'Apply for the Social Innovation Certification',
    learnLabel: 'Learn more about this programme',
    learnHref: '/fellowship/social-innovation-certification',
    applyHref: '/apply',
  },
  {
    id: 'field-internship',
    number: '04',
    title: 'Field Internship',
    duration: 'Variable',
    credential: 'No formal credential',
    openTo: 'Students and early-career professionals',
    applicationWindow: 'Rolling intake · Write to us',
    summary:
      'Immersive, short-term placement inside live programme work. Every position has real stakes and a real deliverable. This is not observation — every intern contributes to active fellow projects.',
    accent: '#374151',
    gradientFrom: '#374151',
    gradientTo: '#101827',
    details: [
      {
        heading: 'Who this is for',
        body: 'Any student or early-career professional. Positions are confirmed individually, case by case, based on active programme needs.',
      },
      {
        heading: 'What you work on',
        items: [
          'Community gap analysis — working directly with communities to map unmet needs',
          'Solution gap research — analysing why existing interventions have failed at scale',
          'Market gap mapping — identifying unserved populations and viable economic models',
          'Programme operations — understanding how a social innovation centre functions in the Indian development context',
        ],
      },
      {
        heading: 'How to apply',
        body: 'Write directly to info.react@kumaraguru.in with your background, availability, and which area you want to work in. Positions confirmed on a rolling basis.',
      },
    ],
    applyLabel: 'Enquire About Field Internships',
    learnLabel: 'Learn more about field internships',
    learnHref: '/fellowship/field-internship',
    applyHref: 'mailto:info.react@kumaraguru.in',
  },
];

const fellowBenefits = [
  'REACT Fellow certificate — permanent, not a graduation award',
  'Permanent entry into the REACT Fellow network',
  'Mentor access and incubation pipeline priority for two years beyond graduation',
  'Priority consideration for grant introductions and investor connections',
  'A permanent record in the REACT Fellow archive, distinguished from all other alumni',
];

const selectionStages = [
  {
    stage: '01',
    Icon: FileText,
    title: 'Written Application',
    body: 'A 500-word personal statement and your initial domain choice.',
    color: '#E76758',
    bg: '#FFF0EE',
  },
  {
    stage: '02',
    Icon: MessageSquare,
    title: 'Problem Framing Exercise',
    body: 'A structured written response to a real domain challenge. The question is how you think, not what you already know.',
    color: '#0F2A44',
    bg: '#EEF4FB',
  },
  {
    stage: '03',
    Icon: Mic,
    title: 'Panel Interview',
    body: 'A conversation with the Faculty Mentor and Domain Coordinator for your chosen domain.',
    color: '#C06840',
    bg: '#FDF4EE',
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

// ─────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROGRAMME CARD  (3-D tilt, equal sizing, slide-in)
// ─────────────────────────────────────────────────────────────
function ProgrammeCard({ programme, index, onClick }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const slideX = index % 2 === 0 ? -70 : 70;

  function onMouseMove(e) {
    const el = outerRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    inner.style.transform = `perspective(1100px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) scale(1.025)`;
    inner.style.boxShadow = `
      ${x * -12}px ${y * -12}px 40px rgba(0,0,0,0.08),
      0 24px 48px rgba(0,0,0,0.10)
    `;
  }

  function onMouseLeave() {
    const inner = innerRef.current;
    if (!inner) return;
    inner.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)';
    inner.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)';
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: slideX, y: 30 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div
        ref={outerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={() => onClick(programme)}
        className="h-full cursor-pointer"
        style={{ perspective: '1100px' }}
      >
        <article
          ref={innerRef}
          className="h-full flex flex-col rounded-2xl border border-slate-200/80 bg-white overflow-hidden group"
          style={{
            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Gradient top accent */}
          <div
            className="h-1.5 w-full shrink-0"
            style={{
              background: `linear-gradient(90deg, ${programme.gradientFrom}, ${programme.gradientTo})`,
            }}
          />

          <div className="flex flex-col flex-1 p-6 sm:p-7">
            {/* Number + Duration badge */}
            <div className="flex items-start justify-between mb-5">
              <span
                className="text-7xl font-black leading-none select-none"
                style={{ color: `${programme.accent}18` }}
                aria-hidden="true"
              >
                {programme.number}
              </span>
              <span
                className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full shrink-0"
                style={{ color: programme.accent, background: `${programme.accent}14` }}
              >
                {programme.duration}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4">
              {programme.title}
            </h3>

            {/* Meta info */}
            <dl className="space-y-2.5 mb-5">
              <div className="flex items-start gap-2.5">
                <Award className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                <dd className="text-[13px] text-slate-600 leading-snug">{programme.credential}</dd>
              </div>
              <div className="flex items-start gap-2.5">
                <Users className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                <dd className="text-[13px] text-slate-600 leading-snug">{programme.openTo}</dd>
              </div>
              <div className="flex items-start gap-2.5">
                <Calendar className="h-3.5 w-3.5 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                <dd className="text-[13px] text-slate-600 leading-snug">{programme.applicationWindow}</dd>
              </div>
            </dl>

            {/* Summary — grows to fill */}
            <p className="flex-1 text-[14px] leading-relaxed text-slate-500 line-clamp-3">
              {programme.summary}
            </p>

            {/* CTA hint */}
            <div
              className="mt-5 pt-5 border-t border-slate-100 flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-3"
              style={{ color: programme.accent }}
            >
              <span>View Programme</span>
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>
          </div>
        </article>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// FULL-SCREEN POPUP MODAL  — wide two-panel layout
// ─────────────────────────────────────────────────────────────
function ProgrammeModal({ programme, onClose }) {
  const applyHref = programme.applyHref || '/apply';
  const applyExternal = applyHref.startsWith('mailto:');

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#0a1628]/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
      />

      {/* Modal — wide, two-panel */}
      <motion.div
        className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col lg:flex-row overflow-hidden rounded-3xl"
        initial={{ opacity: 0, scale: 0.86, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 28 }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        style={{
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.07), 0 48px 96px rgba(0,0,0,0.52), 0 8px 24px rgba(0,0,0,0.28)',
        }}
      >
        {/* ── LEFT PANEL — identity + meta */}
        <div
          className="relative shrink-0 flex flex-col lg:w-[320px] xl:w-[360px] text-white"
          style={{
            background: `linear-gradient(160deg, ${programme.gradientFrom} 0%, ${programme.gradientTo} 100%)`,
          }}
        >
          {/* Decorative blobs — clipped to this panel only */}
          <div className="absolute inset-0 overflow-hidden rounded-tl-3xl rounded-bl-3xl pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, white, transparent 70%)' }}
            />
            <div
              className="absolute bottom-10 -left-10 h-48 w-48 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, white, transparent 70%)' }}
            />
          </div>

          {/* Close — mobile only */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 lg:hidden z-10 p-2 rounded-full bg-white/15 hover:bg-white/28 text-white transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Scrollable content area */}
          <div className="relative flex-1 overflow-y-auto min-h-0 px-7 pt-8 pb-4 scroll-modern-light">
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.3em]">
              Programme {programme.number}
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-snug">
              {programme.title}
            </h2>

            <p className="mt-4 text-white/80 text-[13.5px] leading-relaxed">
              {programme.summary}
            </p>

            {/* Meta table */}
            <dl className="mt-5 space-y-3.5">
              {[
                { label: 'Duration', value: programme.duration },
                { label: 'Credential', value: programme.credential },
                { label: 'Open to', value: programme.openTo },
                { label: 'Application window', value: programme.applicationWindow },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 mb-0.5">
                    {label}
                  </dt>
                  <dd className="text-[13px] font-semibold text-white/90 leading-snug">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* CTA buttons — always pinned at bottom, never clipped */}
          <div className="relative shrink-0 px-7 pb-7 pt-4 flex flex-col gap-2.5 border-t border-white/10">
            {applyExternal ? (
              <a
                href={applyHref}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white border-2 border-white/30 hover:bg-white/15 transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {programme.applyLabel}
              </a>
            ) : (
              <Link
                to={applyHref}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold bg-white transition-colors hover:bg-white/90"
                style={{ color: programme.accent }}
              >
                {programme.applyLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
            <Link
              to={programme.learnHref}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white border border-white/25 hover:bg-white/10 transition-colors"
            >
              {programme.learnLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* ── RIGHT PANEL — details (scrollable) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Close — top-right on desktop */}
          <div className="hidden lg:flex shrink-0 items-center justify-between px-8 pt-6 pb-4 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
              Programme details
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable details */}
          <div className="flex-1 overflow-y-auto px-7 sm:px-8 py-7 scroll-modern-dark">
            <div className="space-y-8">
              {programme.details.map((detail, i) => (
                <motion.section
                  key={detail.heading}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
                >
                  {/* Section heading */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="h-0.5 w-6 rounded-full shrink-0"
                      style={{ background: programme.accent }}
                      aria-hidden="true"
                    />
                    <h3
                      className="text-[11px] font-black uppercase tracking-[0.26em]"
                      style={{ color: programme.accent }}
                    >
                      {detail.heading}
                    </h3>
                  </div>

                  {detail.body && (
                    <p className="text-[15px] leading-relaxed text-slate-700 font-medium pl-9">
                      {detail.body}
                    </p>
                  )}

                  {detail.items && (
                    <ul className="pl-9 mt-1 space-y-2.5">
                      {detail.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[14.5px] leading-relaxed text-slate-700 font-medium"
                        >
                          <span
                            className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                            style={{ background: programme.accent }}
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.section>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// STAGE CARD
// ─────────────────────────────────────────────────────────────
function StageCard({ stage, index }) {
  const ref = useRef(null);
  const articleRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  function onMouseMove(e) {
    const el = articleRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-5px)`;
    el.style.boxShadow = '0 20px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)';
  }

  function onMouseLeave() {
    const el = articleRef.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)';
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 65 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="h-full"
    >
      <article
        ref={articleRef}
        className="relative h-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-7"
        style={{
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: stage.bg }}
        >
          <stage.Icon className="h-5 w-5" style={{ color: stage.color }} aria-hidden="true" />
        </div>

        <p
          className="text-[10.5px] font-bold uppercase tracking-[0.24em] mb-2"
          style={{ color: stage.color }}
        >
          Stage {stage.stage}
        </p>
        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3">{stage.title}</h3>
        <p className="text-[14px] leading-relaxed text-slate-600">{stage.body}</p>

        {/* Watermark number */}
        <div
          className="absolute -bottom-2 right-4 text-8xl font-black leading-none select-none pointer-events-none"
          style={{ color: `${stage.color}0D` }}
          aria-hidden="true"
        >
          {stage.stage}
        </div>
      </article>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// COHORT LINK (clipboard / external)
// ─────────────────────────────────────────────────────────────
function CohortLink({ item }) {
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
        <item.Icon className="h-4 w-4 opacity-75" aria-hidden="true" />
        <span>{item.label}</span>
        <ExternalLink className="h-3 w-3 opacity-45" aria-hidden="true" />
      </a>
    );
  }

  return (
    <button onClick={handleCopy} className={base} aria-label={`Copy ${item.label} to clipboard`}>
      {copied ? (
        <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
      ) : (
        <item.Icon className="h-4 w-4 opacity-75" aria-hidden="true" />
      )}
      <span className="transition-all">
        {copied ? 'Copied to clipboard!' : item.label}
      </span>
      {!copied && <Copy className="h-3 w-3 opacity-45" aria-hidden="true" />}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export const Programmes = () => {
  const cardsRef = useRef(null);
  const [selectedProgramme, setSelectedProgramme] = useState(null);

  function scrollToCards() {
    cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F7FA] text-slate-900">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white px-6 pb-24 pt-24 sm:pb-28 sm:pt-36">
        {/* Floating gradient orbs */}
        <motion.div
          className="pointer-events-none absolute -top-24 -right-24 h-[32rem] w-[32rem] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(231,103,88,0.12) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(15,42,68,0.09) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          aria-hidden="true"
        />

        {/* 3-D floating card visual (desktop) */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38vw] max-w-[28rem] items-center justify-center lg:flex"
          aria-hidden="true"
        >
          <div style={{ perspective: '900px' }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-2xl border border-slate-200/60"
                style={{
                  width: `${16 - i * 2.6}rem`,
                  height: `${10 - i * 1.6}rem`,
                  top: `${i * 1.8}rem`,
                  left: `${i * 1.6}rem`,
                  background:
                    i === 2
                      ? 'rgba(231,103,88,0.10)'
                      : 'linear-gradient(135deg, rgba(15,42,68,0.06), rgba(231,103,88,0.06))',
                  backdropFilter: 'blur(2px)',
                  transform: `rotateX(52deg) rotateZ(-14deg) translateZ(${i * 30}px)`,
                  boxShadow: '0 20px 60px rgba(15,42,68,0.09)',
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4 + i * 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.6,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Centre for REACT
          </motion.p>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <motion.span
              className="block text-[#0F2A44]"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              One standard.
            </motion.span>
            <motion.span
              className="block text-[#E76758]"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            >
              Four ways to meet it.
            </motion.span>
          </h1>

          <motion.p
            className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.66, ease: [0.22, 1, 0.36, 1] }}
          >
            The REACT methodology is the same across every programme — the field immersion, the
            frameworks, the real-world output. What changes is your entry point, your duration, and
            the credential you carry out. Choose the one that fits where you stand today.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.84, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={scrollToCards}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F2A44] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#153a5d]"
            >
              Find Your Programme
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <Link
              to="/apply"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-50"
            >
              Apply Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAMME CARDS ── */}
      <section ref={cardsRef} id="programmes" className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Four programmes. Every one built on REACT.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              From a two-year fellowship with a degree to a semester-long certification — every
              programme runs on the same methodology, demands the same rigour, and produces people
              with something real to show for it.
            </p>
          </FadeUp>

          {/* 2 × 2 grid — all cards same height */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {programmes.map((programme, index) => (
              <ProgrammeCard
                key={programme.id}
                programme={programme}
                index={index}
                onClick={setSelectedProgramme}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedProgramme && (
          <ProgrammeModal
            programme={selectedProgramme}
            onClose={() => setSelectedProgramme(null)}
          />
        )}
      </AnimatePresence>

      {/* ── REACT FELLOW ── */}
      <section className="bg-[#0F2A44] px-6 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFB4AA]">
                  The REACT Fellow
                </p>
                <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                  The rarest thing this centre produces.
                </h2>
                <p className="mt-5 text-xl leading-relaxed text-white/78">
                  And the only thing it cannot give — only recognise.
                </p>
              </div>
              <div className="space-y-5 text-[15px] leading-relaxed text-white/74 sm:text-base">
                <p>
                  Every fellow who completes a programme receives a Diploma in Social Innovation and
                  their credential. That is what completion earns and every completing fellow
                  deserves it fully.
                </p>
                <p>The REACT Fellow designation is different in kind.</p>
                <p>
                  Two years of the REACT methodology — living inside a real problem, building under
                  field conditions, producing verified evidence that something changed for real people
                  — does not leave a person unchanged.
                </p>
                <p>The REACT Fellow designation is awarded to the people who prove that belief correct.</p>
                <p>
                  The first proof is registering a venture during the final semester. What the
                  designation truly recognises is what comes after. Whether the person continues.
                  Whether they thrive in it.
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-12 grid gap-8 border-t border-white/15 pt-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h3 className="text-xl font-semibold text-white">What REACT Fellows receive</h3>
                <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-white/76">
                  {fellowBenefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB4AA]"
                        aria-hidden="true"
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <blockquote className="border-l-4 border-[#E76758] pl-6 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                "The designation cannot be applied for. The venture does not complete it. What comes
                after does."
              </blockquote>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THREE STAGES ── */}
      <section className="bg-white px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E76758] mb-3">
              Selection Process
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Three stages. Zero compromise.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              The centre selects on quality of thinking and depth of commitment — problem curiosity,
              cross-context adaptability, collaborative drive. All three visible before any
              examination result.
            </p>
          </FadeUp>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {selectionStages.map((stage, index) => (
              <StageCard key={stage.stage} stage={stage} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COHORT 2 CTA ── */}
      <section className="bg-[#101827] px-6 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Cohort 2 is forming now.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/72">
              Applications are open. Each programme has a fixed number of seats and a fixed window.
              If you know which programme is yours, apply. If you are still deciding, each programme
              page has everything you need to choose.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center rounded-full bg-[#E76758] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#d8584a]"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Talk to Us First
              </Link>
            </div>

            {/* Contact / site links as CTAs */}
            <div className="mt-9 flex flex-wrap gap-3">
              {cohortLinks.map((item) => (
                <CohortLink key={item.label} item={item} />
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
};
