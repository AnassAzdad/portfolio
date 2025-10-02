import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const roles = {
  nl: ["Software Developer in opleiding", "Frontend Developer"],
  en: ["Software Developer in training", "Frontend Developer"],
};

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language].home;

  // Typewriter effect
  const [currentText, setCurrentText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentRole = roles[language][roleIndex];
    if (charIndex < currentRole.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + currentRole[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentText("");
        setCharIndex(0);
        setRoleIndex((prev) => (prev + 1) % roles[language].length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, roleIndex, language]);

  // Meteor effect
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
        const gradient = this.ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - 30,
          this.y - 30
        );
        gradient.addColorStop(0, theme === "dark" ? "white" : "black");
        gradient.addColorStop(1, "transparent");
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    let meteors: Meteor[] = [];
    let raf = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      meteors.forEach((meteor, index) => {
        meteor.update();
        meteor.draw();
        if (meteor.y > canvas.height) meteors.splice(index, 1);
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
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "4rem",
        textAlign: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px" }}>
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "900",
            marginBottom: "1rem",
          }}
        >
          {t.greeting}{" "}
          <span
            style={{
              color: "#a259ff",
              textShadow:
                "0 0 5px #a259ff, 0 0 10px #a259ff, 0 0 20px #a259ff",
            }}
          >
            Anass
          </span>
        </h1>

        <p
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            minHeight: "3rem",
          }}
        >
          {currentText}
          <span style={{ color: "#a259ff" }}> |</span>
        </p>

        <p
          style={{
            fontSize: "1.25rem",
            color: theme === "dark" ? "#ccc" : "#444",
            marginBottom: "3rem",
          }}
        >
          {t.tagline}
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          <a
            href="/about"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2.5rem",
              backgroundColor: theme === "dark" ? "#2d2d2d" : "#eee",
              color: theme === "dark" ? "#fff" : "#000",
              fontWeight: 600,
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              fontSize: "1.25rem",
            }}
          >
            {t.moreAboutMe} <span style={{ fontSize: "1.5rem" }}>➔</span>
          </a>

          <a
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2.5rem",
              backgroundColor: "#a259ff",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              fontSize: "1.25rem",
            }}
          >
            {t.viewProjects} <span style={{ fontSize: "1.5rem" }}>➔</span>
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "3.5rem",
            maxWidth: "1600px",
            width: "100%",
            margin: "0 auto",
            marginBottom: "4rem",
          }}
        >
          {t.projects.map((project, idx) => (
            <a
              key={idx}
              href="/projects" // 👈 altijd naar /projects
              style={{
                display: "block",
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                height: "250px",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  backgroundImage: `url(/project${idx + 1}.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                  filter: "blur(1.2px) brightness(0.7)",
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
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {project.title} <br /> {project.subtitle}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
