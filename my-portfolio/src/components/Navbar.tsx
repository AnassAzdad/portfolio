import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: theme === "dark" ? "#1f1f1f" : "#f5f5f5",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
      }}
    >
      <h1
        style={{
          color: theme === "dark" ? "#fff" : "#222",
          fontSize: "1.5rem",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        Portfolio{" "}
        <span style={{ color: theme === "dark" ? "#bbb" : "#555" }}>Anass</span>
      </h1>

      {/* 📱 Hamburger button for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "none",
          background: "transparent",
          border: "none",
          fontSize: "1.8rem",
          cursor: "pointer",
          color: theme === "dark" ? "#fff" : "#222",
        }}
        className="mobile-toggle"
      >
        ☰
      </button>

      {/* Navigatie */}
      <nav
        style={{
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          position: "absolute",
          top: "100%",
          right: 0,
          backgroundColor: theme === "dark" ? "#1f1f1f" : "#f5f5f5",
          width: "200px",
          padding: "1rem",
          gap: "1rem",
        }}
        className="mobile-nav"
      >
        <Link to="/" onClick={() => setIsOpen(false)}>{t.home}</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>{t.about}</Link>
        <Link to="/projects" onClick={() => setIsOpen(false)}>{t.projects}</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>{t.contact}</Link>

        <button onClick={() => setLanguage(language === "nl" ? "en" : "nl")}>
          {language === "nl" ? "EN" : "NL"}
        </button>

        <button onClick={toggleTheme}>
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </nav>

      {/* Desktop nav */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}
        className="desktop-nav"
      >
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "2rem",
            margin: 0,
            padding: 0,
          }}
        >
          <li><Link to="/">{t.home}</Link></li>
          <li><Link to="/about">{t.about}</Link></li>
          <li><Link to="/projects">{t.projects}</Link></li>
          <li><Link to="/contact">{t.contact}</Link></li>
        </ul>

        <button onClick={() => setLanguage(language === "nl" ? "en" : "nl")}>
          {language === "nl" ? "EN" : "NL"}
        </button>

        <button
          onClick={toggleTheme}
          style={{
            marginLeft: "1rem",
            padding: "0.4rem 0.8rem",
            borderRadius: "20px",
            cursor: "pointer",
            border: "none",
            fontSize: "1.2rem",
            background: theme === "dark" ? "#a259ff" : "#8b3ddb",
            color: "white",
          }}
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </nav>

      <style>
        {`
          /* Alleen mobiel */
          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-toggle {
              display: block !important;
            }
            .mobile-nav a, .mobile-nav button {
              color: ${theme === "dark" ? "#fff" : "#222"};
              text-decoration: none;
              font-weight: 500;
              text-align: left;
            }
          }
          @media (min-width: 769px) {
            .mobile-toggle, .mobile-nav {
              display: none !important;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Navbar;
