import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // 

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

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
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Projects", path: "/projects" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
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
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        
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

export default Header;
