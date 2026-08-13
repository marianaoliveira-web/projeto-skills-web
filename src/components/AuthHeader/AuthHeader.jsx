import styles from './AuthHeader.module.css';

export default function AuthHeader({ toggleTheme, isDark }) {
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