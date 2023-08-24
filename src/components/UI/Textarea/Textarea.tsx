import {ChangeEvent, TextareaHTMLAttributes} from "react";

import styles from "./Textarea.module.scss";
import cn from "classnames";

interface Props<T extends string>
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
    onValue: ({value, name}: { value: string; name: T }) => void;
    name: T;
    value: string;
    label?: string;
    hint?: string;
    hasError?: boolean;
    error?: string;
}

export const Textarea = <T extends string>({
                                               className,
                                               onValue,
                                               name,
                                               value,
                                               label,
                                               hint,
                                               hasError,
                                               error,
                                               ...rest
                                           }: Props<T>) => {
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const {value, name} = event.currentTarget;
        onValue({value, name: name as T});
        console.log(event.currentTarget);
    };

    return label ? (
        <label className={cn(className)}>
            <span className={styles.label}>{label}</span>
            <textarea
                className={cn(styles.textarea, {[styles.hasError]: hasError})}
                onChange={handleChange}
                name={name}
                value={value}
                {...rest}
            >
                {value}
            </textarea>
            {hasError ? (
                <span className={styles.error}>{error}</span>
            ) : (
                hint && <span className={styles.hint}>{hint}</span>
            )}
        </label>
    ) : (
        <>
            <textarea
                className={cn(styles.textarea, {[styles.hasError]: hasError}, className)}
                onChange={handleChange}
                name={name}
                value={value}
                {...rest}
            >
                {value}
            </textarea>
            {hasError ? (
                <span className={styles.error}>{error}</span>
            ) : (
                hint && <span className={styles.hint}>{hint}</span>
            )}
        </>
    );
};
