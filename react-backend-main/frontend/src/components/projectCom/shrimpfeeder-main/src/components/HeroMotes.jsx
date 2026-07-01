import { useEffect, useRef } from "react";

/**
 * HeroMotes — floating golden "feed mote" particles drifting up over the
 * hero image. Pauses when the hero scrolls out of view, and is disabled
 * entirely under prefers-reduced-motion.
 */
export default function HeroMotes() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let motes = [];
    let running = true;
    let raf = null;

    function resize() {
      w = host.offsetWidth;
      h = host.offsetHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.round(w / 26);
      motes = [];
      for (let i = 0; i < n; i++) {
        motes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.8 + 0.5,
          sp: Math.random() * 0.35 + 0.12,
          dx: (Math.random() - 0.5) * 0.25,
          a: Math.random() * 0.5 + 0.15,
          tw: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.y -= m.sp;
        m.x += m.dx;
        m.tw += 0.02;
        if (m.y < -6) {
          m.y = h + 6;
          m.x = Math.random() * w;
        }
        if (m.x < -6) m.x = w + 6;
        if (m.x > w + 6) m.x = -6;
        const alpha = m.a * (0.6 + 0.4 * Math.sin(m.tw));
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(231,198,126," + alpha.toFixed(3) + ")";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);

    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          running = entries[0].isIntersecting;
          if (running) raf = requestAnimationFrame(draw);
        },
        { threshold: 0 }
      );
      io.observe(host);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}
