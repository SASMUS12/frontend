import cn from "classnames";

import styles from "./styles.module.css";

import type {ChangeEvent} from "react";

export const Input = ({
                          className,
                          onValue,
                          value,
                          name,
                          type,
                          placeholder,
                          required,
                          hasError,
                          error,
                          hint,
                      }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.currentTarget;
        onValue({value, name});
        console.log(value, name);
    };

    return (
        <>
            <input
                className={cn(
                    styles.input,
                    {
                        [styles.hasError]: hasError,
                    },
                    className,
                )}
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={handleChange}
            />
            {hasError ? (
                <span className={styles.error}>{error}</span>
            ) : (
                hint && <span className={styles.hint}>{hint}</span>
            )}
        </>
    );
};