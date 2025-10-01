import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import "./Project4.css";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

function Project4() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language].project4; // 👈 haalt de quiz teksten uit translations

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

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

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === t.questions[currentQ].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 < t.questions.length) {
      setCurrentQ(currentQ + 1);
      setAnswered(null);
    } else {
      setFinished(true);
    }
  };

  return (
    <div
      className="project4-container"
      style={{
        backgroundColor: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <canvas ref={canvasRef} className="project4-background" />
      <div
        className="quiz-box"
        style={{ background: theme === "dark" ? "#1e1e1e" : "#f2f2f2" }}
      >
        {!finished ? (
          <>
            <h1>📝 {t.title}</h1>
            <h2>{t.questions[currentQ].question}</h2>
            <div className="options">
              {t.questions[currentQ].options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`option-btn ${
                    answered !== null
                      ? idx === t.questions[currentQ].answer
                        ? "correct"
                        : idx === answered
                        ? "wrong"
                        : ""
                      : ""
                  }`}
                  onClick={() => handleAnswer(idx)}
                  disabled={answered !== null}
                >
                  {opt}
                </button>
              ))}
            </div>
            {answered !== null && (
              <button className="next-btn" onClick={nextQuestion}>
                {t.next}
              </button>
            )}
            <p>
              {t.progress.replace("{current}", (currentQ + 1).toString()).replace("{total}", t.questions.length.toString())} | {t.score}: {score}
            </p>
          </>
        ) : (
          <div className="result">
            <h1>🎉 {t.finished}</h1>
            <p>
              {t.result}: {score} / {t.questions.length}
            </p>
            <button className="next-btn" onClick={() => window.location.reload()}>
              {t.retry}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Project4;
