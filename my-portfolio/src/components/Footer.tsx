import { Link } from "react-router-dom";
import { FiArrowUp, FiGithub } from "./icons";
import { useLanguage } from "../context/LanguageContext";
import { GITHUB_URL, translations } from "../translations";
import "./Footer.css";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-name">Anass Azdad</span>
          <span className="footer-meta">
            © {new Date().getFullYear()} · {t.footer.built}
          </span>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <Link to="/about">{t.nav.about}</Link>
          <Link to="/projects">{t.nav.projects}</Link>
          <Link to="/contact">{t.nav.contact}</Link>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            <FiGithub aria-hidden="true" /> GitHub
          </a>
        </nav>

        <button
          type="button"
          className="icon-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t.footer.top}
          title={t.footer.top}
        >
          <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}
