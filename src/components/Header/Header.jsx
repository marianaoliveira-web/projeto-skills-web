import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

export function Header() {
  const navigate = useNavigate();
  const userStorage = localStorage.getItem("@app:user");
  const user = userStorage ? JSON.parse(userStorage) : null;

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("@app:theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDark]);

  function toggleTheme() {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("@app:theme", newTheme ? "dark" : "light");
  }

  function handleLogout() {
    localStorage.removeItem("@app:user");
    localStorage.removeItem("@app:token");
    localStorage.removeItem("@app:usuarioId");
    navigate("/");
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Projeto Skills</h1>

        <button onClick={toggleTheme} className={styles.btnTheme}>
          {isDark ? "☀️ Claro" : "🌙 Escuro"}
        </button>

        <div className={styles.userInfo}>
          <span className={styles.greeting}>
            Olá, {user?.login || "Usuário"}!
          </span>

          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}