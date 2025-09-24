import { useEffect, useRef } from "react";
import "./About.css";

function About() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Meteor achtergrond
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
        const g = this.ctx.createLinearGradient(this.x, this.y, this.x - 30, this.y - 30);
        g.addColorStop(0, "white");
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
      if (Math.random() < 0.02) meteors.push(new Meteor(ctx, canvas.width, canvas.height));
      raf = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="about-container">
      <canvas ref={canvasRef} className="about-background" />

      <section className="about-section">
        <h1>👋 Over mij</h1>
        <p>
          Ik ben <span className="highlight">Anass</span>, een software developer in opleiding 
          met een passie voor <strong>frontend development</strong> en het bouwen van 
          moderne, interactieve webapplicaties. 🚀
        </p>
      </section>

      <section className="about-section">
        <div className="about-image-cta">
          {/* ✅ Vervanging avatar.png door een anonieme placeholder */}
          <div className="avatar-placeholder">?</div>

          <div>
            <p>
              Mijn favoriete tools zijn <span className="highlight">React</span>,{" "}
              <span className="highlight">TypeScript</span> en{" "}
              <span className="highlight">CSS</span>. 
              Ik hou van experimenteren met animaties, API’s en creatieve ideeën om 
              mijn projecten een unieke stijl te geven.
            </p>
            <a href="/projects" className="cta-button">
              Bekijk mijn projecten
            </a>
          </div>
        </div>
      </section>

      {/* ✅ Skills Row */}
      <section className="about-section skills-section">
        <h2>⚡ Skills</h2>
        <div className="skills-row">
          {[ "React", "TypeScript", "CSS", "HTML", "Git" ].map((skill, idx) => (
            <div key={idx} className="skill-icon">
              {skill}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
