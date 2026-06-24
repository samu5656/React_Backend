/* ===========================================================
   KHYORA — interaction + motion (ported to ES modules)
   Drives the imperative animation layer over the React-rendered DOM.
   =========================================================== */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let started = false;

export function initKhyora() {
  if (started) return;          // run exactly once
  started = true;

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NOMOTION = REDUCED;
  const isTouch = window.matchMedia('(max-width:860px)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- WORD SPLIT for [data-split] ---------- */
  function splitWords() {
    $$('[data-split]').forEach((el) => {
      const text = el.textContent.trim();
      el.textContent = '';
      el.classList.add('wreveal');
      text.split(/(\s+)/).forEach((tok) => {
        if (/^\s+$/.test(tok)) { el.appendChild(document.createTextNode(' ')); return; }
        const w = document.createElement('span'); w.className = 'w';
        const i = document.createElement('i'); i.textContent = tok;
        w.appendChild(i); el.appendChild(w);
      });
    });
  }

  /* ---------- INTRO ---------- */
  function intro(done) {
    const word = $('#introWord');
    'Khyora'.split('').forEach((ch) => {
      const s = document.createElement('span'); s.textContent = ch; word.appendChild(s);
    });
    if (NOMOTION) { $('#intro').style.display = 'none'; done(); return; }
    const fin = () => { $('#intro').style.display = 'none'; done(); };
    const tl = gsap.timeline({ onComplete: fin });
    tl.to('#introWord span', { y: 0, duration: .9, stagger: .06, ease: 'expo.out' }, .2)
      .to('.intro__tag span', { y: 0, duration: .7, ease: 'expo.out' }, '-=.55')
      .to('#introWord span', { y: '-115%', duration: .6, stagger: .035, ease: 'expo.in' }, '+=.55')
      .to('.intro__tag span', { y: '-115%', duration: .5, ease: 'expo.in' }, '<')
      .to('#intro', { yPercent: -100, duration: .9, ease: 'power4.inOut' }, '-=.15');
  }

  /* ---------- SMOOTH SCROLL ---------- */
  let lenis = null;
  function smoothScroll() {
    if (REDUCED) return;
    lenis = new Lenis({ lerp: .09, wheelMultiplier: 1, smoothWheel: true });
    lenis.on('scroll', () => ScrollTrigger.update());
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    // anchor links
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const t = $(id); if (!t) return;
        e.preventDefault();
        lenis.scrollTo(t, { offset: id === '#top' ? -200 : -10, duration: 1.4 });
      });
    });
  }

  /* ---------- CUSTOM CURSOR ---------- */
  function cursor() {
    if (isTouch) return;
    const cur = $('#cursor'), lab = $('#cursorLabel');
    let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty;
    addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    function raf() {
      cx += (tx - cx) * .18; cy += (ty - cy) * .18;
      cur.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      const dark = $$('.problem,.impact,.footer,.marquee').some((s) => {
        const r = s.getBoundingClientRect(); return ty >= r.top && ty <= r.bottom;
      });
      cur.classList.toggle('is-light', dark);
      requestAnimationFrame(raf);
    }
    raf();
    const LABELS = { view: 'View', explore: 'Explore', home: 'Top', email: 'Write', call: 'Call' };
    document.body.addEventListener('mouseover', (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) {
        cur.classList.add('is-ring');
        const key = t.getAttribute('data-cursor');
        lab.textContent = LABELS[key] || '';
      }
    });
    document.body.addEventListener('mouseout', (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('[data-cursor]'))) {
        cur.classList.remove('is-ring'); lab.textContent = '';
      }
    });
  }

  /* ---------- MAGNETIC ---------- */
  function magnetic() {
    if (isTouch) return;
    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        gsap.to(el, { x: dx * .3, y: dy * .4, duration: .5, ease: 'power3.out' });
      });
      el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' }));
    });
  }

  /* ---------- REVEALS ---------- */
  function reveals() {
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: .16, rootMargin: '0px 0px -8% 0px' });
    $$('.reveal, .wreveal, .mask-line').forEach((el) => io.observe(el));
    // stagger feature cards
    if (!REDUCED) {
      const fio = new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          if (en.isIntersecting) {
            $$('.fcard').forEach((c, i) => { c.style.transitionDelay = ((i % 4) * 0.07 + 0.02) + 's'; });
            fio.disconnect();
          }
        });
      }, { threshold: .1 });
      const fg = $('#fgrid'); if (fg) fio.observe(fg);
    }
  }

  /* ---------- NAV condense ---------- */
  function nav() {
    const n = $('#nav');
    const upd = () => { n.classList.toggle('cond', scrollY > 40); };
    upd(); addEventListener('scroll', upd, { passive: true });
    $('#burger').addEventListener('click', () => {
      const t = $('#discover'); if (lenis) lenis.scrollTo(t); else t.scrollIntoView();
    });
  }

  /* ---------- PARALLAX ---------- */
  function parallax() {
    if (NOMOTION) return;
    $$('[data-speed]').forEach((el) => {
      const sp = parseFloat(el.getAttribute('data-speed'));
      gsap.to(el, {
        yPercent: sp * -9,
        ease: 'none',
        scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
    if (!isTouch) {
      gsap.to('.hero__leaf', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }
  }

  /* ---------- LAYERS SCENE ---------- */
  function layersScene() {
    const top = $('#layTop'), core = $('#layCore'), back = $('#layBack');
    const title = $('#layersTitle');
    const D = Math.min(innerHeight * 0.26, 250);

    gsap.set([top, core, back], { xPercent: -50, yPercent: -50 });
    gsap.set(core, { scale: .82 });
    gsap.set('.leader', { opacity: 0 });
    gsap.set('.leader .line', { width: 0 });

    if (REDUCED) {
      gsap.set(top, { y: -D }); gsap.set(back, { y: D });
      gsap.set('.leader', { opacity: 1 }); gsap.set('.leader .line', { width: 64 });
      title.textContent = 'Three working layers.';
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.layers', start: 'top top', end: 'bottom bottom', scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          title.textContent = p < .18 ? 'Engineered to come apart.'
            : p < .62 ? 'Three working layers.'
              : 'A single, effortless pad.';
          [0, 1, 2].forEach((i) => {
            const seg = Math.min(1, Math.max(0, (p - i * 0.14) / 0.16));
            const b = $('#pb' + i); if (b) b.style.transform = 'scaleX(' + seg + ')';
          });
        },
      },
    });
    tl.to(top, { y: -D, rotateX: 54, scale: .94, duration: 1, ease: 'power1.inOut' }, 0)
      .to(core, { rotateX: 54, y: 0, duration: 1, ease: 'power1.inOut' }, 0)
      .to(back, { y: D, rotateX: 54, scale: 1.0, duration: 1, ease: 'power1.inOut' }, 0)
      .to('.leader', { opacity: 1, duration: .4, stagger: .12 }, .45)
      .fromTo('.leader .line', { width: 0 }, { width: 64, duration: .4, stagger: .12 }, .5)
      .to([top, back], { y: 0, scale: 1, duration: 1, ease: 'power2.inOut' }, 1.5)
      .to([top, core, back], { rotateX: 0, duration: 1, ease: 'power2.inOut' }, 1.5)
      .to('.leader', { opacity: 0, duration: .4 }, 1.5)
      .to('.leader .line', { width: 0, duration: .4 }, 1.6);
  }

  /* ---------- DISSOLVE (impact) ---------- */
  function dissolve() {
    const canvas = $('#dissolve'); if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const wrap = canvas.parentElement;
    const img = new Image();
    img.src = '/assets/topsheet.png';
    let parts = [], W = 0, H = 0, dpr = Math.min(2, devicePixelRatio || 1), ready = false;
    let progress = 0;

    function size() {
      W = wrap.clientWidth; H = wrap.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function sample() {
      const pad = 0.82;
      let iw = img.width, ih = img.height;
      const s = Math.min(W * 0.7 / iw, H * pad / ih);
      iw *= s; ih *= s;
      const ox = (W - iw) / 2, oy = (H - ih) / 2;
      const off = document.createElement('canvas');
      const step = Math.max(3, Math.round(Math.min(iw, ih) / 130));
      off.width = Math.ceil(iw / step); off.height = Math.ceil(ih / step);
      const octx = off.getContext('2d');
      octx.drawImage(img, 0, 0, off.width, off.height);
      const data = octx.getImageData(0, 0, off.width, off.height).data;
      parts = [];
      for (let y = 0; y < off.height; y++) {
        for (let x = 0; x < off.width; x++) {
          const idx = (y * off.width + x) * 4;
          const a = data[idx + 3];
          if (a < 40) continue;
          const px = ox + x * step, py = oy + y * step;
          const nx = x / off.width;
          const ny = y / off.height;
          const thr = Math.min(0.85, (0.55 * ny + 0.25 * nx) + (Math.random() * 0.18));
          parts.push({
            x: px, y: py,
            r: data[idx], g: data[idx + 1], b: data[idx + 2], a: a / 255,
            s: step * 0.92,
            thr,
            vx: (Math.random() * 1.4 + 0.4) * (28 + nx * 40),
            vy: -(Math.random() * 1.2 + 0.6) * (36),
            rot: (Math.random() - 0.5) * 4,
            w: Math.random() * 6 + 2,
          });
        }
      }
      ready = true; render();
    }
    function render() {
      if (!ready) return;
      ctx.clearRect(0, 0, W, H);
      const p = progress;
      for (let i = 0; i < parts.length; i++) {
        const pt = parts[i];
        if (p <= pt.thr) {
          ctx.globalAlpha = pt.a;
          ctx.fillStyle = `rgb(${pt.r},${pt.g},${pt.b})`;
          ctx.fillRect(pt.x, pt.y, pt.s, pt.s);
        } else {
          const t = Math.min(1, (p - pt.thr) / (1 - pt.thr + 0.0001));
          const ease = t * t;
          const drift = Math.sin((pt.x + pt.y) * 0.05 + t * 6) * pt.w;
          const x = pt.x + pt.vx * ease + drift;
          const y = pt.y + pt.vy * ease - ease * ease * 40;
          ctx.globalAlpha = pt.a * (1 - t);
          ctx.fillStyle = `rgb(${pt.r},${pt.g},${pt.b})`;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(pt.rot * t);
          ctx.fillRect(0, 0, pt.s * (1 - t * 0.4), pt.s * (1 - t * 0.4));
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1;
    }
    img.onload = () => { size(); sample(); };
    addEventListener('resize', () => { size(); if (img.complete) sample(); render(); });

    const msg = $('#dissolveMsg');
    if (NOMOTION) {
      progress = 0;
      const check = setInterval(() => { if (ready) { render(); clearInterval(check); } }, 80);
      msg.style.opacity = '0';
      return;
    }
    ScrollTrigger.create({
      trigger: '.impact', start: 'top 75%', end: 'bottom top', scrub: 1,
      onUpdate: (self) => {
        progress = Math.min(1, self.progress * 1.35);
        render();
        msg.style.opacity = Math.max(0, (progress - 0.55) / 0.4);
      },
    });
  }

  /* ---------- FAQ ---------- */
  function faq() {
    $$('.acc__item').forEach((item) => {
      const q = $('.acc__q', item), a = $('.acc__a', item);
      q.addEventListener('click', () => {
        const open = item.classList.contains('open');
        $$('.acc__item').forEach((o) => {
          o.classList.remove('open'); $('.acc__a', o).style.height = '0px'; $('.acc__q', o).setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('open');
          a.style.height = a.scrollHeight + 'px';
          q.setAttribute('aria-expanded', 'true');
        }
        setTimeout(() => ScrollTrigger.refresh(), 520);
      });
    });
  }

  /* ---------- INIT ---------- */
  function init() {
    gsap.registerPlugin(ScrollTrigger);
    splitWords();
    cursor();
    magnetic();
    nav();
    faq();
    smoothScroll();
    reveals();
    requestAnimationFrame(() => {
      parallax();
      layersScene();
      dissolve();
      ScrollTrigger.refresh();
    });
  }

  intro(init);
}
