# Khyora

The Khyora marketing site, built with **React + Vite + Tailwind CSS v4**.

## Stack

- **Vite 6** — dev server & build
- **React 18**
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — available for utility classes
- **GSAP + ScrollTrigger** — scroll-driven scenes (layers explode, dissolve canvas, parallax)
- **Lenis** — smooth scrolling

The bespoke design system lives in [`src/styles/khyora.css`](src/styles/khyora.css) and is
loaded after Tailwind so its rules win over Tailwind's preflight. The imperative motion
layer (intro, custom cursor, reveals, FAQ accordion, the "Engineered to come apart" layers
scene, and the dissolve canvas) is in [`src/khyora.motion.js`](src/khyora.motion.js) and runs
once from a `useEffect` in [`src/App.jsx`](src/App.jsx).

Static images live in [`public/assets/`](public/assets) and are referenced with absolute
paths (e.g. `/assets/topsheet.png`).

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Deploy to Vercel

Vercel auto-detects Vite. Either:

- **Dashboard:** import the repo — Framework Preset **Vite**, Build Command `npm run build`,
  Output Directory `dist` (all detected automatically).
- **CLI:**
  ```bash
  npm i -g vercel
  vercel          # preview deploy
  vercel --prod   # production deploy
  ```

## Notes

- The footer contact email is a placeholder (`hello@khyora.com`) — replace it in
  [`src/App.jsx`](src/App.jsx) with the real address.
