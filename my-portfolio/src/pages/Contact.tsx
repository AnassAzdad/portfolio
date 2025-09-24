import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 🔹 Verstuur email via EmailJS
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_q48jgdq", // <-- jouw service ID
        "template_ixgtndx", // <-- jouw template ID
        formRef.current,
        "kBJ0ovQsp0AOVFzz5" // <-- jouw public key
      )
      .then(
        () => {
          setStatus("✅ Bericht succesvol verstuurd!");
          formRef.current?.reset();
        },
        () => {
          setStatus("❌ Versturen mislukt, probeer opnieuw.");
        }
      );
  };

  // 🔹 Meteor achtergrond (zelfde als home/project1)
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
    <div className="contact-container">
      <canvas ref={canvasRef} className="contact-background" />
      <div className="contact-box">
        <h1>📩 Neem contact op</h1>
        <form ref={formRef} onSubmit={sendEmail}>
          <input type="text" name="name" placeholder="Jouw naam" required />
          <input type="email" name="email" placeholder="Jouw e-mail" required />
          <textarea name="message" placeholder="Je bericht..." rows={5} required />
          <button type="submit">Verstuur</button>
        </form>
        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}

export default Contact;
