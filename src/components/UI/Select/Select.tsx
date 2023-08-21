import {ChangeEvent, ReactNode, SelectHTMLAttributes} from "react";

import styles from "./Select.module.scss";
import cn from "classnames";

export interface ISelect<T extends string>
    extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    onValue: ({value, name}: { value: string; name: T }) => void;
    value: string;
    name: T;
    label?: string;
    labelStyles?: string;
    labelHint?: string;
    isLabelHintHidden?: boolean;
    hint?: string;
    required: boolean;
    placeholder?: string;
    hasError?: boolean;
    error?: string;
    children: ReactNode;
}

export const Select = <T extends string>({
                                             className,
                                             onValue,
                                             value,
                                             name,
                                             label,
                                             labelStyles = "label16",
                                             labelHint,
                                             isLabelHintHidden,
                                             hint,
                                             required,
                                             placeholder,
                                             hasError,
                                             error,
                                             children,
                                             ...rest
                                         }: ISelect<T>) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        // const {value, name} = event.currentTarget;
        // onValue({value, name: name as T});
        console.log(event.currentTarget.value);
    };

    return label ? (
        <label className={styles.selectElement}>
            <span className={cn(styles.selectElement__label, styles[`selectElement__${labelStyles}`])}>{label}</span>
            <span className={cn(
                styles.selectElement__hint,
                styles[`selectElement__hint_${isLabelHintHidden}`],
            )}>{labelHint}</span>
            <select
                className={cn(
                    styles.selectElement__select,
                    {
                        [styles.selectElement__select_hasError]: hasError,
                    },
                    className,
                )}
                name={name}
                value={value}
                required={required}
                onChange={handleChange}
                {...rest}
            >
                {children}
            </select>
            <span className={cn(styles.selectElement__placeholder, styles.selectElement__placeholder_withLabel)}>{placeholder}</span>
            {hasError ? (
                <span className={styles.selectElement__error}>{error}</span>
            ) : (
                hint && <span className={styles.selectElement__hint}>{hint}</span>
            )}
        </label>
    ) : (
        <div className={styles.selectElement}>
            <select
                className={cn(
                    styles.selectElement__select,
                    {
                        [styles.selectElement__select_hasError]: hasError,
                    },
                    className,
                )}
                name={name}
                value={value}
                required={required}
                onChange={handleChange}
                {...rest}
            >
                {children}
            </select>
            <span className={cn(styles.selectElement__placeholder, styles.selectElement__placeholder_withoutLabel)}>{placeholder}</span>
            {hasError ? (
                <span className={styles.selectElement__error}>{error}</span>
            ) : (
                hint && <span className={styles.selectElement__hint}>{hint}</span>
            )}
        </div>
    );
};
