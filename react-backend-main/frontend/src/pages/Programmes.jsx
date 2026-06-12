import React, { Suspense, lazy, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Mail } from 'lucide-react';

const ProgrammeDepthFrame = lazy(() => import('../components/ProgrammesCom/ProgrammeDepthFrame'));

const programmes = [
  {
    title: 'Social Innovation Fellowship',
    duration: '2 Years',
    credential: 'Diploma in Social Innovation + Partner Degree',
    openTo: 'UG and PG students at Kumaraguru Institutions',
    window: 'February to July · Once a year',
    summary:
      'The flagship programme. Two years embedded inside a degree at Kumaraguru Institutions - engineering, management, or social work. The degree gives you disciplinary depth. REACT gives you the architecture to act on it. Both are built simultaneously. You graduate with a credential and a venture, not one or the other.',
    details: [
      {
        heading: 'Who this is for',
        body:
          'UG students from second year onward and PG students at KCT, KCTBS, and KCLAS - any branch, any discipline. Students already enrolled at Kumaraguru apply directly. Applicants from outside institutions are admitted to the degree programme as part of the same process.',
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
  },
  {
    title: 'Social Impact Fellowship',
    duration: '1 Year',
    credential: 'Diploma in Social Innovation',
    openTo: 'Any graduate, anywhere in the world',
    window: 'February to July · Once a year',
    summary:
      'The gap year with a permanent outcome. One year, full-time, intensive. The complete REACT methodology from field immersion to venture registration - for graduates who want to go deep on a real problem before their next chapter. Open to any graduate from any institution anywhere in the world. No host degree required.',
    details: [
      {
        heading: 'Who this is for',
        body:
          'Any graduate from any discipline, any institution, anywhere in the world. Designed for graduates between a first degree and doctoral research, between education and building something, or at the point of deciding which direction their work takes.',
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
  },
  {
    title: 'Social Innovation Certification',
    duration: 'One Semester',
    credential: 'Certification in Social Innovation',
    openTo: 'Any current student at any institution',
    window: 'May to July · December to January · Twice a year',
    summary:
      'The foundational skill every programme here is built on - understanding a problem so completely that the solution becomes inevitable. One semester. Four gap types. One validated problem statement you carry back to wherever you came from.',
    details: [
      {
        heading: 'Who this is for',
        body:
          'Any current UG, PG, or PhD student at any institution. You return to your own institution after the certification with a validated problem statement, a structured gap analysis, and a documented community understanding. A credential in its own right and the natural entry point for anyone considering the full Diploma.',
      },
      {
        heading: 'The four gaps you learn to map',
        items: [
          'Community Gap - what the community needs that current systems do not provide',
          'Solution Gap - where existing solutions fall short and why they fail at scale',
          'Market Gap - the unserved population and the viable economic model to reach them',
          'User Gap - the distance between what a user says they need and what they will actually adopt and sustain',
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
  },
  {
    title: 'Field Internship',
    duration: 'Variable duration',
    credential: 'No formal credential',
    openTo: 'Students and early-career professionals',
    window: 'Rolling intake · Write to us',
    summary:
      'Immersive, short-term placement inside live programme work. Every intern contributes to active fellow projects and field partner activities. This is not observation. Every position has real stakes and a real deliverable.',
    details: [
      {
        heading: 'Who this is for',
        body:
          'Any student or early-career professional. Positions are confirmed individually, case by case, based on active programme needs.',
      },
      {
        heading: 'What you work on',
        items: [
          'Community gap analysis - working directly with communities to map unmet needs',
          'Solution gap research - analysing why existing interventions have failed at scale',
          'Market gap mapping - identifying unserved populations and viable economic models',
          'Programme operations - understanding how a social innovation centre functions in the Indian development context',
        ],
      },
      {
        heading: 'How to apply',
        body:
          'Write directly to info.react@kumaraguru.in with your background, availability, and which area you want to work in. Positions confirmed on a rolling basis.',
      },
    ],
    applyLabel: 'Enquire About Field Internships',
    learnLabel: 'Learn more about field internships',
    applyHref: 'mailto:info.react@kumaraguru.in',
    learnHref: '/fellowship/field-internship',
  },
];

const fellowBenefits = [
  'REACT Fellow certificate - permanent, not a graduation award',
  'Permanent entry into the REACT Fellow network',
  'Mentor access and incubation pipeline priority for two years beyond graduation',
  'Priority consideration for grant introductions and investor connections',
  'A permanent record in the REACT Fellow archive, distinguished from all other alumni',
];

const selectionStages = [
  {
    title: 'Written Application',
    body: 'A 500-word personal statement and your initial domain choice.',
  },
  {
    title: 'Problem Framing Exercise',
    body:
      'A structured written response to a real domain challenge. The question is how you think, not what you already know.',
  },
  {
    title: 'Panel Interview',
    body: 'A conversation with the Faculty Mentor and Domain Coordinator for your chosen domain.',
  },
];

const programmeDepthStyles = `
  .programme-depth-frame {
    --programme-tilt-x: 0deg;
    --programme-tilt-y: 0deg;
    opacity: 0;
    perspective: 900px;
    transform: translate3d(0, 18px, 0);
    transition:
      opacity 520ms ease,
      transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--programme-depth-delay, 0ms);
  }

  .programme-depth-frame.is-visible {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .programme-depth-surface {
    height: 100%;
    transform: rotateX(var(--programme-tilt-x)) rotateY(var(--programme-tilt-y));
    transform-style: preserve-3d;
    transition:
      transform 260ms ease,
      filter 260ms ease;
    will-change: transform;
  }

  .programme-card {
    min-height: 23.5rem;
  }

  .programme-card-summary {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }

  .programme-depth-frame:hover .programme-depth-surface {
    filter: drop-shadow(0 24px 38px rgba(15, 42, 68, 0.12));
  }

  .programme-hero-depth {
    position: absolute;
    inset: auto clamp(1.5rem, 6vw, 7rem) -3.5rem auto;
    display: none;
    height: 12rem;
    width: min(28rem, 38vw);
    pointer-events: none;
    perspective: 720px;
  }

  .programme-hero-depth span {
    position: absolute;
    inset: 0;
    border: 1px solid rgba(15, 42, 68, 0.1);
    background:
      linear-gradient(135deg, rgba(15, 42, 68, 0.08), rgba(231, 103, 88, 0.08)),
      rgba(255, 255, 255, 0.72);
    box-shadow: 0 24px 70px rgba(15, 42, 68, 0.1);
    transform: rotateX(58deg) rotateZ(-13deg) translateZ(var(--z));
  }

  .programme-hero-depth span:nth-child(1) {
    --z: 0px;
    border-radius: 1.5rem;
  }

  .programme-hero-depth span:nth-child(2) {
    --z: 28px;
    inset: 1.6rem 2.3rem;
    border-radius: 1.1rem;
  }

  .programme-hero-depth span:nth-child(3) {
    --z: 54px;
    inset: 3.2rem 4.6rem;
    border-radius: 0.8rem;
    background: rgba(231, 103, 88, 0.12);
  }

  @media (min-width: 1024px) {
    .programme-hero-depth {
      display: block;
    }
  }

  @media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce) {
    .programme-depth-frame,
    .programme-depth-frame.is-visible {
      opacity: 1;
      transform: none;
      transition: none;
    }

    .programme-depth-surface,
    .programme-depth-frame:hover .programme-depth-surface {
      filter: none;
      transform: none;
      transition: none;
      will-change: auto;
    }

    .programme-hero-depth {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .programme-card {
      min-height: 24rem;
    }
  }
`;

function LazyDepthFrame({ children, className = '', delay = 0, lift = true }) {
  return (
    <Suspense fallback={<div className={className}>{children}</div>}>
      <ProgrammeDepthFrame className={className} delay={delay} lift={lift}>
        {children}
      </ProgrammeDepthFrame>
    </Suspense>
  );
}

function ProgrammeCard({ programme, isOpen, onToggle }) {
  const applyHref = programme.applyHref || '/apply';
  const applyExternal = applyHref.startsWith('mailto:');

  return (
    <article className="programme-card flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={onToggle}
        className="flex flex-1 flex-col p-6 text-left sm:p-7"
        aria-expanded={isOpen}
      >
        <div className="flex items-start justify-between gap-5">
          <h3 className="max-w-[18rem] text-2xl font-semibold leading-tight text-slate-950">
            {programme.title}
          </h3>
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600">
            <ChevronDown
              className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </span>
        </div>

        <dl className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E76758]">Duration</dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">{programme.duration}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E76758]">Credential</dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">{programme.credential}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E76758]">Open to</dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">{programme.openTo}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E76758]">
              Application window
            </dt>
            <dd className="mt-1 text-sm font-semibold text-slate-900">{programme.window}</dd>
          </div>
        </dl>

        <p className="programme-card-summary mt-auto pt-7 text-[15px] leading-relaxed text-slate-600">
          {programme.summary}
        </p>
      </button>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-[#F8FAFC] px-6 py-7 sm:px-7">
          <div className="space-y-6">
            {programme.details.map((detail) => (
              <section key={detail.heading}>
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-950">
                  {detail.heading}
                </h4>
                {detail.body ? (
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{detail.body}</p>
                ) : null}
                {detail.items ? (
                  <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-600">
                    {detail.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E76758]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {applyExternal ? (
              <a
                href={applyHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E76758] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d8584a]"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {programme.applyLabel}
              </a>
            ) : (
              <Link
                to={applyHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E76758] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d8584a]"
              >
                {programme.applyLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
            <Link
              to={programme.learnHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
            >
              {programme.learnLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export const Programmes = () => {
  const cardsRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  function scrollToCards() {
    cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderProgrammeCard(programme, index) {
    return (
      <LazyDepthFrame key={programme.title} delay={index * 70}>
        <ProgrammeCard
          programme={programme}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      </LazyDepthFrame>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F5F7FA] text-slate-900">
      <style>{programmeDepthStyles}</style>

      <section className="relative overflow-hidden bg-white px-6 pb-20 pt-32 sm:pb-24 sm:pt-40">
        <div className="programme-hero-depth" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Centre for REACT</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-[#0F2A44]">One standard.</span>
            <span className="block text-[#E76758]">Four ways to meet it.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            The REACT methodology is the same across every programme - the field immersion, the frameworks, the
            real-world output. What changes is your entry point, your duration, and the credential you carry out. The
            standard never moves. Choose the one that fits where you stand today.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={scrollToCards}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F2A44] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[#153a5d]"
            >
              Find Your Programme
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <Link
              to="/apply"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-50"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      <section ref={cardsRef} id="programmes" className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Four programmes. Every one built on REACT.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              From a two-year fellowship with a degree to a semester-long certification - every programme runs on the
              same methodology, demands the same rigour, and produces people who have worked on real problems with
              something real to show for it.
            </p>
          </div>

          <div className="mt-10 space-y-6 lg:hidden">
            {programmes.map((programme, index) => renderProgrammeCard(programme, index))}
          </div>

          <div className="programme-card-grid mt-10 hidden gap-6 lg:grid lg:grid-cols-2 lg:items-start">
            <div className="space-y-6">
              {programmes.map((programme, index) =>
                index % 2 === 0 ? renderProgrammeCard(programme, index) : null,
              )}
            </div>
            <div className="space-y-6">
              {programmes.map((programme, index) =>
                index % 2 === 1 ? renderProgrammeCard(programme, index) : null,
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0F2A44] px-6 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFB4AA]">
                The REACT Fellow
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                The rarest thing this centre produces.
              </h2>
              <p className="mt-5 text-xl leading-relaxed text-white/78">
                And the only thing it cannot give - only recognise.
              </p>
            </div>
            <div className="space-y-5 text-[15px] leading-relaxed text-white/74 sm:text-base">
              <p>
                Every fellow who completes a programme receives a Diploma in Social Innovation and their credential.
                That is what completion earns and every completing fellow deserves it fully.
              </p>
              <p>The REACT Fellow designation is different in kind.</p>
              <p>
                Two years of the REACT methodology - living inside a real problem, building under field conditions,
                producing verified evidence that something changed for real people - does not leave a person unchanged.
                The centre&apos;s belief is that anyone who genuinely goes through it will not stop when the programme
                ends. They will still be working on social problems through innovative means. Still striving. Still
                finding ways to create change that lasts.
              </p>
              <p>The REACT Fellow designation is awarded to the people who prove that belief correct.</p>
              <p>
                The first proof is registering a venture during the final semester - a startup or NGO directly connected
                to their REACT project, built for the community they spent two years understanding. That act shows the
                work was real enough to formalise. What the designation truly recognises is what comes after. Whether
                the person continues. Whether they thrive in it.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 border-t border-white/15 pt-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h3 className="text-xl font-semibold text-white">What REACT Fellows receive</h3>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-white/76">
                {fellowBenefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB4AA]" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <blockquote className="border-l-4 border-[#E76758] pl-6 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              "The designation cannot be applied for. The venture does not complete it. What comes after does."
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Three stages. Zero compromise.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              The centre selects on quality of thinking and depth of commitment. Problem curiosity. Cross-context
              adaptability. Collaborative drive. All three visible before any examination result.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {selectionStages.map((stage, index) => (
              <LazyDepthFrame key={stage.title} delay={index * 80} lift={false}>
                <article className="h-full rounded-lg border border-slate-200 bg-[#F8FAFC] p-6">
                  <p className="text-sm font-semibold tracking-[0.18em] text-[#E76758]">
                    STAGE {String(index + 1)}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-950">{stage.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{stage.body}</p>
                </article>
              </LazyDepthFrame>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101827] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Cohort 2 is forming now.</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/72">
            Applications are open. Each programme has a fixed number of seats and a fixed window. If you know which
            programme is yours, apply. If you are still deciding, each programme page has everything you need to choose.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/apply"
              className="inline-flex items-center justify-center rounded-full bg-[#E76758] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[#d8584a]"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Talk to Us First
            </Link>
          </div>
          <p className="mt-9 text-sm leading-relaxed text-white/56">
            reactfellowship.kumaraguru.in · react.kct.ac.in · info.react@kumaraguru.in
          </p>
        </div>
      </section>
    </main>
  );
};
