import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;

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

      {/* Navigatie */}
      <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
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
                color: theme === "dark" ? "#fff" : "#222", // 👈 styling blijft exact zoals jij had
                textDecoration: "none",
                fontWeight: 500,
                position: "relative",
                paddingBottom: "4px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  theme === "dark" ? "#bbb" : "#666";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  theme === "dark" ? "#fff" : "#222";
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
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  theme === "dark" ? "#bbb" : "#666";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  theme === "dark" ? "#fff" : "#222";
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
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  theme === "dark" ? "#bbb" : "#666";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  theme === "dark" ? "#fff" : "#222";
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
              onMouseEnter={(e) => {
                e.currentTarget.style.color =
                  theme === "dark" ? "#bbb" : "#666";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  theme === "dark" ? "#fff" : "#222";
              }}
            >
              {t.contact}
            </Link>
          </li>
        </ul>

        {/* 🌍 Language Switcher */}
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

        {/* Theme toggle */}
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
