import { useEffect, useRef } from "react";
import "./About.css";

function About() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  
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
    Hallo, ik ben <span className="highlight">Anass Azdad</span>.  
    Ik zit in mijn derde jaar Software Development op het Mediacollege Amsterdam.  
    Ik hou me vooral bezig met <strong>frontend</strong>, omdat ik het tof vind om iets te maken wat er strak uitziet én goed werkt. 
  </p>
</section>

<section className="about-section">
  <div className="about-image-cta">
    <div className="about-image">
    
    </div>
    <div>
      <p>
        Tijdens school heb ik o.a. gewerkt aan een <strong>kalender/planner</strong>, en thuis heb ik gewerkt aan een <strong>weer-app</strong> en een <strong>currency converter</strong>.  
        Ik vind het leuk om te spelen met <span className="highlight">API’s</span> en animaties om dingen wat extra leven te geven.  
      </p>
      <p>
        Styling vind ik trouwens ook belangrijk.  
        We zijn officieel geen designers, maar ik zorg er wel voor dat m’n projecten er netjes en modern uitzien.
      </p>
      <a href="/projects" className="cta-button">
        Bekijk mijn projecten
      </a>
    </div>
  </div>
</section>




      
      <section className="about-section skills-section">
        <h2>⚡ Skills</h2>
        <div className="skills-row">
          {[
            { name: "React",   },
            { name: "TypeScript",  },
            { name: "JavaScript",   },
            { name: "PHP",   },
            { name: "CSS",   },
            { name: "HTML",   },
            { name: "Git",  },
          ].map((skill, idx) => (
            <div key={idx} className="skill-icon">
              <img  alt={skill.name} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
