import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "../components/icons";
import { useLanguage } from "../context/LanguageContext";
import { skills, translations } from "../translations";
import ProjectCard from "../components/ProjectCard";
import "./Home.css";

function useTypewriter(words: readonly string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setText("");
    setWordIndex(0);
    setDeleting(false);
  }, [words]);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let delay = deleting ? 40 : 85;
    if (!deleting && text === word) delay = 1800;
    if (deleting && text === "") delay = 300;

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, wordIndex, words]);

  return text;
}

const formatAmsterdamTime = () =>
  new Intl.DateTimeFormat("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Amsterdam",
  }).format(new Date());

function useAmsterdamTime() {
  const format = formatAmsterdamTime;
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(formatAmsterdamTime()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const Home: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].home;
  const projects = translations[language].projects;
  const role = useTypewriter(t.roles);
  const time = useAmsterdamTime();

  return (
    <div className="page">
      <section className="container hero">
        <div className="hero-main">
          <span className="status-pill rise">
            <span className="status-dot" aria-hidden="true" />
            {t.status}
          </span>
          <h1 className="hero-title rise rise-2">
            <span className="hero-greeting">{t.greeting}</span>
            Anass Azdad
          </h1>
          <p className="hero-role rise rise-2" aria-label={t.roles.join(", ")}>
            <span className="accent" aria-hidden="true">
              &gt;
            </span>{" "}
            <span aria-hidden="true">{role}</span>
            <span className="caret" aria-hidden="true" />
          </p>
          <p className="lead rise rise-3">{t.tagline}</p>
          <div className="hero-actions rise rise-4">
            <Link to="/projects" className="btn btn-primary">
              {t.viewProjects} <FiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/about" className="btn">
              {t.moreAboutMe}
            </Link>
          </div>
        </div>

        <aside className="hero-log rise rise-3" aria-label="Info">
          <div className="log-row log-head">
            <span>52.37° N</span>
            <span>4.90° E</span>
          </div>
          <dl className="log-list">
            {t.facts.map((f) => (
              <div className="log-row" key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            <div className="log-row">
              <dt>{t.localTime}</dt>
              <dd className="tabular">{time} · AMS</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="container">
        <div className="section-head section-head-row">
          <div className="section-head">
            <span className="eyebrow">{projects.eyebrow}</span>
            <h2>{t.selectedTitle}</h2>
            <p>{t.selectedIntro}</p>
          </div>
          <Link to="/projects" className="btn">
            {t.allProjects} <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="home-projects">
          {projects.list.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} openLabel={projects.open} />
          ))}
        </div>
      </section>

      <section className="container">
        <div className="section-head">
          <span className="eyebrow">Stack</span>
          <h2>{t.stackTitle}</h2>
        </div>
        <ul className="stack-strip">
          {skills.map((s) => (
            <li key={s.name}>
              <img src={s.img} alt="" />
              <span>{s.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container">
        <div className="cta-band">
          <div className="cta-copy">
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
          </div>
          <Link to="/contact" className="btn btn-primary">
            {t.ctaButton} <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
