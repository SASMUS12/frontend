import type {ChangeEvent, InputHTMLAttributes} from 'react';

//import search from "../../../images/svg/search.svg";

import styles from './Input.module.scss';
import cn from 'classnames';
import cn from 'classnames';

export interface InputProps<T extends string>
  extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onValue?: ({ value, name }: { value: string; name: T }) => void;
  value: string;
  name: T;
  label?: string;
  labelStyles?: string;
    labelStyles?: string;
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
  labelStyles = 'label16',
                                            labelStyles = "label16",
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
    const { value, name } = event.currentTarget;
    onValue({ value, name: name as T });
    console.log(event.currentTarget.validationMessage);
  };

    return label ? (
        <label className={styles.inputElement}>
            <span className={cn(styles.inputElement__label, styles[`inputElement__${labelStyles}`])}>{label}</span>
            <span className={cn(
                styles.inputElement__hint,
                styles[`inputElement__hint_${isLabelHintHidden}`],
            )}>{labelHint}</span>
            <input
                className={cn(
                    styles.inputElement__input,
                    {
                        [styles.inputElement__input_hasError]: hasError,
                        [styles.inputElement__input_searchInput]: type === "search",
                        [styles.inputElement__input_dateInput]: type === "date"
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
                <span className={styles.inputElement__error}>{error}</span>
            ) : (
                hint && <span className={styles.inputElement__hint}>{hint}</span>
            )}
        </label>
    ) : (
        <div className={styles.inputElement}>
            <input
                className={cn(
                    styles.inputElement__input,
                    {
                        [styles.inputElement__input_hasError]: hasError,
                        [styles.inputElement__input_searchInput]: type === "search",
                        [styles.inputElement__input_dateInput]: type === "date"
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
                <span className={styles.inputElement__error}>{error}</span>
            ) : (
                hint && <span className={styles.inputElement__hint}>{hint}</span>
            )}
        </div>
    );
};