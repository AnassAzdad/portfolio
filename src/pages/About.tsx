import { useEffect, useRef } from "react";
import "./About.css";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import { useTheme } from "../context/ThemeContext";

function About() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language].about;

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
      if (!canvas || !ctx) return;
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
      className="about-container"
      style={{
        backgroundColor: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <canvas ref={canvasRef} className="about-background" />

      <section className="about-section">
        <h1>👋 {t.title}</h1>
        <p
          style={{ color: theme === "dark" ? "white" : "black" }}
          dangerouslySetInnerHTML={{ __html: t.intro }}
        />
      </section>

      <section className="about-section">
        <div className="about-image-cta">
          <div className="about-image"></div>
          <div>
            <p
              style={{ color: theme === "dark" ? "white" : "black" }}
              dangerouslySetInnerHTML={{ __html: t.projects1 }}
            />
            <p
              style={{ color: theme === "dark" ? "white" : "black" }}
              dangerouslySetInnerHTML={{ __html: t.projects2 }}
            />
            <a href="/projects" className="cta-button">
              {t.cta}
            </a>
          </div>
        </div>
      </section>

      <section className="about-section skills-section">
        <h2>⚡ {t.skillsTitle}</h2>
        <div className="skills-row">
          {[
            { name: "React", img: "/react.png" },
            { name: "TypeScript", img: "/typescript.png" },
            { name: "JavaScript", img: "/javascript.png" },
            { name: "PHP", img: "/php.png" },
            { name: "CSS", img: "/css3.svg" },
            { name: "HTML", img: "/html5.png" },
            { name: "Git", img: "/git.png" },
          ].map((skill, idx) => (
            <div key={idx} className="skill-icon">
              <img src={skill.img} alt={skill.name} />
              <p style={{ color: theme === "dark" ? "white" : "black" }}>
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
