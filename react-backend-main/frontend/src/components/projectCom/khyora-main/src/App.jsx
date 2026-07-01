import { useEffect, useState, Fragment } from 'react';
import { initKhyora } from './khyora.motion.js';

const asset = (path) => new URL(`../public/assets/${path}`, import.meta.url).href;

/* ---------- DATA ---------- */
const FEATURES = [
  ['Truly Flushable', 'Disperses safely in water and clears the bowl — no bin, no wrapping, no fuss.', 'M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z'],
  ['Bio-Based Absorbent Core', 'Naturally derived fibres lock moisture away — performance without the plastic.', 'M12 2c3 4 5 7 5 10a5 5 0 0 1-10 0c0-1.6.6-3.2 1.6-4.8M12 2c-2 3-3.4 5.4-4 7.4'],
  ['Leak Protection', 'Confident, all-day security engineered around how women actually move.', 'M4 12a8 8 0 0 1 16 0M4 12a8 8 0 0 0 16 0M12 4v16'],
  ['Rash-Free Comfort', 'A soft, breathable top layer that stays gentle on even sensitive skin.', 'M3 12c3-4 6-4 9 0s6 4 9 0M3 17c3-4 6-4 9 0s6 4 9 0'],
  ['Odor Control', 'Naturally neutralises odour for quiet, all-day freshness.', 'M12 3v4M12 3c-2 2-3 4-3 6a3 3 0 0 0 6 0c0-2-1-4-3-6zM6 20h12'],
  ['Plastic-Free Construction', 'No synthetic films, no microplastics left behind. Ever.', 'M5 5l14 14M8 4h8a2 2 0 0 1 2 2v8M16 20H8a2 2 0 0 1-2-2V8'],
  ['Biodegradable & Compostable', 'Returns to soft, natural fibres that quietly rejoin the earth.', 'M12 21c-5-2-8-6-8-11 4 0 8 3 8 8M12 21c5-2 8-6 8-11-4 0-8 3-8 8M12 21V9'],
  ['Individually Wrapped', 'Discreet, hygienic and travel-ready — protection that goes anywhere.', 'M4 7h16v13H4zM4 7l3-4h10l3 4M12 7v13'],
];

const FAQ = [
  ['Is Khyora really flushable?', 'Yes. Khyora is engineered to disperse safely in water and pass through standard plumbing without clogging. Its bio-based structure begins breaking down on contact, so it can be flushed in most modern systems with confidence.'],
  ['How absorbent is it compared to conventional pads?', 'Khyora matches the absorbency women expect from leading conventional pads. The bio-based core draws moisture in quickly and holds it away from the skin for reliable, all-day protection.'],
  ['Is it truly plastic-free?', 'Khyora is built without the synthetic films and plastic fibres used in most conventional pads. Every layer — top sheet, absorbent core and backsheet — is made from naturally derived, plastic-free materials.'],
  ['Is it safe for sensitive skin?', 'The soft, breathable top layer is designed to stay gentle against the skin and reduce the irritation and rashes often caused by synthetic surfaces, making it well suited to sensitive skin.'],
  ['How biodegradable is it after flushing?', 'Once flushed, Khyora disintegrates into soft biodegradable fibres that break down naturally — returning safely to the environment rather than persisting for centuries like plastic-based products.'],
];

const TEAM = [
  ['Subha Harini', 'CEO', asset('team-subha.jpg'), 'Fashion Technologist and researcher with expertise in product development, prototyping, and innovation-driven design. Recipient of the Vikram Sarabhai Award and multiple Mahatma Gandhi Merit Scholarships, with experience in research, leadership, and multidisciplinary project development. Leads technology, product innovation, and strategic development at Khyora, transforming sustainable ideas into scalable solutions that create meaningful social and environmental impact.'],
  ['Kavinaya', 'Supply Chain Executive', asset('team-kavinaya.jpg'), 'Fashion Technologist specializing in product development, prototyping, supply chain management, and manufacturing operations. Combines research-driven innovation with expertise in procurement, logistics, quality assurance, and production planning to transform concepts into scalable, market-ready solutions. Leads supply chain and production functions at Khyora, overseeing sourcing, manufacturing coordination, operational efficiency, and sustainable product delivery while supporting continuous innovation and product advancement.'],
  ['Brathikan', 'COO', asset('team-brathikan.jpg'), 'Chevening Scholar and MSc graduate in Sustainable Energy Systems from the University of Edinburgh. Founder of REACT and Co-founder of multiple sustainability-driven ventures, with expertise in systems thinking, CFD, FEA, renewable energy technologies, and innovation-led product development. Leads research strategy, ecosystem partnerships, and implementation frameworks to translate innovative ideas into scalable solutions with real-world impact.'],
  ['Krisnan', 'Research & Innovation Engineer', asset('team-krisnan.jpg'), 'Mechanical Engineer and researcher with expertise in renewable energy systems, product design, and sustainable technology development. Award-winning innovator recognized through national research and engineering competitions, with experience in R&D, energy engineering, and prototype development. Leads research and innovation initiatives, driving product improvement, technical validation, and the development of sustainable solutions from concept to implementation.'],
];

const MARQUEE = ['Flushable', 'Bio-Based', 'Plastic-Free', 'Biodegradable', 'Comfort', 'Confidence'];

export default function App() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    initKhyora();
  }, []);

  return (
    <>
      {/* grain + cursor */}
      <div className="grain" aria-hidden="true"></div>
      <div className="cursor" id="cursor" aria-hidden="true"><span className="cursor__label" id="cursorLabel"></span></div>

      {/* page-load intro */}
      <div className="intro" id="intro" aria-hidden="true">
        <div className="intro__word" id="introWord"></div>
        <div className="intro__tag"><span>The Future of Menstrual Comfort</span></div>
        <div className="intro__veil" id="introVeil"></div>
      </div>

      {/* NAV */}
      <nav className="nav" id="nav" data-screen-label="Nav">
        <a href="#top" className="nav__brand" data-cursor="home">Khyora</a>
        <div className="nav__links">
          <a href="#discover">Discover</a>
          <a href="#explore">Explore</a>
          <a href="#product">Product</a>
          <a href="#impact">Impact</a>
          <a href="#team">Team</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="#discover" className="btn nav__cta" data-magnetic data-cursor="explore"><span>Discover Khyora</span></a>
        <button className="nav__burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
      </nav>

      <main id="top">

        {/* HERO */}
        <section className="hero" data-screen-label="Hero">
          <div className="blob blob--sage blob1" data-speed="-2.4"></div>
          <div className="blob blob--blush blob2" data-speed="2.0"></div>
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <div className="hero__eyebrow eyebrow reveal">The Future of Menstrual Comfort</div>
              <h1 className="serif" data-split>The World's Next Generation of Menstrual Care</h1>
              <p className="hero__sub lead reveal">Experience exceptional comfort, leak protection, and confidence with a truly flushable bio-based sanitary pad designed for modern lifestyles and a cleaner future.</p>
              <div className="hero__cta reveal">
                <a href="#product" className="btn" data-magnetic data-cursor="view"><span>Discover Khyora</span></a>
                <a href="#explore" className="tlink" data-cursor="explore">Explore <span className="arrow">→</span></a>
              </div>
            </div>
            <div className="hero__media">
              <div className="hero__portal" id="heroPortal" data-speed="0.8">
                <img className="hero__scene" src={asset('hero-scene.jpg')} alt="" aria-hidden="true" />
                <span className="ripple ripple--1" aria-hidden="true"></span>
                <span className="ripple ripple--2" aria-hidden="true"></span>
                <img className="hero__product" id="heroProduct" src={asset('topsheet.png')} alt="Khyora flushable bio-based sanitary pad" />
                <span className="hero__contact" aria-hidden="true"></span>
              </div>
              <span className="hero__leaf" aria-hidden="true"></span>
            </div>
          </div>
          <div className="hero__scroll"><span className="ln"></span> Scroll to discover</div>
        </section>

        {/* DISCOVER */}
        <section className="discover" id="discover" data-screen-label="Discover">
          <div className="wrap">
            <div className="discover__head">
              <div className="reveal"><span className="eyebrow">Discover Khyora</span></div>
              <div className="discover__belief">
                <p className="discover__big serif reveal">Menstrual care should never force women to choose between comfort and sustainability.</p>
              </div>
            </div>
            <div className="discover__head" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 0 }}>
              <div className="reveal">
                <p className="body">For decades, menstrual products have remained largely unchanged. Women continue to face discomfort, disposal challenges, and products made with synthetic materials that persist in the environment long after use.</p>
              </div>
              <div className="reveal">
                <p className="body">Khyora introduces a truly flushable bio-based sanitary pad that delivers the performance women expect — while eliminating the burden of disposal. By replacing synthetic absorbents with naturally derived alternatives, we built a product designed to return safely to nature after use.</p>
              </div>
            </div>

            <div className="vm">
              <div className="vm__card reveal" data-cursor="">
                <div className="num">01</div>
                <h3>Our Vision</h3>
                <p>A future where menstrual hygiene is not only better for women, but better for the world they live in — care that protects the body and the planet in equal measure.</p>
              </div>
              <div className="vm__card reveal" data-cursor="">
                <div className="num">02</div>
                <h3>Our Mission</h3>
                <p>To replace synthetic, single-use menstrual products with flushable, bio-based care that performs without compromise — comfortable, effective, and effortless to dispose of.</p>
              </div>
            </div>

            <div className="differ">
              <h2 className="serif" data-split>Beyond Conventional Menstrual Products.</h2>
            </div>
          </div>
        </section>

        {/* EXPLORE: PROBLEM */}
        <section className="problem" id="explore" data-screen-label="Explore — The Problem">
          <div className="blobP" data-speed="-1.8"></div>
          <div className="wrap">
            <div className="problem__grid">
              <div>
                <div className="reveal"><span className="eyebrow">Explore — The Problem</span></div>
                <h2 className="serif" data-split style={{ marginTop: '1.4rem' }}>A Monthly Necessity. A Long-Term Problem.</h2>
              </div>
              <div className="reveal">
                <p style={{ marginBottom: '1.3rem' }}>Most conventional pads are built around plastic-based layers — films and synthetic fibers that feel sweaty against skin and never truly break down.</p>
                <p>Disposal is its own burden. For women on the move, there's rarely a dignified option, and every discarded pad adds to a fast-growing mountain of menstrual waste that lingers for centuries.</p>
              </div>
            </div>
            <div className="problem__stats">
              <div className="stat reveal"><div className="n">~90%</div><div className="l">of a conventional pad can be plastic by weight</div></div>
              <div className="stat reveal"><div className="n">500+</div><div className="l">years for that plastic to break down in landfill</div></div>
              <div className="stat reveal"><div className="n">Billions</div><div className="l">of pads discarded worldwide every single year</div></div>
            </div>
          </div>
        </section>

        {/* EXPLORE: SOLUTION */}
        <section className="solution" data-screen-label="Explore — The Solution">
          <div className="wrap">
            <div className="solution__grid">
              <div>
                <div className="reveal"><span className="eyebrow">Explore — The Solution</span></div>
                <h2 className="serif" data-split style={{ marginTop: '1.4rem' }}>Designed Around Women's Needs</h2>
                <p className="body reveal">At the heart of Khyora is a bio-based absorbent technology that performs like the products you trust — without the plastic. After use, the pad disintegrates into soft, biodegradable fibers when flushed, for a simpler and more dignified experience from start to finish.</p>
                <div className="sol-tags reveal">
                  <span>Bio-based absorbency</span><span>Flushable</span><span>Plastic-free</span><span>Dignified disposal</span>
                </div>
              </div>
              <div className="solution__media">
                <img src={asset('core.png')} alt="Khyora bio-based absorbent core" data-speed="1.4" />
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT intro */}
        <section className="product-intro" id="product" data-screen-label="Product">
          <div className="wrap">
            <div className="reveal"><span className="eyebrow" style={{ justifyContent: 'center' }}>Product — Our Flushable Sanitary Pad</span></div>
            <h2 className="serif" data-split>Three Layers. One Effortless Pad.</h2>
            <p className="lead reveal" style={{ marginInline: 'auto' }}>A high-performance sanitary pad engineered for comfort, protection, and effortless disposal.</p>
          </div>
        </section>

        {/* LAYERS SCENE (signature #1) */}
        <section className="layers" data-screen-label="Layers Scene">
          <div className="layers__sticky">
            <div className="layers__caption">
              <span className="eyebrow">The Anatomy of Khyora</span>
              <h3 id="layersTitle">Engineered to come apart.</h3>
            </div>
            <div className="layers__stage" id="layersStage">
              <div className="layer layer--top" id="layTop"><img src={asset('topsheet.png')} alt="Top layer" /></div>
              <div className="layer layer--core" id="layCore"><img src={asset('core.png')} alt="Bio-based absorbent core" /></div>
              <div className="layer layer--back" id="layBack"><img src={asset('topsheet.png')} alt="Backsheet" /></div>

              <div className="leader" id="lead1" style={{ top: '30%', left: '56%' }}><span className="line"></span><span className="badge">1</span><span className="txt">Top Layer</span></div>
              <div className="leader" id="lead2" style={{ top: '50%', left: '58%' }}><span className="line"></span><span className="badge">2</span><span className="txt">Bio-Based<br />Absorbent Core</span></div>
              <div className="leader" id="lead3" style={{ top: '70%', left: '56%' }}><span className="line"></span><span className="badge">3</span><span className="txt">Backsheet</span></div>
            </div>
            <div className="layers__progress"><i><b id="pb0"></b></i><i><b id="pb1"></b></i><i><b id="pb2"></b></i></div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features" data-screen-label="Features">
          <div className="wrap">
            <div className="features__head">
              <h2 className="serif" data-split>Everything a modern pad should be.</h2>
              <p className="lead reveal" style={{ maxWidth: '30ch' }}>Eight reasons Khyora feels like the obvious next step.</p>
            </div>
            <div className="fgrid" id="fgrid">
              {FEATURES.map(([title, desc, path]) => (
                <article className="fcard reveal" key={title}>
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg>
                  </span>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT / DISSOLVE (signature #2) */}
        <section className="impact" id="impact" data-screen-label="Impact">
          <div className="wrap">
            <div className="impact__grid">
              <div>
                <div className="reveal"><span className="eyebrow">Impact</span></div>
                <h2 className="serif" data-split style={{ marginTop: '1.4rem' }}>Creating Comfort Today. Reducing Waste Tomorrow.</h2>
                <p className="body reveal">Khyora's dual-purpose design delivers the comfort and protection women rely on, then opens a flushable, bio-based pathway to genuinely sustainable menstrual hygiene — without compromise. Used today, returned to nature tomorrow.</p>
              </div>
              <div className="dissolve-wrap">
                <canvas id="dissolve"></canvas>
                <div className="dissolve-msg" id="dissolveMsg">
                  <div className="sm">Returns safely to nature</div>
                  <div className="serif">Flushed. Dissolved. Gone.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq" id="faq" data-screen-label="FAQ">
          <div className="wrap faq__grid">
            <h2 className="serif" data-split>Good to know.</h2>
            <div className="acc" id="acc">
              {FAQ.map(([q, a]) => (
                <div className="acc__item" key={q}>
                  <button className="acc__q" data-cursor="" aria-expanded="false"><span>{q}</span><span className="acc__icon"></span></button>
                  <div className="acc__a"><p>{a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="team" id="team" data-screen-label="Team">
          <div className="wrap">
            <div className="team__head">
              <div className="reveal"><span className="eyebrow">The People Behind Khyora</span></div>
              <h2 className="serif" data-split>Meet the team.</h2>
              <p className="lead reveal" style={{ maxWidth: '40ch' }}>A multidisciplinary team turning sustainable ideas into real-world impact.</p>
            </div>
            <div className="taccordion reveal">
              {TEAM.map(([name, role, photo, bio], i) => (
                <Fragment key={name}>
                  <button
                    type="button"
                    className="tpanel"
                    data-active={active === i}
                    onClick={() => setActive(i)}
                    aria-label={`Show ${name}`}
                    data-cursor="view"
                  >
                    <img className="tpanel__img" src={photo} alt={name} loading="lazy" />
                    <span className="tpanel__name">{name}</span>
                  </button>
                  <div className="tcard" data-open={active === i} aria-hidden={active !== i}>
                    <div className="tcard__inner">
                      <span className="tcard__mark" aria-hidden="true">&rdquo;</span>
                      <h4>{name}</h4>
                      <span className="tcard__role">{role}</span>
                      <p>{bio}</p>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section className="marquee" aria-hidden="true" data-screen-label="Marquee">
          <div className="marquee__track" id="marquee">
            {[...MARQUEE, ...MARQUEE].map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>
        </section>

        {/* FOOTER / CONTACT */}
        <footer className="footer" id="contact" data-screen-label="Contact / Footer">
          <div className="wrap">
            <div className="footer__top">
              <p className="footer__close serif reveal">Khyora is redefining menstrual care through a truly flushable bio-based sanitary pad that delivers exceptional comfort, reliable protection, and effortless disposal — without leaving a lasting impact on the environment.</p>
              <div className="footer__col reveal">
                <h5>Explore</h5>
                <a href="#discover" data-cursor="">Discover</a>
                <a href="#explore" data-cursor="">The Problem</a>
                <a href="#product" data-cursor="">Product</a>
                <a href="#impact" data-cursor="">Impact</a>
                <a href="#faq" data-cursor="">FAQ</a>
              </div>
              <div className="footer__col reveal">
                <h5>Contact</h5>
                <a href="mailto:react@kct.ac.in" data-cursor="email">react@kct.ac.in</a>
                <a href="tel:9976139198" data-cursor="call">9976139198</a>
                <h5 style={{ marginTop: '1.6rem' }}>Follow</h5>
                <a href="#" data-cursor="">Instagram</a>
                <a href="#" data-cursor="">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="footer__word"><span className="wm">Khyora — Khyora — Khyora — Khyora — </span></div>
          <div className="wrap">
            <div className="footer__legal">
              <span>© 2026 Khyora. All rights reserved.</span>
              <span><a href="#" data-cursor="">Privacy</a><a href="#" data-cursor="">Terms</a></span>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
