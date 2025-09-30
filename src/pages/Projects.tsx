import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext"; // ✅ theme hook
import "./Projects.css";

function Projects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

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

  const projects = [
    {
      title: "📅 Project 1: Kalender",
      img: "/project1.png",
      link: "/project1",
      description:
        "Een interactieve kalender waarin je afspraken kan plannen. Inclusief emailnotificaties via EmailJS en een custom UI met React en CSS."
    },
    {
      title: "🌦️ Project 2: Weer App",
      img: "/project2.png",
      link: "/project2",
      description:
        "Een weer-app die live data ophaalt via de OpenWeatherMap API. Typ een stad in en krijg direct de actuele weersvoorspelling."
    },
    {
      title: "💱 Project 3: Currency Converter",
      img: "/project3.png",
      link: "/project3",
      description:
        "Een valuta-converter met live wisselkoersen. Gemaakt met de ExchangeRate API en React hooks om bedragen om te rekenen tussen meerdere munteenheden."
    }
  ];

  return (
    <div
      className="projects-container"
      style={{
        backgroundColor: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black"
      }}
    >
      <canvas ref={canvasRef} className="projects-background" />

      <div className="projects-content">
        <h1
          className="projects-title"
          style={{ color: theme === "dark" ? "white" : "black" }}
        >
          🚀 Projecten
        </h1>
        <p style={{ color: theme === "dark" ? "white" : "black" }}>
          Hier zijn mijn favoriete projecten. Klik erop om ze in actie te zien.
        </p>

        <div className="projects-grid">
          {projects.map((p, idx) => (
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
