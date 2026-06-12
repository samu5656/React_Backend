import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, animate } from 'framer-motion';
import { ArrowRight, Linkedin } from 'lucide-react';

// ── Assets ──────────────────────────────────────────────────────────────────
import Video from '../../assets/videos/video-hero.mp4';

// People (Testimonials)
import Aparna from '../../assets/people/Aparna.jpg';
import Jana from '../../assets/people/Jana.jpg';
import Nandeesh from '../../assets/people/Nandeesh.jpg';
import Sangeetha from '../../assets/people/Sangeetha.jpg';
import Sivakeerthana from '../../assets/people/Sivakeerthana.jpg';

// ── CONFIG — swap the centre name here only ──────────────────────────────────
const CENTRE_NAME = 'Centre for REACT';

// ── DATA ─────────────────────────────────────────────────────────────────────

const domains = [
  {
    title: 'Agriculture and Food Systems',
    desc: 'Smallholder farming, supply chains, food security, postharvest loss, agricultural markets.',
    icon: '🌾',
    color: 'from-amber-50 to-orange-50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-100',
  },
  {
    title: 'Health and Wellbeing',
    desc: 'Primary care access, diagnostics, maternal health, mental health, community health systems.',
    icon: '❤️',
    color: 'from-rose-50 to-pink-50',
    border: 'border-rose-200',
    iconBg: 'bg-rose-100',
  },
  {
    title: 'Environment and Climate',
    desc: 'Water, waste, energy, climate adaptation, ecological restoration, urban sustainability.',
    icon: '🌿',
    color: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
  },
  {
    title: 'Culture and Creative Economy',
    desc: 'Indigenous knowledge, craft, performing arts, creative livelihoods, cultural heritage.',
    icon: '🎨',
    color: 'from-violet-50 to-purple-50',
    border: 'border-violet-200',
    iconBg: 'bg-violet-100',
  },
  {
    title: 'Sustainable Communities',
    desc: 'Housing, infrastructure, governance, mobility, civic systems, community resilience.',
    icon: '🏘️',
    color: 'from-sky-50 to-blue-50',
    border: 'border-sky-200',
    iconBg: 'bg-sky-100',
  },
  {
    title: 'Education and Livelihood',
    desc: 'Learning access, vocational pathways, skills systems, income security, economic mobility.',
    icon: '📚',
    color: 'from-yellow-50 to-lime-50',
    border: 'border-yellow-200',
    iconBg: 'bg-yellow-100',
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
    name: 'Khyora',
    domain: 'Agriculture and Food Systems',
    domainColor: 'bg-amber-100 text-amber-800',
    desc: 'A postharvest loss reduction system co-built with smallholder farmers in rural Tamil Nadu.',
    link: '/projects/khyora',
  },
  {
    name: 'Therbal',
    domain: 'Environment and Climate',
    domainColor: 'bg-emerald-100 text-emerald-800',
    desc: 'A community-led water management initiative addressing seasonal scarcity in peri-urban zones.',
    link: '/projects/therbal',
  },
  {
    name: 'CardioGuard',
    domain: 'Health and Wellbeing',
    domainColor: 'bg-rose-100 text-rose-800',
    desc: 'A low-cost cardiac monitoring device designed with and for primary health care workers.',
    link: '/projects/cardioguard',
  },
  {
    name: 'BioPod',
    domain: 'Environment and Climate',
    domainColor: 'bg-teal-100 text-teal-800',
    desc: 'A modular bio-waste processing unit tested in community kitchens across Coimbatore.',
    link: '/projects/biopod',
  },
];

const programmes = [
  {
    title: 'Social Innovation Fellowship',
    duration: 'Two years',
    credential: 'Diploma in Social Innovation + Partner Master\'s degree from Kumaraguru Institutions.',
    eligibility: 'For postgraduate students.',
    tag: 'Flagship',
    anchor: '/programme#social-innovation-fellowship',
    color: 'from-slate-900 to-slate-800',
    accent: 'border-amber-400',
  },
  {
    title: 'Social Innovation Programme',
    duration: 'One year',
    credential: 'Full REACT methodology. The same Diploma.',
    eligibility: 'Open to any graduate anywhere in the world.',
    tag: null,
    anchor: '/programme#social-innovation-programme',
    color: 'from-slate-800 to-slate-700',
    accent: 'border-sky-400',
  },
  {
    title: 'Social Innovation Certification',
    duration: 'One semester',
    credential: 'Foundational skill — understanding a problem deeply enough that it is worth solving.',
    eligibility: 'Open to any current student at any institution.',
    tag: null,
    anchor: '/programme#social-innovation-certification',
    color: 'from-slate-700 to-slate-600',
    accent: 'border-violet-400',
  },
  {
    title: 'Field Internship',
    duration: 'Variable duration',
    credential: 'Immersive engagement with live programme work alongside active fellows and field partners.',
    eligibility: 'For students and early-career professionals. Rolling intake.',
    tag: 'Rolling',
    anchor: '/programme#field-internship',
    color: 'from-slate-600 to-slate-500',
    accent: 'border-emerald-400',
  },
];

// ── SECTION COMPONENTS ────────────────────────────────────────────────────────

/* ── S01: Hero ── */
function HeroSection() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home-hero" className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video
        src={Video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        {/* Eyebrow */}
        <p className="text-xs sm:text-sm tracking-[0.22em] uppercase text-amber-300 font-semibold mb-5">
          {CENTRE_NAME} · Kumaraguru Institutions, Coimbatore
        </p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
          Where real problems meet<br className="hidden sm:block" /> people willing to solve them.
        </h1>

        {/* Sub-headline */}
        <p className="max-w-3xl text-base sm:text-lg text-white/80 leading-relaxed mb-10">
          REACT — Real World Engineering And Application through Collaborative Transformation — is a methodology
          for learning by doing, building by living, and creating change by working with the people who carry the problem.
          This is the centre where that happens.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link to="/apply">
            <button
              id="hero-apply-btn"
              className="px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-xl hover:shadow-amber-400/40 hover:-translate-y-1"
            >
              Apply Now
            </button>
          </Link>
          <Link to="/about">
            <button
              id="hero-about-btn"
              className="px-8 py-4 border-2 border-white/70 text-white font-semibold text-sm uppercase tracking-widest rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              What is REACT?
            </button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60">
        <div className="w-px h-8 bg-white" />
      </div>
    </section>
  );
}

/* ── S02: What REACT Is ── */
function WhatReactIsSection() {
  return (
    <section id="what-react-is" className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
          The Methodology
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-950 mb-6 leading-tight">
          Not a classroom. Not a competition.<br /> A way of working.
        </h2>
        <p className="text-lg text-amber-700 font-semibold mb-8 italic">
          Real World Engineering and Application through Collaborative Transformation. Every word is a principle.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-gray-700 text-base leading-relaxed">
          <div className="space-y-5">
            <p>
              <span className="font-semibold text-gray-900">Real world</span> — because the field is the classroom.{' '}
              <span className="font-semibold text-gray-900">Application</span> — because knowledge that cannot be used on a real problem is incomplete.
            </p>
            <p>
              <span className="font-semibold text-gray-900">Collaborative</span> — because no meaningful social problem has ever been solved by one person working alone.{' '}
              <span className="font-semibold text-gray-900">Transformation</span> — because the measure of the work is whether something genuinely changed for the people it was built for.
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
          className="inline-flex items-center gap-2 mt-10 text-sm font-semibold text-gray-900 hover:text-amber-600 transition-colors group"
        >
          About the REACT methodology
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

/* ── S03: Six Impact Domains ── */
function DomainsSection() {
  return (
    <section id="domains" className="bg-gray-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
          Where Fellows Work
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-950 mb-3">
          Six domains. Real communities. No simulations.
        </h2>
        <p className="text-gray-600 text-base max-w-2xl mb-14 leading-relaxed">
          Every fellow chooses one domain at entry and works within it for the full duration of their programme.
          The domain shapes everything — the problem they work on, the field partner they are placed with, the mentor network
          they access, and the venture they build.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-gradient-to-br ${d.color} border ${d.border} rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300`}
            >
              <div className={`w-12 h-12 ${d.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {d.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{d.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── S04: What Fellows Produce ── */
function OutputsSection() {
  return (
    <section id="outputs" className="bg-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
          Real Outputs
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-950 mb-3 leading-tight">
          A degree is the minimum.<br />Here is what else fellows leave with.
        </h2>
        <p className="text-gray-600 text-base mb-12 leading-relaxed max-w-2xl">
          Every fellow who completes the programme produces all of the following. These are not optional enrichment activities.
          They are the gates through which the programme advances. No gate, no progression.
        </p>

        <ul className="space-y-4">
          {outputs.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-200 group"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center mt-0.5 group-hover:bg-amber-400 group-hover:text-white transition-colors">
                {i + 1}
              </span>
              <span className="text-gray-800 text-sm sm:text-base leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-10 p-6 bg-gray-900 rounded-2xl text-white">
          <p className="text-sm leading-relaxed text-gray-300">
            Each cohort targets <span className="text-white font-semibold">thirty fellows</span> and{' '}
            <span className="text-white font-semibold">twelve registered ventures</span>. Those ventures exist after graduation.
            They continue serving the communities they were built for.
          </p>
        </div>

        <Link
          to="/programme"
          className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-gray-900 hover:text-amber-600 transition-colors group"
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
    <section id="react-fellow" className="bg-gray-950 py-24 px-6 relative overflow-hidden">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-xs tracking-[0.22em] uppercase text-amber-400 font-semibold mb-6">
          The Highest Recognition
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 leading-tight">
          Not everyone who completes the programme<br className="hidden md:block" /> becomes a REACT Fellow.
        </h2>

        <div className="text-left space-y-6 text-gray-300 text-base leading-relaxed mb-14 max-w-3xl mx-auto">
          <p>
            Every fellow who completes the programme receives a{' '}
            <span className="text-white font-semibold">Diploma in Social Innovation</span> and a{' '}
            <span className="text-white font-semibold">Partner Master's degree from Kumaraguru Institutions</span>.
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

        {/* Pull quote */}
        <blockquote className="relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-8xl text-amber-500/20 font-serif leading-none select-none">"</div>
          <p className="relative text-xl md:text-2xl lg:text-3xl font-semibold text-white italic leading-relaxed px-8 md:px-16">
            "The institution does not determine the designation. The venture does."
          </p>
        </blockquote>
      </div>
    </section>
  );
}

/* ── S06: For Partners ── */
function PartnersSection() {
  return (
    <section id="for-partners" className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
              For Organisations and Communities
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-950 mb-6 leading-tight">
              The centre works with partners who have real problems worth solving.
            </h2>
            <Link to="/contact">
              <button
                id="partner-cta-btn"
                className="inline-flex items-center gap-2 mt-2 px-7 py-3.5 bg-gray-950 text-white font-semibold text-sm rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 group"
              >
                Partner with us
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
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
function ProjectsSection() {
  return (
    <section id="featured-projects" className="bg-gray-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
          Built Inside the Centre
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-950 mb-3">
          These are not assignments. They are products.
        </h2>
        <p className="text-gray-600 text-base mb-14 max-w-2xl leading-relaxed">
          Every project here was built by fellows working on a real problem, in a real community, through the REACT
          methodology. Each went through field validation, a proof of concept, and user testing before it became what you see.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {featuredProjects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={p.link} className="block group">
                <div className="bg-white border border-gray-200 rounded-2xl p-7 hover:border-gray-400 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-950 group-hover:text-amber-600 transition-colors">
                      {p.name}
                    </h3>
                    <ArrowRight
                      size={18}
                      className="text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all mt-1 flex-shrink-0"
                    />
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${p.domainColor}`}>
                    {p.domain}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-amber-600 transition-colors group"
        >
          See all projects
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

/* ── S08: Testimonials ── */
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
      duration: 32,
      ease: 'linear',
      repeat: Infinity,
      onUpdate: (latest) => {
        if (latest <= -totalSetWidth) x.set(latest + totalSetWidth);
      },
    });
  }, [x, cardWidthWithGap]);

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
    <section id="testimonials" className="bg-white py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-semibold mb-4">
          From the People Inside It
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-950">
          From the people who have been inside it.
        </h2>
        <p className="text-gray-600 text-base mt-3 max-w-xl leading-relaxed">
          Fellows, mentors, and community members on what the work looks like from where they stand.
        </p>
      </div>

      {/* Mobile carousel */}
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

function TestimonialCard({ item }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:shadow-md transition-shadow h-full">
      <div className="flex items-start justify-between mb-5">
        <div className="flex gap-3 items-center">
          <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow" />
          <div>
            <p className="font-bold text-gray-900 leading-tight">{item.name}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{item.title}</p>
          </div>
        </div>
        <a href={item.linkedin} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
          <Linkedin size={18} />
        </a>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed italic">"{item.quote}"</p>
    </div>
  );
}

/* ── S09: Recognition ── */
function RecognitionSection() {
  return (
    <section id="recognition" className="bg-amber-50 border-y border-amber-200 py-14 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center text-3xl">
            🌐
          </div>
        </div>
        <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
          The centre's work is{' '}
          <span className="font-semibold text-gray-950">featured in</span> the YOUNGO Youth Project Compilation on
          Food, Agriculture and Climate Action (Vol. 1, 2025), published by the official Youth Constituency of the
          United Nations Framework Convention on Climate Change.
        </p>
      </div>
    </section>
  );
}

/* ── S10: Programmes in Brief ── */
function ProgrammesSection() {
  return (
    <section id="programmes" className="bg-gray-950 py-24 px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 50%, #a78bfa 0%, transparent 50%)',
      }} />

      <div className="relative max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-500 font-semibold mb-4">
          Entry Points
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Four ways to work through REACT.
        </h2>
        <p className="text-gray-400 text-base mb-14 max-w-2xl leading-relaxed">
          Every programme at this centre is built on the REACT methodology — the same field immersion, the same proprietary
          frameworks, the same standard of real-world output. What changes is duration, credential, and where you are in your journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {programmes.map((prog, i) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col justify-between bg-gradient-to-b ${prog.color} border-t-4 ${prog.accent} rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300`}
            >
              {prog.tag && (
                <span className="absolute top-4 right-4 px-2 py-0.5 bg-white/10 text-white/80 text-[10px] uppercase tracking-wider rounded-full font-semibold">
                  {prog.tag}
                </span>
              )}
              <div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">{prog.duration}</p>
                <h3 className="text-white font-bold text-lg leading-snug mb-3">{prog.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">{prog.credential}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{prog.eligibility}</p>
              </div>
              <Link to={prog.anchor} className="mt-6 block">
                <button className="w-full text-center text-xs font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white/60 rounded-lg py-2.5 transition-all duration-200 hover:bg-white/5">
                  Know more →
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── S11: Closing CTA ── */
function ClosingCTASection() {
  return (
    <section id="closing-cta" className="bg-gray-950 border-t border-white/5 py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
            Cohort 2 admissions are open<br className="hidden sm:block" /> for the 2026 batch.
          </h2>
          <p className="text-gray-400 text-base mb-10 leading-relaxed max-w-xl mx-auto">
            Each programme has a fixed number of seats. If you are a prospective fellow, now is the time.
            If you are an organisation looking to partner, we want to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
            <Link to="/apply">
              <button
                id="closing-apply-btn"
                className="px-9 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 shadow-xl hover:shadow-amber-400/30 hover:-translate-y-1"
              >
                Apply Now
              </button>
            </Link>
            <Link to="/contact">
              <button
                id="closing-contact-btn"
                className="px-9 py-4 border-2 border-white/30 text-white font-semibold text-sm uppercase tracking-widest rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                Talk to Us
              </button>
            </Link>
          </div>

          {/* Contact details */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-gray-500 text-sm">
            <a href="https://reactfellowship.kumaraguru.in" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">
              reactfellowship.kumaraguru.in
            </a>
            <span className="hidden sm:inline text-gray-700">·</span>
            <a href="https://react.kct.ac.in" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">
              react.kct.ac.in
            </a>
            <span className="hidden sm:inline text-gray-700">·</span>
            <a href="mailto:info.react@kumaraguru.in" className="hover:text-gray-300 transition-colors">
              info.react@kumaraguru.in
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── ROOT EXPORT ───────────────────────────────────────────────────────────────

export default function HomeLanding() {
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
      <RecognitionSection />
      <ProgrammesSection />
      <ClosingCTASection />
    </main>
  );
}