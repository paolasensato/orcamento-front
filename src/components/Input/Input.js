import React from "react";
import styles from './Input.module.css';

const Input = props => {
    const { label, id, ...others} = props;

    return (
        <div className={styles.container}>
            <label id={id}>{label}</label>
            <input 
                {...others}
                className={styles.input}
                id={id}
                placeholder={label}
            />
        </div>
    );
}

export default Input;