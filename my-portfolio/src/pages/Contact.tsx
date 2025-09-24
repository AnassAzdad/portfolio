import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import emailjs from "@emailjs/browser";
import "./Contact.css";

function Contact() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Versturen...");

    emailjs
      .send("service_xxx", "template_xxx", form, "publicKey_xxx")
      .then(() => {
        setStatus("✅ Bericht verzonden!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => setStatus("❌ Er ging iets mis."));
  };

  return (
    <div
      className="contact-container"
      style={{
        backgroundColor: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <canvas ref={canvasRef} className="contact-background" />

      <div className="contact-box">
        <h1>📬 Contact</h1>
        <p>Stuur me gerust een bericht via dit formulier.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Naam"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Bericht"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button type="submit">Verstuur</button>
        </form>

        {status && <p className="status">{status}</p>}

        
        <div style={{ marginTop: "2rem" }}>
          <a
            href="/CV_Anass_Azdad.pdf"
            download
            style={{
              display: "inline-block",
              padding: "1rem 2.5rem",
              backgroundColor: "#a259ff",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            }}
          >
            📄 Download mijn CV
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
