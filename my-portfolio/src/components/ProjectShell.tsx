import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "./icons";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import "./ProjectShell.css";

type Props = {
  slug: string;
  children: ReactNode;
};

// Gemeenschappelijke kop + frame voor de live project-apps
export default function ProjectShell({ slug, children }: Props) {
  const { language } = useLanguage();
  const t = translations[language].projects;
  const index = t.list.findIndex((p) => p.slug === slug);
  const project = t.list[index];

  return (
    <div className="page project-page">
      <section className="container project-shell">
        <header className="project-shell-head">
          <Link to="/projects" className="back-link rise">
            <FiArrowLeft aria-hidden="true" /> {t.back}
          </Link>
          <span className="eyebrow rise rise-2">
            P{String(index + 1).padStart(2, "0")} · {project.kicker}
          </span>
          <h1 className="page-title rise rise-2">{project.title}</h1>
          <p className="lead rise rise-3">{project.description}</p>
          <ul className="tags rise rise-3">
            {project.stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
        </header>

        <div className="app-frame rise rise-4">
          <div className="app-frame-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <code>anassazdad.com/{slug}</code>
          </div>
          <div className="app-frame-body">{children}</div>
        </div>
      </section>
    </div>
  );
}
