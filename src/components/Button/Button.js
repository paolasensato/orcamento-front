import React from "react";
import styles from './Button.module.css';

const Button = ({text, icon, disabled, ...others}) => {
    const buttonClass = `${styles.button} ${disabled ? styles.disabled : ''}`;

    return (
        <button 
            {...others}
            className={buttonClass}
            disabled={disabled}
        >
            {icon ? <span className={styles.iconPrefix}>{icon}</span> : null}
            <span>{text}</span>
        </button>
    );
}

export default Button;