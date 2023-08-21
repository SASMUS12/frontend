import styles from "./ProgressLine.module.scss";
import cn from "classnames";

const ProgressLine = ({pageNumber}) => {
    const numbers: any = [1, 2, 3, 4, 5];

    return (
        <ul className={styles.lines}>
            {numbers.map((number: number, i) => (
                <li key={i}
                    className={cn(
                        styles.lines__line,
                        pageNumber === i + 1 ? styles.lines__line_active : "",
                        pageNumber > i + 1 ? styles.lines__line_visited : ""
                    )}
                ></li>
            ))}
        </ul>
    );
}

export default ProgressLine;
