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
    labelHint?: string;
    isLabelHintHidden?: boolean;
    type: string;
    placeholder: string;
    hint?: string;
    required: boolean;
    hasError?: boolean;
    error?: string;
}

export const Input = <T extends string>({
                                            className,
                                            onValue,
                                            value,
                                            name,
                                            label,
                                            labelHint,
                                            isLabelHintHidden,
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
        console.log(event.currentTarget.validationMessage);
    };

    return label ? (
        <label className={styles.inputElement}>
            <span className={styles.inputElement__label}>{label}</span>
            <span className={cn(
                styles.inputElement__hint,
                styles[`inputElement__hint_${isLabelHintHidden}`],
            )}>{labelHint}</span>
            <input
                className={cn(
                    styles.inputElement__input,
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
                <span className={styles.inputElement__input_error}>{error}</span>
            ) : (
                hint && <span className={styles.inputElement__input_hint}>{hint}</span>
            )}
        </label>
    ) : (
        <div className={styles.inputElement}>
            <input
                className={cn(
                    styles.inputElement__input,
                    {
                        [styles.inputElement__input_hasError]: hasError,
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
                <span className={styles.inputElement__input_error}>{error}</span>
            ) : (
                hint && <span className={styles.inputElement__input_hint}>{hint}</span>
            )}
        </div>
    );
};
