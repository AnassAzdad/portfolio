import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import ProjectCard from "../components/ProjectCard";
import "./Projects.css";

function Projects() {
  const { language } = useLanguage();
  const t = translations[language].projects;

  return (
    <div className="page">
      <section className="container">
        <div className="section-head projects-head">
          <span className="eyebrow rise">{t.eyebrow}</span>
          <h1 className="page-title rise rise-2">{t.title}</h1>
          <p className="lead rise rise-3">{t.description}</p>
        </div>
        <div className="projects-grid">
          {t.list.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} openLabel={t.open} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Projects;
