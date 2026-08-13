import { useState, useEffect } from 'react';
import styles from './AuthHeader.module.css';

export default function AuthHeader() {
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

    return (
        <header className={styles.authHeader}>
            <div className={styles.logoContainer}>
                <span className={styles.logoText}>Projeto Skills</span>
            </div>
            
            <button 
                type="button" 
                onClick={toggleTheme} 
                className={styles.themeToggleBtn}
                title="Alternar tema"
            >
                {isDark ? '☀️ Claro' : '🌙 Escuro'}
            </button>
        </header>
    );
}