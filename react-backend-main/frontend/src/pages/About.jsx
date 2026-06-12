import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const methodologyItems = [
  {
    label: 'Real World',
    body:
      'The field is the classroom. Fellows learn inside the problem, not at a distance from it. The first thing every fellow does is leave the campus.',
  },
  {
    label: 'Engineering',
    body:
      'In the fullest sense: the disciplined application of knowledge to build something that functions. A social worker who founds an NGO that survives is an engineer of institutions. A manager who designs a model that sustains a community cooperative is an engineer of systems. The methodology belongs to every discipline.',
  },
  {
    label: 'Application',
    body:
      'Knowledge that cannot act on a real problem is unfinished. Every framework, every session, every mentor conversation at this centre exists in service of something that gets built and tested in the field.',
  },
  {
    label: 'Collaborative',
    body:
      'The communities who carry the problem are co-authors of the solution. The cohort builds together. The methodology is designed for this from the ground up.',
  },
  {
    label: 'Transformation',
    body:
      'The measure is whether something genuinely changed for the people the work was built for. Everything else is process.',
  },
];

const frameworks = [
  {
    title: 'Domain Intelligence Framework',
    body:
      'Nine structured lenses applied to every problem before anything is built. They surface what most practitioners miss: who benefits from the problem remaining unsolved, why previous solutions failed at scale, exactly where intervention can change things. Fellows who complete all nine lenses can diagnose a problem. The specific lenses are proprietary to the centre and are not disclosed externally.',
  },
  {
    title: 'MMD Build Classification',
    body:
      'Every solution built at the centre is classified as Material, Method, or Design. This classification is mapped directly to the Indian Patents Act. Fellows understand the intellectual property dimensions of their work from the first day of building.',
  },
  {
    title: 'CALIBRATE Community Assessment',
    body:
      'Eighteen structured questions assessed before any fellow enters a community with a proposed solution: readiness, trust, infrastructure, governance, existing interventions. A solution does not arrive until the community is ready to receive it and the fellow has earned the permission to work there.',
  },
];

const qualities = [
  {
    title: 'Problem curiosity',
    body: 'Sitting with complexity long enough to understand it rather than describe it.',
  },
  {
    title: 'Cross-context adaptability',
    body: 'Moving through unfamiliar communities, disciplines, and conditions without losing orientation.',
  },
  {
    title: 'Collaborative drive',
    body: 'A demonstrated track record of building toward a shared goal with other people.',
  },
];

const SectionLabel = ({ children, tone = 'light' }) => (
  <p
    className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${
      tone === 'dark' ? 'text-[#FFB4AA]' : 'text-[#E76758]'
    }`}
  >
    {children}
  </p>
);

const CtaRow = ({ dark = false }) => (
  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
    <Link
      to="/programme"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-semibold transition-colors ${
        dark ? 'bg-white text-[#0F2A44] hover:bg-white/90' : 'bg-[#0F2A44] text-white hover:bg-[#153a5d]'
      }`}
    >
      See the Programmes
      <ArrowRight className="h-5 w-5" aria-hidden="true" />
    </Link>
    <Link
      to="/apply"
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-semibold transition-colors ${
        dark
          ? 'border border-white/25 text-white hover:bg-white/10'
          : 'border border-slate-300 bg-white text-slate-950 hover:bg-slate-50'
      }`}
    >
      Apply Now
    </Link>
  </div>
);

export const About = () => {
  return (
    <main className="min-h-screen bg-[#F5F7FA] text-slate-950">
      <section className="bg-white px-6 pb-20 pt-32 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Centre for REACT</SectionLabel>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-tight text-[#0F2A44] sm:text-6xl lg:text-7xl">
            <span className="block">India has the problems.</span>
            <span className="block text-[#E76758]">We build the people who solve them.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            REACT is a methodology. This centre is where it runs. This page is why.
          </p>
          <CtaRow />
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <SectionLabel>The Belief</SectionLabel>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Social problems are unmet markets.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-slate-700">
            <p>A real need without a solution at scale is a market failure. Market failures can be corrected.</p>
            <p>
              The farmer losing produce to postharvest spoilage will pay for something that works. The patient
              travelling hours for a diagnosis will pay when the answer is accurate and close. The family whose child
              cannot read will invest in learning that actually functions.
            </p>
            <p>
              The belief behind REACT is simple and demanding: a significant number of India&apos;s most urgent problems
              can be solved in ways that sustain themselves through the value they create. Solutions built on grants
              collapse when the grant ends. The community is left worse off than before: they experienced something
              better and had it taken away.
            </p>
            <p>
              REACT builds the other kind. The kind that grows because it earns, earns because it works, and works
              because it was built by someone who spent time living inside the problem before touching a solution.
            </p>
            <blockquote className="border-l-4 border-[#E76758] pl-5 text-2xl font-semibold leading-snug text-[#0F2A44]">
              "The ventures outlast the people who build them. That is the standard."
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel>The Methodology</SectionLabel>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Every word in REACT is a commitment.
            </h2>
            <p className="mt-5 text-xl leading-relaxed text-slate-600">
              Real World. Engineering. Application. Collaborative. Transformation.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {methodologyItems.map((item) => (
              <article key={item.label} className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-6">
                <h3 className="text-2xl font-semibold text-[#0F2A44]">{item.label}</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel>The Frameworks</SectionLabel>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Three frameworks. One rigorous process.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-700">
              The REACT methodology is not a philosophy. It is a set of tools that give every fellow a repeatable,
              disciplined process regardless of domain, background, or prior field experience.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {frameworks.map((framework) => (
              <article key={framework.title} className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="text-2xl font-semibold leading-tight text-[#0F2A44]">{framework.title}</h3>
                <p className="mt-5 text-base leading-relaxed text-slate-600">{framework.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>The Institution</SectionLabel>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Rooted at Kumaraguru Institutions, Coimbatore.
            </h2>
            <p className="mt-5 text-xl leading-relaxed text-slate-600">
              One of India&apos;s leading private institutions for engineering, management, and liberal arts.
            </p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-slate-700">
            <p>
              The Centre for REACT operates within Kumaraguru Institutions, based in Coimbatore, Tamil Nadu. The centre
              draws on its laboratories, fabrication facilities, academic mentors, and decades of industry and civil
              society relationships built across the region and beyond.
            </p>
            <p>
              Kumaraguru Institutions has held one position consistently: the purpose of education is not merely
              employment. The REACT methodology is the most direct expression of that position: a structured system that
              places students inside real problems and expects them to contribute meaningfully to their solution.
            </p>
            <p>
              The programmes run at this centre are academically accredited through partner Master&apos;s degrees across
              three academic units within Kumaraguru Institutions.
            </p>
            <a
              href="https://kct.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-semibold text-[#E76758] transition-colors hover:text-[#d8584a]"
            >
              Kumaraguru Institutions
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel>Who Belongs Here</SectionLabel>
            <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Three qualities. No exceptions.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-700">
              Fellows come from every discipline. What matters is how they engage with a problem they have never
              encountered before.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {qualities.map((quality) => (
              <article key={quality.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#0F2A44]">{quality.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{quality.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0F2A44] px-6 py-18 text-white sm:py-24">
        <div className="mx-auto max-w-6xl">
          {/* <SectionLabel tone="dark">Closing</SectionLabel> */}
          <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">
            One outcome. Everything serves it.
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/76">
            The methodology, the frameworks, the field immersion, the cohort, the gate system, the partner network. All
            of it is designed for one result: ventures that outlast the people who built them. Organisations that
            continue serving communities after graduation. Change that does not collapse when the programme ends.
          </p>
          <CtaRow dark />
        </div>
      </section>
    </main>
  );
};
