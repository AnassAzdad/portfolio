import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiMoon, FiSun, FiX } from "./icons";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t.home, end: true },
    { to: "/about", label: t.about },
    { to: "/projects", label: t.projects },
    { to: "/contact", label: t.contact },
  ];

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${isOpen ? "is-open" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="Anass Azdad — home">
          <span className="brand-mark">AA</span>
          <span className="brand-name">Anass Azdad</span>
        </Link>

        <nav id="site-nav" className="nav-links" aria-label="Hoofdmenu">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="nav-link">
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn lang-btn"
            onClick={() => setLanguage(language === "nl" ? "en" : "nl")}
            aria-label={t.toggleLanguage}
            title={t.toggleLanguage}
          >
            <span className={language === "nl" ? "is-active" : ""}>NL</span>
            <span className="sep">/</span>
            <span className={language === "en" ? "is-active" : ""}>EN</span>
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={t.toggleTheme}
            title={t.toggleTheme}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setIsOpen((o) => !o)}
            aria-expanded={isOpen}
            aria-controls="site-nav"
            aria-label={t.menu}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
