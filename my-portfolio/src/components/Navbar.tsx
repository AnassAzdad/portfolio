import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import "./Navbar.css"; // 👈 apart css bestand voor responsive gedrag

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
        Portfolio <span style={{ color: theme === "dark" ? "#bbb" : "#555" }}>Anass</span>
      </h1>

      {/* 📱 Hamburger knop */}
      <button
        className="mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* 📱 Mobiel menu */}
      <nav className={`mobile-nav ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>{t.home}</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>{t.about}</Link>
        <Link to="/projects" onClick={() => setIsOpen(false)}>{t.projects}</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>{t.contact}</Link>

        <button onClick={() => { setLanguage(language === "nl" ? "en" : "nl"); setIsOpen(false); }}>
          {language === "nl" ? "EN" : "NL"}
        </button>
        <button onClick={() => { toggleTheme(); setIsOpen(false); }}>
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </nav>

      {/* 💻 Desktop menu (jouw huidige styling blijft) */}
      <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "2rem",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link
              to="/"
              style={{
                color: theme === "dark" ? "#fff" : "#222",
                textDecoration: "none",
                fontWeight: 500,
                position: "relative",
                paddingBottom: "4px",
                transition: "color 0.3s ease",
              }}
            >
              {t.home}
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              style={{
                color: theme === "dark" ? "#fff" : "#222",
                textDecoration: "none",
                fontWeight: 500,
                position: "relative",
                paddingBottom: "4px",
                transition: "color 0.3s ease",
              }}
            >
              {t.about}
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              style={{
                color: theme === "dark" ? "#fff" : "#222",
                textDecoration: "none",
                fontWeight: 500,
                position: "relative",
                paddingBottom: "4px",
                transition: "color 0.3s ease",
              }}
            >
              {t.projects}
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              style={{
                color: theme === "dark" ? "#fff" : "#222",
                textDecoration: "none",
                fontWeight: 500,
                position: "relative",
                paddingBottom: "4px",
                transition: "color 0.3s ease",
              }}
            >
              {t.contact}
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setLanguage(language === "nl" ? "en" : "nl")}
          style={{
            marginLeft: "1rem",
            padding: "0.4rem 0.8rem",
            borderRadius: "20px",
            cursor: "pointer",
            border: "none",
            background: "transparent",
            color: theme === "dark" ? "#fff" : "#222",
            fontSize: "0.9rem",
          }}
        >
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
            transition: "all 0.3s",
          }}
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
