import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext"; 
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import "./Projects.css";

function Projects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language].projects; // ✅ teksten uit translations

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    class Meteor {
      x: number;
      y: number;
      size: number;
      speed: number;
      ctx: CanvasRenderingContext2D;
      constructor(c: CanvasRenderingContext2D, w: number, h: number) {
        this.ctx = c;
        this.x = Math.random() * w;
        this.y = -10;
        this.size = Math.random() * 3 + 2;
        this.speed = Math.random() * 4 + 3;
      }
      update() {
        this.x += this.speed;
        this.y += this.speed;
      }
      draw() {
        const g = this.ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - 30,
          this.y - 30
        );
        g.addColorStop(0, theme === "dark" ? "white" : "black");
        g.addColorStop(1, "transparent");
        this.ctx.fillStyle = g;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    let meteors: Meteor[] = [];
    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      meteors.forEach((m, i) => {
        m.update();
        m.draw();
        if (m.y > canvas.height) meteors.splice(i, 1);
      });
      if (Math.random() < 0.02)
        meteors.push(new Meteor(ctx, canvas.width, canvas.height));
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(raf);
    };
  }, [theme]);

  return (
    <div
      className="projects-container"
      style={{
        backgroundColor: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <canvas ref={canvasRef} className="projects-background" />

      <div className="projects-content">
        <h1
          className="projects-title"
          style={{ color: theme === "dark" ? "white" : "black" }}
        >
          🚀 {t.title}
        </h1>
        <p style={{ color: theme === "dark" ? "white" : "black" }}>
          {t.description}
        </p>

        <div className="projects-grid">
          {t.list.map((p, idx) => (
            <div key={idx}>
              <a href={p.link} className="project-card">
                <div
                  className="project-image"
                  style={{ backgroundImage: `url(${p.img})` }}
                />
                <div
                  className="project-overlay"
                  style={{ color: theme === "dark" ? "white" : "black" }}
                >
                  {p.title}
                </div>
              </a>
              <p
                className="project-description"
                style={{ color: theme === "dark" ? "white" : "black" }}
              >
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
