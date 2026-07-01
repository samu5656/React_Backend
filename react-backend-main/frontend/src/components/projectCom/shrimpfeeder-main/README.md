# Model 500 — Precision Aquaculture Feeder

Marketing site for the Model 500 automatic aquaculture feeder, built as a
**React + Vite + Tailwind CSS** single-page app with rich **Framer Motion**
scroll and interaction animations.

## Stack

- **Vite 5** — dev server + build
- **React 18**
- **Tailwind CSS 3** — design tokens mapped in `tailwind.config.js`; ported
  component classes live in `@layer components` inside `src/index.css`
- **Framer Motion 11** — all scroll reveals, staggers, parallax, tilt, count-ups

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Project structure

```
index.html              # Vite entry HTML (loads fonts + #root)
public/assets/          # images (served from /assets/...)
src/
  main.jsx              # React root
  App.jsx               # page composition
  index.css             # Tailwind layers + design tokens + component classes
  data.js               # all section content (team, specs, gallery, …)
  components/
    motion.jsx          # Reveal / Stagger / StaggerItem primitives
    Tilt.jsx            # spring-smoothed 3D pointer tilt
    CountUp.jsx         # in-view count-up numbers
    HeroMotes.jsx       # canvas particle drift over the hero
    ScrollProgress.jsx  # top scroll-progress bar
    SectionHead.jsx     # shared eyebrow/title/lead header
    icons.jsx           # inline SVG icons (Spark, Arrow, social)
  sections/             # one component per page section
    Nav, Hero, Mission, ProductCutaway, Engineering, SpecStrip,
    HowItWorks, FieldGallery, Solutions, Team, Contact, Footer
```

## Motion & animation features

- **Scroll progress bar** pinned to the top of the page
- **Hero parallax** — background image drifts/scales and content lifts on scroll
- **Floating feed-mote particles** on the hero (canvas, pauses off-screen)
- **Scroll-reveal** fade/slide on every section, with **staggered** children
- **Count-up** statistics that animate the first time they enter view
- **3D tilt** on the cutaway, exploded render, and cards
- **Hover motion** — card lift, image zoom, button fill, animated underlines
- **Animated mobile menu** (height/opacity) and **sticky nav** scroll state
- **Drifting footer statement** tied to scroll position
- Fully respects **`prefers-reduced-motion`** — animations degrade gracefully

The original single-file design is preserved at `Aquaculture Feeder.html` for
reference.
