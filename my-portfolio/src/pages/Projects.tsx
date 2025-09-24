import React, { useEffect, useRef } from "react";
import "./Projects.css";

const Projects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Meteors achtergrond (zelfde als Home en Project pagina’s)
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

      constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.ctx = ctx;
        this.x = Math.random() * width;
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
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "5rem",
        textAlign: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1600px" }}>
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "900",
            marginBottom: "3rem",
            textShadow: "0 0 10px #a259ff",
          }}
        >
          🚀 Mijn Projecten
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "3.5rem",
            maxWidth: "1200px",
            width: "90%",
            margin: "0 auto",
            marginBottom: "4rem",
          }}
        >
          {[
            {
              title: "Project 1: Kalender",
              img: "/project1.png",
              link: "/project1",
            },
            {
              title: "Project 2: Weer App",
              img: "/project2.png",
              link: "/project2",
            },
            {
              title: "Project 3: Currency Converter",
              img: "/project3.png",
              link: "/project3",
            },
          ].map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              style={{
                display: "block",
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                height: "350px", // grotere boxen
                cursor: "pointer",
                boxShadow: "0 6px 25px rgba(0,0,0,0.6)",
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${project.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                  filter: "blur(1.5px) brightness(0.65)",
                  transition: "all 0.3s ease",
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
                  fontSize: "2rem",
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                {project.title} <br /> Klik om te bekijken
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
