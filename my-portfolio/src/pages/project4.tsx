import { useState } from "react";
import { FiArrowRight, FiCheck, FiRotateCcw, FiX } from "../components/icons";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import ProjectShell from "../components/ProjectShell";
import "./Project4.css";

function Project4() {
  const { language } = useLanguage();
  const t = translations[language].project4;

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = t.questions[currentQ];
  const total = t.questions.length;
  const isLast = currentQ + 1 >= total;

  const handleAnswer = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === question.answer) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (!isLast) {
      setCurrentQ((q) => q + 1);
      setAnswered(null);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setAnswered(null);
    setFinished(false);
  };

  const progress = ((currentQ + (answered !== null || finished ? 1 : 0)) / total) * 100;

  return (
    <ProjectShell slug="project4">
      <div className="quiz">
        <div className="quiz-top">
          <span>
            {finished
              ? t.finished
              : t.progress.replace("{current}", String(currentQ + 1)).replace("{total}", String(total))}
          </span>
          <span>
            {t.score}: {score}
          </span>
        </div>
        <div
          className="quiz-progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <span style={{ width: `${progress}%` }} />
        </div>

        {!finished ? (
          <>
            <h2 className="quiz-question">{question.question}</h2>
            <div className="quiz-options">
              {question.options.map((opt, idx) => {
                let state = "";
                if (answered !== null) {
                  if (idx === question.answer) state = "is-correct";
                  else if (idx === answered) state = "is-wrong";
                  else state = "is-dim";
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`quiz-option ${state}`}
                    onClick={() => handleAnswer(idx)}
                    disabled={answered !== null}
                  >
                    <span className="quiz-letter">{String.fromCharCode(65 + idx)}</span>
                    <span>{opt}</span>
                    {state === "is-correct" && <FiCheck className="quiz-mark" aria-hidden="true" />}
                    {state === "is-wrong" && <FiX className="quiz-mark" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            {answered !== null && (
              <button type="button" className="btn btn-primary quiz-next" onClick={nextQuestion}>
                {isLast ? t.finish : t.next} <FiArrowRight aria-hidden="true" />
              </button>
            )}
          </>
        ) : (
          <div className="quiz-result">
            <p className="quiz-result-label">{t.result}</p>
            <p className="quiz-score">
              {score}
              <span>/{total}</span>
            </p>
            <button type="button" className="btn" onClick={restart}>
              <FiRotateCcw aria-hidden="true" /> {t.retry}
            </button>
          </div>
        )}
      </div>
    </ProjectShell>
  );
}

export default Project4;
