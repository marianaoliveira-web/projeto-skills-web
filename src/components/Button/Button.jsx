import styles from './Button.module.css';

export function Button({ children, variant = 'primary', ...rest }) {
    const variantClass = variant === 'danger' ? styles.danger : styles.primary;

    return (
        <button className={`${styles.button} ${variantClass}`} {...rest}>
            {children}
        </button>
    );
}