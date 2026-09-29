import { Link } from "react-router-dom";
import { FiArrowRight, FiDownload } from "../components/icons";
import { useLanguage } from "../context/LanguageContext";
import { skills, translations } from "../translations";
import "./About.css";

function About() {
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <div className="page">
      <section className="container about-hero">
        <div className="about-hero-copy">
          <span className="eyebrow rise">{t.eyebrow}</span>
          <h1 className="page-title rise rise-2">{t.title}</h1>
          <div className="prose rise rise-3">
            {t.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "lead-first" : undefined}>
                {p}
              </p>
            ))}
          </div>
          <div className="hero-actions rise rise-4">
            <Link to="/projects" className="btn btn-primary">
              {t.cta} <FiArrowRight aria-hidden="true" />
            </Link>
            <a href="/CV_Anass_Azdad.pdf" download className="btn">
              <FiDownload aria-hidden="true" /> {t.cv}
            </a>
          </div>
        </div>
        <div className="monogram rise rise-3" aria-hidden="true">
          <span>AA</span>
          <svg viewBox="0 0 200 200" className="orbit">
            <circle cx="100" cy="100" r="92" fill="none" />
            <circle cx="100" cy="8" r="4" className="orbit-dot" />
          </svg>
        </div>
      </section>

      <section className="container about-split">
        <div className="section-head">
          <span className="eyebrow">{t.workTitle}</span>
          <h2>{t.workTitle}</h2>
        </div>
        <div className="prose">
          {t.work.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="container about-split">
        <div className="section-head">
          <span className="eyebrow">{t.timelineTitle}</span>
          <h2>{t.timelineTitle}</h2>
        </div>
        <ol className="timeline">
          {t.timeline.map((item) => (
            <li key={item.title}>
              <span className="timeline-period">{item.period}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.place}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container">
        <div className="section-head">
          <span className="eyebrow">{t.skillsTitle}</span>
          <h2>{t.skillsTitle}</h2>
          <p>{t.skillsIntro}</p>
        </div>
        <ul className="skills-grid">
          {skills.map((s) => (
            <li key={s.name} className="skill">
              <img src={s.img} alt="" />
              <span>{s.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default About;
