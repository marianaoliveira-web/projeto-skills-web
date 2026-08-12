import { useState } from 'react';
import styles from './Input.module.css';

export function Input({ label, type = 'text', ...rest }) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}

            <div className={styles.inputWrapper}>
                <input className={styles.input} type={inputType} {...rest} />

                {isPassword && (
                    <button
                        type="button"
                        className={styles.toggleButton}
                        onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                )}
            </div>
        </div>
    );
}