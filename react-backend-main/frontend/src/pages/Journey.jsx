import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const frameworks = [
  {
    id: 'dif',
    name: 'Domain Intelligence Framework',
    description:
      'Nine structured lenses applied to every problem before anything is built. They surface what most practitioners miss — who benefits from the problem remaining unsolved, why previous solutions failed at scale, where the genuine leverage point lies, and what kind of intervention can realistically change things. A fellow who has worked through all nine lenses can diagnose a problem. The specific lenses are proprietary to the centre and are not disclosed externally.',
    active: 'Phase 0 and Phase 1',
  },
  {
    id: 'mmd',
    name: 'MMD Build Classification',
    description:
      'Every solution built at the centre is classified as Material, Method, or Design — mapped directly to the Indian Patents Act. Material is a substance, compound, or formulation that is physically distinct and novel. Method is a process, protocol, or sequence that produces a repeatable outcome. Design is a device, system, software, or architecture that integrates components into a functioning whole. This classification is determined before building begins and anchors the entire IP strategy.',
    active: 'Phase 2 onward',
  },
  {
    id: 'calibrate',
    name: 'CALIBRATE Community Assessment',
    description:
      'Eighteen structured questions assessed before any fellow enters a community with a proposed solution — readiness, trust, infrastructure, governance, and the existing intervention landscape. A solution does not arrive until the community is ready to receive it and the fellow has earned the social permission to work there.',
    active: 'Phase 1 and Phase 3',
  },
];

const phaseCards = [
  { number: 0, id: 'phase-0', designation: 'Civic Fellow', duration: '14 Days', focus: 'Community Immersion' },
  { number: 1, id: 'phase-1', designation: 'Researcher', duration: 'Months 1 to 6', focus: 'Problem Validation' },
  { number: 2, id: 'phase-2', designation: 'Engineer', duration: 'Months 7 to 12', focus: 'Proof of Concept' },
  { number: 3, id: 'phase-3', designation: 'Builder', duration: 'Months 13 to 18', focus: 'Minimum Viable Product' },
  { number: 4, id: 'phase-4', designation: 'Venture Founder', duration: 'Months 19 to 24', focus: 'Venture Registration' },
];

const phases = [
  {
    id: 'phase-0',
    number: 0,
    tag: 'PHASE 0  ·  14 DAYS',
    designation: 'Civic Fellow',
    subtitle: 'Community Immersion',
    paragraphs: [
      'Before any building. Before any research. Before any framework. Every fellow begins in the field — living inside the communities they will eventually build for. They eat there. They listen there. They sit with people who have carried the weight of a problem for years, sometimes for generations.',
      'The Civic Fellow phase is for unlearning. Most fellows arrive with assumptions about how communities work and what they need. Fourteen days of structured immersion across five reality tracks in the Coimbatore region dismantles those assumptions at the root. This is proximity — physical, daily, unavoidable — to realities that most fellows have spent their entire lives insulated from.',
      'The five reality tracks: smallholder agriculture, water and sanitation infrastructure, government school systems, primary health access, informal labour.',
      'Fellows are observers with a discipline and a mission — to find the unsaid story. The story that does not appear in any survey because it requires trust to surface. The story a farmer will tell on Day 4, not Day 1.',
    ],
    coursesLabel: 'Course in this phase',
    courses: [
      {
        name: 'Civic Fellow Immersion',
        description:
          'Structured field observation across all five reality tracks using the Domain Intelligence Framework as the diagnostic lens. Fellows produce Domain Intelligence Cards for each domain encountered.',
      },
    ],
    gateLabel: 'Gate outputs — all three required to advance',
    gates: [
      'Field paper — publication-ready standard, data-supported, containing a genuine insight that could only have been written from inside the immersion',
      'Short documentary — watchable by a general audience, clear editorial point of view, all subjects consented',
      'Validated problem shortlist — at least three field-observed problems, each defensible, each carrying a viable venture lens',
    ],
  },
  {
    id: 'phase-1',
    number: 1,
    tag: 'PHASE 1  ·  MONTHS 1 TO 6',
    designation: 'Researcher',
    subtitle: 'Problem Validation',
    paragraphs: [
      'The problem chosen at the end of Phase 0 is now tested against reality. Fellows validate it against national data, map it against every existing solution, and conduct a minimum of fifteen structured interviews with people who live the problem directly.',
      'The Domain Intelligence Framework is applied in full — all nine lenses completed for the chosen problem. By the end, a fellow can diagnose their problem with systemic depth. CALIBRATE is used for the first time here, assessing the community before any proposed intervention is taken to them.',
    ],
    coursesLabel: 'Courses in this phase',
    courses: [
      {
        name: 'Social Problem Intelligence',
        description:
          'Problem definition against national data, root cause analysis, stakeholder mapping, research paper to publication standard.',
      },
      {
        name: 'Applied Engineering Fundamentals',
        description:
          'Hands-on engineering sprints that give every fellow a working understanding of physical and digital build processes, regardless of academic background.',
      },
      {
        name: 'Technology Gap Analysis',
        description:
          'Full landscape review of existing solutions, TRL scoring, precise identification of the gap by type — material, method, or access.',
      },
      {
        name: 'Expertise Development 1',
        description:
          "Domain-specific deep knowledge in the fellow's chosen impact area, building the specialisation that makes their problem diagnosis sharper than a generalist's.",
      },
    ],
    gateLabel: 'Gate outputs',
    gates: [
      'Research Report — 8 to 12 pages, mentor panel reviewed, publication-ready standard',
      'Technology Gap Analysis — confidential, entered into REACT internal repository',
    ],
  },
  {
    id: 'phase-2',
    number: 2,
    tag: 'PHASE 2  ·  MONTHS 7 TO 12',
    designation: 'Engineer',
    subtitle: 'Proof of Concept',
    paragraphs: [
      'Building begins. Fellows use institutional labs, workshops, and fabrication facilities to construct the first working demonstration that their solution is physically or digitally possible. The MMD Build Classification is applied — the nature of what is being built is determined before the first component is sourced. IP strategy is developed in parallel and filings are prepared.',
      'Every decision made in this phase is grounded in what the field has already taught. The community is not a testing venue — it is a co-author of what gets built.',
    ],
    coursesLabel: 'Courses in this phase',
    courses: [
      {
        name: 'Proof of Concept Development',
        description:
          'PoC scoping, build-test-iterate discipline, fabrication using institutional infrastructure, technical file documentation to IP-compatible standard.',
      },
      {
        name: 'Intellectual Property Strategy',
        description:
          'Patent landscape search, MMD classification in IP context, trade secret decision, provisional filing preparation mapped to the Indian Patents Act.',
      },
      {
        name: 'Expertise Development 2',
        description:
          "Advancing domain specialisation — deepening the fellow's knowledge of existing interventions, field partners, and technical approaches specific to their impact area.",
      },
      {
        name: 'Expertise Development 3',
        description:
          "Applied domain knowledge in the context of the fellow's specific problem and build — mentored by domain practitioners with field experience.",
      },
    ],
    gateLabel: 'Gate outputs',
    gates: [
      'Working proof of concept with documented test results across a minimum of two complete build-test-iterate cycles',
      'IP filing or formally documented trade secret strategy',
    ],
  },
  {
    id: 'phase-3',
    number: 3,
    tag: 'PHASE 3  ·  MONTHS 13 TO 18',
    designation: 'Builder',
    subtitle: 'Minimum Viable Product',
    paragraphs: [
      'The proof of concept becomes a product. Fellows develop a minimum viable product or functional prototype and test it with real users in real conditions. CALIBRATE is applied again before the MVP is taken to the community — readiness, trust, and permission are reassessed for the intervention stage.',
      'Iteration continues until evidence exists that the solution works and under exactly what conditions it works. The field, not the lab, is the client throughout. User testing. Affinity mapping. Iteration records. Unit cost modelling. This phase is where the fellow crosses from proving something is possible to proving something is usable.',
    ],
    coursesLabel: 'Courses in this phase',
    courses: [
      {
        name: 'Product Development and Scale',
        description:
          'MVP specification, user testing protocols, affinity mapping, design for manufacturing, unit economics across three production scenarios.',
      },
      {
        name: 'Grant Writing and Advocacy',
        description:
          'Grant application to a live scheme, Theory of Change with measurable indicators, impact writing to investor and funder standard.',
      },
      {
        name: 'Expertise Development 4',
        description:
          'Domain specialisation applied to the MVP context — what does best practice look like for products or services in this domain at scale.',
      },
      {
        name: 'Expertise Development 5',
        description:
          "Venture landscape in the fellow's domain — key players, remaining gaps, how the fellow's venture is positioned within the ecosystem.",
      },
    ],
    gateLabel: 'Gate outputs',
    gates: [
      'User-tested MVP or prototype — minimum five users, documented observation logs, V1 to V2 comparison',
      'Unit cost model — three scenarios at 10, 100, and 1,000 units',
      'Grant application formally submitted to at least one live scheme, receipt required',
    ],
  },
  {
    id: 'phase-4',
    number: 4,
    tag: 'PHASE 4  ·  MONTHS 19 TO 24',
    designation: 'Venture Founder',
    subtitle: 'Venture Registration',
    paragraphs: [
      'The fellow becomes a founder. A business model is built. A ten-slide investor pitch deck is prepared and presented at a public Demo Day — before investors, industry, faculty, NGO partners, and community members.',
      'The venture is registered during the final semester. A company, an LLP, or an NGO — directly connected to the REACT project, built for the community the fellow spent two years understanding. Registration is the gate. The impact report is verified by that community.',
    ],
    coursesLabel: 'Courses in this phase',
    courses: [
      {
        name: 'Venture Architecture',
        description:
          'Entity structure and registration, business model canvas, revenue model with unit economics, equity structure, GTM plan for first 100 users, DPIIT startup recognition.',
      },
      {
        name: 'Financial Modelling and Economics',
        description:
          'Three-year financial model, cap table mechanics, funding round modelling, unit economics across scenarios.',
      },
      {
        name: 'Communication and Brand Strategy',
        description:
          'Ten-slide pitch deck, brand brief, origin story with community as hero, Demo Day preparation and rehearsal, SDG alignment documentation.',
      },
    ],
    gateLabel: 'Gate outputs',
    gates: [
      'Investor pitch deck — ten slides, presented at public Demo Day, written feedback from cohort and external reviewer',
      'Registered venture — company or NGO, documents submitted to REACT programme office during the final semester',
      'Social Impact Report — 2,000 to 3,000 words, NGO-verified evidence of measurable change',
    ],
  },
];

const ventureTypes = [
  {
    name: 'Commercial Venture',
    definition:
      'A market-facing entity that solves a problem through a product or service and is financially self-sustaining. It grows because it earns. It earns because it works.',
    registeredAs: 'Startup — private limited, LLP, or sole proprietorship',
    examples: ['AgriTech product', 'Health diagnostic device', 'Artisan marketplace platform'],
  },
  {
    name: 'Social Venture',
    definition:
      'A community-facing organisation that addresses a problem through coordinated action, services, or advocacy. Social impact is the primary metric. Earned revenue sustains the mission.',
    registeredAs: 'NGO · Section 8 Company · Self-Help Group · Cooperative',
    examples: ['Community health programme', 'Farmer cooperative', 'Livelihood collective'],
  },
  {
    name: 'Civic Venture',
    definition:
      'A systemic intervention that organises people around a structural problem to create durable public change.',
    registeredAs: 'Movement · Residents Association · Think Tank · Policy Institute · Collective',
    examples: ['Urban governance coalition', 'District-level water forum', 'Cultural preservation body'],
  },
];

const gateColumns = [
  {
    title: 'What a gate assesses',
    body: 'Whether the fellow produced the required work to the required standard. The question is always the same: is this real enough to build on?',
  },
  {
    title: 'What happens when a gate is passed',
    body: 'The fellow earns their new designation and advances to the next phase. Written mentor feedback documents what was strong and what to carry forward.',
  },
  {
    title: 'What happens when resubmission is required',
    body: 'A structured seven-day revision window with written feedback on exactly what is missing. A resubmission reviewed by the same panel. If further work is required, a direct conversation with the Programme Director. A fellow is never removed without that conversation.',
  },
];

const weeklyAnchors = [
  {
    name: 'Mentor Review',
    description:
      'One-on-one with the assigned domain mentor. Progress, blockers, next steps. The highest-leverage hour of the week. Three unexcused absences trigger a formal notice. Five trigger a probationary review.',
  },
  {
    name: 'Documentation Log',
    description:
      'A brief structured weekly submission — what was accomplished, what was learned, what is blocked, what the next week requires. Filed on the programme platform. Builds the documentation discipline that every researcher and founder needs before they need it.',
  },
  {
    name: 'Cohort Share',
    description:
      'A five-minute update to the full cohort every week. What was built, what was tested, what the next milestone is. Creates the culture of shared progress that makes a cohort more than a collection of individuals working in parallel.',
  },
];

const portfolioLayers = [
  {
    number: 1,
    name: 'Identity',
    content: 'Domain specialisation, problem statement, venture type, one-page fellow profile.',
  },
  {
    number: 2,
    name: 'Evidence of Thinking',
    content: 'Field paper from the Civic Fellow phase, research report, technology gap analysis.',
  },
  {
    number: 3,
    name: 'Evidence of Building',
    content: 'Proof of concept documentation, IP filing record, MVP or prototype evidence, user testing feedback, iteration records.',
  },
  {
    number: 4,
    name: 'Evidence of Venturing',
    content: 'Business model, grant proposal, pitch deck, venture documentation, impact report.',
  },
  {
    number: 5,
    name: 'Evidence of Leadership',
    content: 'Gate assessment records and written mentor evaluations at each phase transition.',
  },
  {
    number: 6,
    name: 'Community Voice',
    content: "Statements from field partners and community members who witnessed the fellow's work and can speak to its impact.",
  },
  {
    number: 7,
    name: 'Recognition',
    content: 'Competition results, pitching records, module certifications, domain specialisation credential.',
  },
  {
    number: 8,
    name: 'The Fellow Statement',
    content: 'A 500-word personal reflection written at graduation — what the fellow believed at entry, what the field changed, what comes next. Sealed at graduation and never edited.',
  },
];

const cohortTypes = [
  {
    label: 'Freshly directed',
    description:
      'Graduates who arrive with clear intent. They know what they want to build. REACT provides the structure, the field access, and the institutional backing to make that intent real. Their ambition drives the cohort forward.',
  },
  {
    label: 'Field-experienced',
    description:
      'Practitioners who carry intelligence no classroom produces. From NGO work, government implementation, community practice, development research. Their presence grounds the cohort in consequence. They know what a problem actually resists.',
  },
];

/* ─────────────────────────────────────────────
   UTILITY: smooth-scroll to element
───────────────────────────────────────────── */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 88; // navbar height
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/* ─────────────────────────────────────────────
   SECTION WRAPPER — consistent section padding
───────────────────────────────────────────── */
function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`py-24 px-6 md:px-12 lg:px-20 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION LABEL — small uppercase eyebrow
───────────────────────────────────────────── */
function EyeBrow({ children }) {
  return (
    <p
      style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '0.15em' }}
      className="text-xs uppercase font-semibold text-[#E05C3A] mb-4 tracking-widest"
    >
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────
   CTA BUTTON
───────────────────────────────────────────── */
function CTAButton({ to, variant = 'primary', children }) {
  const base =
    'inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E05C3A]/60';
  const styles =
    variant === 'primary'
      ? 'bg-[#E05C3A] text-white hover:bg-[#c94d2e] shadow-lg hover:shadow-[#E05C3A]/30 hover:-translate-y-0.5'
      : 'border border-[#1a2c4e] text-[#1a2c4e] hover:bg-[#1a2c4e] hover:text-white hover:-translate-y-0.5';
  return (
    <Link to={to} className={`${base} ${styles}`}>
      {children}
      <ArrowRight size={15} />
    </Link>
  );
}

/* ─────────────────────────────────────────────
   JOURNEY PAGE
───────────────────────────────────────────── */
export function Journey() {
  const [activePhaseCard, setActivePhaseCard] = useState(null);
  const [visibleSections, setVisibleSections] = useState({});

  // Intersection observer for scroll-in animations
  useEffect(() => {
    const targets = document.querySelectorAll('[data-animate]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [e.target.dataset.animate]: true }));
          }
        });
      },
      { threshold: 0.08 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  function fadeIn(key, delay = 0) {
    return {
      'data-animate': key,
      style: {
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: visibleSections[key] ? 1 : 0,
        transform: visibleSections[key] ? 'translateY(0)' : 'translateY(28px)',
      },
    };
  }

  return (
    <div
      style={{ fontFamily: "'Poppins', 'Arial', sans-serif" }}
      className="bg-white text-[#1a2c4e]"
    >
      {/* ═══════════════════════════════════
          SECTION 00  ·  HERO
      ═══════════════════════════════════ */}
      <section
        id="journey-hero"
        className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        {/* Background pattern */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 60% 30%, rgba(224,92,58,0.07) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 10% 80%, rgba(26,44,78,0.05) 0%, transparent 60%)',
          }}
        />
        {/* Grid lines */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(26,44,78,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(26,44,78,0.04) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E05C3A]/30 bg-[#E05C3A]/5 mb-10"
            style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '0.12em' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E05C3A] inline-block" />
            <span className="text-[10px] uppercase font-semibold text-[#E05C3A]">
              Centre for REACT  ·  Journey
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#1a2c4e] leading-[1.05] mb-10"
            style={{ letterSpacing: '-0.02em' }}
          >
            Two years.<br />
            <span className="text-[#E05C3A]">The structure that turns</span><br className="hidden md:block" />
            <span>a student into a founder.</span>
          </h1>

          {/* Sub-heading — three lines */}
          <div className="mb-12 space-y-3 max-w-2xl">
            {[
              'Five phases. Three proprietary frameworks. Domain expertise built course by course.',
              'A gate at the end of every phase — real assessment, real standards, real consequences.',
              'Two years that produce a researcher, a builder, a founder, and a venture that continues after graduation.',
            ].map((line, i) => (
              <p
                key={i}
                className="text-[#1a2c4e]/70 text-base md:text-lg leading-relaxed"
                style={{ borderLeft: '2px solid rgba(224,92,58,0.3)', paddingLeft: '1rem' }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <CTAButton to="/apply" variant="primary">
              Apply Now
            </CTAButton>
            <CTAButton to="/programme" variant="secondary">
              See the Programmes
            </CTAButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo('section-01')}
          aria-label="Scroll to next section"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
        >
          <ChevronDown size={22} className="text-[#1a2c4e] animate-bounce" />
        </button>
      </section>

      {/* ═══════════════════════════════════
          SECTION 01  ·  THREE FRAMEWORKS
      ═══════════════════════════════════ */}
      <Section id="section-01" className="bg-[#f8f6f3]">
        <div {...fadeIn('fw-head')}>
          <EyeBrow>Three Frameworks</EyeBrow>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2c4e] mb-4 leading-tight">
            Three frameworks.<br />The methodology made operational.
          </h2>
          <p className="text-[#1a2c4e]/65 text-base md:text-lg max-w-3xl mb-16 leading-relaxed">
            The REACT methodology is built on three proprietary frameworks that run through the programme from the first day of field immersion to the final venture registration. Every fellow uses all three. They are what separates a REACT-trained problem solver from everyone else.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frameworks.map((fw, i) => (
            <div
              key={fw.id}
              {...fadeIn(`fw-${fw.id}`, i * 120)}
              className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(224,92,58,0.1)' }}
              >
                <span className="text-[#E05C3A] font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-lg font-bold text-[#1a2c4e] mb-3 leading-snug">{fw.name}</h3>
              <p className="text-[#1a2c4e]/65 text-sm leading-relaxed flex-1">{fw.description}</p>
              <div className="mt-6 pt-5 border-t border-black/5">
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ fontFamily: 'Arial, sans-serif', color: '#E05C3A' }}
                >
                  Active in:
                </span>
                <p className="text-[#1a2c4e] text-sm font-medium mt-0.5">{fw.active}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════
          SECTION 02  ·  IDENTITY ARC
      ═══════════════════════════════════ */}
      <Section id="section-02" className="bg-white">
        <div {...fadeIn('arc-head')}>
          <EyeBrow>The Identity Arc</EyeBrow>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2c4e] mb-4 leading-tight">
            Five phases. Five identities. One arc.
          </h2>
          <p className="text-[#1a2c4e]/65 text-base md:text-lg max-w-3xl mb-16 leading-relaxed">
            Fellows do not just complete tasks across two years. They earn designations that mark a real shift in capability. Each phase has its own focus, its own courses, its own outputs, and its own gate. The arc moves from unlearning to founding.
          </p>
        </div>

        {/* Phase cards arc */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {phaseCards.map((card, i) => {
            // Arc elevation effect: centre card is highest
            const arcElevations = ['lg:mt-6', 'lg:mt-3', 'lg:mt-0', 'lg:mt-3', 'lg:mt-6'];
            const isActive = activePhaseCard === i;
            return (
              <button
                key={card.id}
                id={`arc-card-${card.number}`}
                onClick={() => {
                  setActivePhaseCard(isActive ? null : i);
                  scrollTo(card.id);
                }}
                aria-label={`Go to Phase ${card.number}: ${card.designation}`}
                className={`
                  group text-left rounded-2xl p-6 border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E05C3A]/50
                  ${arcElevations[i]}
                  ${isActive
                    ? 'bg-[#1a2c4e] border-[#1a2c4e] shadow-xl shadow-[#1a2c4e]/20 text-white'
                    : 'bg-[#f8f6f3] border-black/5 hover:bg-[#1a2c4e] hover:border-[#1a2c4e] hover:shadow-xl hover:shadow-[#1a2c4e]/20 hover:text-white'
                  }
                `}
              >
                <div className={`text-xs font-bold mb-4 ${isActive ? 'text-[#E05C3A]' : 'text-[#E05C3A] group-hover:text-[#E05C3A]'}`}
                  style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '0.1em' }}
                >
                  PHASE {card.number}
                </div>
                <div className={`text-lg font-bold mb-1 leading-snug ${isActive ? 'text-white' : 'text-[#1a2c4e] group-hover:text-white'}`}>
                  {card.designation}
                </div>
                <div className={`text-xs mb-3 ${isActive ? 'text-white/60' : 'text-[#1a2c4e]/50 group-hover:text-white/60'}`}
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {card.duration}
                </div>
                <div
                  className={`text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-white/70' : 'text-[#1a2c4e]/60 group-hover:text-white/70'}`}
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {card.focus}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-center text-xs text-[#1a2c4e]/40 mt-6" style={{ fontFamily: 'Arial, sans-serif' }}>
          Click a phase card to jump to its full detail below
        </p>
      </Section>

      {/* ═══════════════════════════════════
          SECTION 03  ·  FIVE PHASES IN FULL
      ═══════════════════════════════════ */}
      <Section id="section-03" className="bg-[#f8f6f3]">
        <div {...fadeIn('phases-head')}>
          <EyeBrow>The Five Phases in Full</EyeBrow>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2c4e] mb-16 leading-tight">
            Every phase. Every course. Every gate.
          </h2>
        </div>

        <div className="space-y-0">
          {phases.map((phase, pi) => (
            <div key={phase.id}>
              {/* Phase block */}
              <div
                id={phase.id}
                {...fadeIn(`phase-block-${phase.number}`, 80)}
                className="scroll-mt-24 bg-white rounded-2xl p-8 md:p-12 border border-black/5"
              >
                {/* Phase header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                  <div>
                    <div
                      className="text-xs font-bold text-[#E05C3A] mb-2"
                      style={{ fontFamily: 'Arial, sans-serif', letterSpacing: '0.15em' }}
                    >
                      {phase.tag}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#1a2c4e] leading-tight">
                      {phase.designation}
                    </h3>
                    <p className="text-[#1a2c4e]/55 text-sm mt-1 font-medium">{phase.subtitle}</p>
                  </div>
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-lg"
                    style={{ background: 'linear-gradient(135deg, #1a2c4e 0%, #2d4a7a 100%)' }}
                  >
                    {phase.number}
                  </div>
                </div>

                {/* Description paragraphs */}
                <div className="space-y-4 mb-10">
                  {phase.paragraphs.map((para, pi2) => (
                    <p key={pi2} className="text-[#1a2c4e]/70 leading-relaxed text-[0.95rem]">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Courses */}
                <div className="mb-8">
                  <div
                    className="text-xs font-bold uppercase tracking-widest text-[#1a2c4e]/40 mb-4"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {phase.coursesLabel}
                  </div>
                  <div className="space-y-3">
                    {phase.courses.map((course, ci) => (
                      <div
                        key={ci}
                        className="flex gap-4 p-4 rounded-xl bg-[#f8f6f3] border border-black/5"
                      >
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center"
                          style={{ background: '#E05C3A' }}
                        >
                          <span className="text-white text-[9px] font-bold">{ci + 1}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-[#1a2c4e] text-sm mb-0.5">{course.name}</p>
                          <p className="text-[#1a2c4e]/60 text-xs leading-relaxed">{course.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gate outputs */}
                <div
                  className="rounded-xl p-6 border-l-4"
                  style={{ background: 'rgba(26,44,78,0.03)', borderColor: '#E05C3A' }}
                >
                  <div
                    className="text-xs font-bold uppercase tracking-widest text-[#E05C3A] mb-4"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {phase.gateLabel}
                  </div>
                  <ul className="space-y-2.5">
                    {phase.gates.map((gate, gi) => (
                      <li key={gi} className="flex gap-3 text-sm text-[#1a2c4e]/75 leading-relaxed">
                        <span className="flex-shrink-0 text-[#E05C3A] font-bold mt-0.5">→</span>
                        {gate}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Divider between phases */}
              {pi < phases.length - 1 && (
                <div className="flex items-center justify-center py-6">
                  <div className="h-10 w-px bg-gradient-to-b from-black/10 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════
          SECTION 04  ·  THREE VENTURE TYPES
      ═══════════════════════════════════ */}
      <Section id="section-04" className="bg-white">
        <div {...fadeIn('vt-head')}>
          <EyeBrow>Three Venture Types</EyeBrow>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2c4e] mb-4 leading-tight">
            Every venture is one of three types.
          </h2>
          <p className="text-[#1a2c4e]/65 text-base md:text-lg max-w-3xl mb-16 leading-relaxed">
            The venture type emerges from the nature of the problem and the fellow's chosen approach to creating lasting change. All three are built with equal rigour. All three are expected to demonstrate, with measurable evidence, that the problem they address is genuinely better because the fellow worked on it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {ventureTypes.map((vt, i) => (
            <div
              key={i}
              {...fadeIn(`vt-${i}`, i * 100)}
              className="rounded-2xl border border-black/8 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              style={{ background: i === 0 ? '#1a2c4e' : i === 1 ? '#f8f6f3' : '#fff' }}
            >
              <h3
                className={`text-xl font-bold mb-4 ${i === 0 ? 'text-white' : 'text-[#1a2c4e]'}`}
              >
                {vt.name}
              </h3>
              <p
                className={`text-sm leading-relaxed mb-6 flex-1 ${i === 0 ? 'text-white/70' : 'text-[#1a2c4e]/65'}`}
              >
                {vt.definition}
              </p>
              <div className="space-y-3">
                <div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest ${i === 0 ? 'text-[#E05C3A]' : 'text-[#E05C3A]'}`}
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Registered as
                  </span>
                  <p className={`text-xs mt-0.5 ${i === 0 ? 'text-white/80' : 'text-[#1a2c4e]/70'}`}>
                    {vt.registeredAs}
                  </p>
                </div>
                <div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest ${i === 0 ? 'text-[#E05C3A]' : 'text-[#E05C3A]'}`}
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Examples
                  </span>
                  <p className={`text-xs mt-0.5 ${i === 0 ? 'text-white/70' : 'text-[#1a2c4e]/60'}`}>
                    {vt.examples.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Credential line */}
        <div
          {...fadeIn('credential')}
          className="rounded-2xl p-8 border border-[#E05C3A]/20"
          style={{ background: 'rgba(224,92,58,0.04)' }}
        >
          <p className="text-sm text-[#1a2c4e]/60 mb-2 font-medium">Credential line</p>
          <p className="text-[#1a2c4e] text-base md:text-lg leading-relaxed max-w-4xl">
            A fellow's complete credential reads:{' '}
            <strong>Domain · Build Classification · Venture Type.</strong>{' '}
            For example:{' '}
            <span className="text-[#E05C3A] font-semibold">Health and Wellbeing · Method · Social Venture.</span>{' '}
            One line that communicates the depth of the problem understood, the nature of what was built, and the ambition of the outcome created.
          </p>
        </div>
      </Section>

      {/* ═══════════════════════════════════
          SECTION 05  ·  THE GATE SYSTEM
      ═══════════════════════════════════ */}
      <Section id="section-05" className="bg-[#1a2c4e]">
        <div {...fadeIn('gate-head')}>
          <EyeBrow>The Gate System</EyeBrow>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Gates are real. Advancement is earned.
          </h2>
          <p className="text-white/55 text-base md:text-lg max-w-2xl mb-16 leading-relaxed">
            Every phase ends with a gate. A panel review of demonstrated work against a published standard — the fellow's assigned mentor and at least one external reviewer with no stake in being lenient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {gateColumns.map((col, i) => (
            <div
              key={i}
              {...fadeIn(`gate-col-${i}`, i * 100)}
              className="bg-[#1e3460] p-8 md:p-10"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-6"
                style={{ background: 'rgba(224,92,58,0.2)' }}
              >
                <span className="text-[#E05C3A] font-bold text-xs">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-4 leading-snug">{col.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{col.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════
          SECTION 06  ·  WEEKLY RHYTHM
      ═══════════════════════════════════ */}
      <Section id="section-06" className="bg-[#0f1e38]">
        <div {...fadeIn('rhythm-head')}>
          <EyeBrow>Weekly Rhythm</EyeBrow>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Three anchors. Every week. Every phase.
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-3xl mb-16 leading-relaxed">
            Phases change. Problems evolve. Three structures run through every week of the programme without exception. They are the connective tissue of the programme — keeping momentum, accountability, and communication consistent across two years.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weeklyAnchors.map((anchor, i) => (
            <div
              key={i}
              {...fadeIn(`anchor-${i}`, i * 120)}
              className="rounded-2xl p-8 border border-white/8 hover:border-[#E05C3A]/40 transition-all duration-300 group"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ background: '#E05C3A' }}
                />
                <h3 className="text-base font-bold text-white">{anchor.name}</h3>
              </div>
              <p className="text-white/55 text-sm leading-relaxed">{anchor.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════
          SECTION 07  ·  REACT PORTFOLIO
      ═══════════════════════════════════ */}
      <Section id="section-07" className="bg-white">
        <div {...fadeIn('port-head')}>
          <EyeBrow>The REACT Portfolio</EyeBrow>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2c4e] mb-4 leading-tight">
            The portfolio grows with the fellow.<br className="hidden md:block" /> It does not stop at graduation.
          </h2>
          <p className="text-[#1a2c4e]/65 text-base md:text-lg max-w-3xl mb-16 leading-relaxed">
            Every fellow builds a REACT Portfolio across the full programme — a structured, verified, living record of what the fellow produced, what the field taught them, and what they went on to do. Presented as a bound physical document at graduation and as a verified digital record with a permanent URL.
          </p>
        </div>

        <div className="space-y-px">
          {portfolioLayers.map((layer, i) => (
            <div
              key={i}
              {...fadeIn(`layer-${i}`, i * 60)}
              className="group flex gap-6 md:gap-10 items-start p-6 md:p-8 rounded-xl border border-transparent hover:border-black/6 hover:bg-[#f8f6f3] transition-all duration-300 cursor-default"
            >
              <div className="flex-shrink-0 flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                  style={{ background: 'linear-gradient(135deg, #1a2c4e 0%, #2d4a7a 100%)' }}
                >
                  {layer.number}
                </div>
                {i < portfolioLayers.length - 1 && (
                  <div className="w-px flex-1 bg-black/8 mt-2 min-h-[20px]" />
                )}
              </div>
              <div className="pb-4">
                <h3 className="font-bold text-[#1a2c4e] text-base mb-1">
                  <span className="text-[#E05C3A] mr-2">·</span>
                  {layer.name}
                </h3>
                <p className="text-[#1a2c4e]/60 text-sm leading-relaxed">{layer.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          {...fadeIn('port-closing')}
          className="mt-10 rounded-2xl p-6 border border-[#1a2c4e]/10 bg-[#f8f6f3]"
        >
          <p className="text-[#1a2c4e] text-base leading-relaxed font-medium">
            When a fellow publishes a paper, wins a competition, or registers a venture after leaving the programme, it is added to the record. The Portfolio grows with the person.
          </p>
        </div>
      </Section>

      {/* ═══════════════════════════════════
          SECTION 08  ·  THE COHORT
      ═══════════════════════════════════ */}
      <Section id="section-08" className="bg-[#f8f6f3]">
        <div {...fadeIn('cohort-head')}>
          <EyeBrow>The Cohort</EyeBrow>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2c4e] mb-4 leading-tight">
            The cohort is the programme's most powerful resource.
          </h2>
          <p className="text-[#1a2c4e]/65 text-base md:text-lg max-w-3xl mb-16 leading-relaxed">
            Every cohort is assembled with deliberate diversity — across disciplines, domains, and backgrounds — so that the fellow working on agricultural market access and the fellow working on primary health diagnostics are learning from each other across two years.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cohortTypes.map((ct, i) => (
            <div
              key={i}
              {...fadeIn(`cohort-${i}`, i * 120)}
              className="rounded-2xl p-10 border border-black/5 hover:shadow-md transition-all duration-300"
              style={{ background: i === 0 ? '#fff' : '#1a2c4e' }}
            >
              <div
                className="inline-flex px-3 py-1 rounded-full text-xs font-bold mb-6"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  letterSpacing: '0.1em',
                  background: i === 0 ? 'rgba(224,92,58,0.1)' : 'rgba(224,92,58,0.2)',
                  color: '#E05C3A',
                }}
              >
                {ct.label}
              </div>
              <p className={`text-base leading-relaxed ${i === 0 ? 'text-[#1a2c4e]/70' : 'text-white/70'}`}>
                {ct.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════
          SECTION 09  ·  CLOSING CTA
      ═══════════════════════════════════ */}
      <section
        id="section-09"
        className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f1e38 0%, #1a2c4e 50%, #0f1e38 100%)' }}
      >
        {/* Background glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(224,92,58,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div
            {...fadeIn('cta-head')}
          >
            <EyeBrow>Ready to start?</EyeBrow>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Ready to start?
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              The application window for Cohort 2 is open. Three stages. The first is a 500-word personal statement and a domain choice.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <Link
                to="/apply"
                id="cta-apply-bottom"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E05C3A] text-white font-semibold text-sm hover:bg-[#c94d2e] shadow-xl shadow-[#E05C3A]/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                Apply Now <ArrowRight size={15} />
              </Link>
              <Link
                to="/programme"
                id="cta-programme-bottom"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                See the Programmes <ArrowRight size={15} />
              </Link>
            </div>

            {/* Contact */}
            <div className="border-t border-white/10 pt-10">
              <p
                className="text-white/35 text-xs uppercase tracking-widest mb-4 font-semibold"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Contact
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {[
                  'reactfellowship.kumaraguru.in',
                  'react.kct.ac.in',
                  'info.react@kumaraguru.in',
                ].map((contact, i) => (
                  <span key={i} className="text-white/55 text-sm">
                    {contact}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Journey;
