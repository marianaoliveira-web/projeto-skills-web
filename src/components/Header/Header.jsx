import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
    const navigate = useNavigate();
    const userStorage = localStorage.getItem('@app:user');
    const user = userStorage ? JSON.parse(userStorage) : null;

    function handleLogout() {
        localStorage.removeItem('@app:user');
        localStorage.removeItem('@app:token');
        navigate('/');
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.logo}>Projeto Skills</h1>

                <div className={styles.userInfo}>
                    <span className={styles.greeting}>
                        Olá, {user?.login || 'Usuário'}!
                        </span>

                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Sair
                    </button>
                </div>
            </div>
        </header>
    );
}