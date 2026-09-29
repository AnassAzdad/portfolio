import { useEffect, useRef } from "react";
import "./StarField.css";

type Star = { x: number; y: number; r: number; phase: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

// Eén rustige sterrenhemel achter de hele site, met af en toe een meteoor.
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let raf = 0;
    let t = 0;

    const starColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--star").trim() || "236,233,245";

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((width * height) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.2,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      const rgb = starColor();
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        const alpha = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t * 0.02 + s.phase));
        ctx.fillStyle = `rgba(${rgb},${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      meteors = meteors.filter((m) => m.life > 0 && m.x < width + 200 && m.y < height + 200);
      for (const m of meteors) {
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 1;
        const tail = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
        tail.addColorStop(0, `rgba(${rgb},0.9)`);
        tail.addColorStop(1, `rgba(${rgb},0)`);
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
        ctx.stroke();
      }

      if (Math.random() < 0.006) {
        const speed = Math.random() * 4 + 5;
        meteors.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.3 - 40,
          vx: speed,
          vy: speed * 0.55,
          life: 140,
        });
      }

      t += 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduceMotion) {
      // Alleen een stilstaande sterrenhemel
      const rgb = starColor();
      for (const s of stars) {
        ctx.fillStyle = `rgba(${rgb},0.4)`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      draw();
    }

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="starfield" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="starfield-glow" />
    </div>
  );
}
