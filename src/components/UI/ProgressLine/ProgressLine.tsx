import styles from './ProgressLine.module.scss';
import cn from 'classnames';

interface IProgressLine {
  pageNumber: number;
}

const ProgressLine = ({ pageNumber }: IProgressLine) => {
  const numbers: number[] = [1, 2, 3, 4, 5, 6];

  return (
    <ul className={styles.lines}>
      {numbers.map((number: number, i) => (
        <li
          key={i}
          className={cn(
            styles.lines__line,
            pageNumber === number ? styles.lines__line_active : '',
            pageNumber > number ? styles.lines__line_visited : '',
          )}
        ></li>
      ))}
    </ul>
  );
};

export default ProgressLine;
