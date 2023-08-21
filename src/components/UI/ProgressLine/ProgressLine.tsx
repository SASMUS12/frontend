import styles from "./ProgressLine.module.scss";
import cn from "classnames";

const ProgressLine = ({ pageNumber }) => {
    return (
        <ul className={styles.lines}>
            <li className={cn(
                styles.lines__line,
                pageNumber === 1 ? styles.lines__line_active : "",
                pageNumber > 1 ? styles.lines__line_visited : ""
            )}></li>
            <li className={cn(
                styles.lines__line,
                pageNumber === 2 ? styles.lines__line_active : "",
                pageNumber > 2 ? styles.lines__line_visited : ""
            )}></li>
            <li className={cn(
                styles.lines__line,
                pageNumber === 3 ? styles.lines__line_active : "",
                pageNumber > 3 ? styles.lines__line_visited : ""
            )}></li>
            <li className={cn(
                styles.lines__line,
                pageNumber === 4 ? styles.lines__line_active : "",
                pageNumber > 4 ? styles.lines__line_visited : ""
            )}></li>
            <li className={cn(
                styles.lines__line,
                pageNumber === 5 ? styles.lines__line_active : "",
                pageNumber > 5 ? styles.lines__line_visited : ""
            )}></li>
            <li className={cn(
                styles.lines__line,
                pageNumber > 6 ? styles.lines__line_active : "",
            )}></li>
        </ul>
    );
}

export default ProgressLine;
