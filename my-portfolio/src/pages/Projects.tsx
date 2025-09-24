import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

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
        const g = this.ctx.createLinearGradient(this.x, this.y, this.x - 30, this.y - 30);
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
      if (Math.random() < 0.02) meteors.push(new Meteor(ctx, canvas.width, canvas.height));
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
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
        padding: "6rem 2rem",
        textAlign: "center",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "2rem", color: "#a259ff" }}>🚀 Projecten</h1>
        <p style={{ marginBottom: "3rem" }}>
          Hier zijn mijn favoriete projecten. Klik erop om meer te bekijken.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3rem",
          }}
        >
          {[
            { title: "Project 1: Kalender", img: "/project1.png", link: "/project1" },
            { title: "Project 2: Weer App", img: "/project2.png", link: "/project2" },
            { title: "Project 3: Currency Converter", img: "/project3.png", link: "/project3" },
          ].map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              style={{
                display: "block",
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                height: "280px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${project.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                  filter: "blur(1.2px) brightness(0.7)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                }}
              >
                {project.title}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
