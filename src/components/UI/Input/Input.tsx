import type {ChangeEvent, InputHTMLAttributes} from 'react';
import cn from 'classnames';

import styles from './Input.module.scss';

export interface InputProps<T extends string>
    extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    onValue: ({value, name}: { value: string; name: T }) => void;
    value: string;
    name: T;
    label?: string;
    type?: string;
    placeholder?: string;
    hint?: string;
    required?: boolean;
    hasError?: boolean;
    error?: string;
}

export const Input = <T extends string>({
                                            className,
                                            onValue,
                                            value,
                                            name,
                                            label,
                                            type,
                                            placeholder,
                                            hint,
                                            required,
                                            hasError,
                                            error,
                                            ...rest
                                        }: InputProps<T>) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.currentTarget;
        onValue({value, name: name as T});
    };

    return label ? (
        <label className={styles.root}>
            <span className={styles.root__label}>{label}</span>
            <input
                className={cn(
                    styles.root__input,
                    className,
                )}
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={handleChange}
                {...rest}
            />
            {hasError ? (
                <span className={styles.root__input_error}>{error}</span>
            ) : (
                hint && <span className={styles.root__input_hint}>{hint}</span>
            )}
        </label>
    ) : (
        <div className={styles.root}>
            <input
                className={cn(
                    styles.root__input,
                    {
                        [styles.root__input_hasError]: hasError,
                    },
                    className,
                )}
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                required={required}
                onChange={handleChange}
                {...rest}
            />
            {hasError ? (
                <span className={styles.root__input_error}>{error}</span>
            ) : (
                hint && <span className={styles.root__input_hint}>{hint}</span>
            )}
        </div>
    );
};
