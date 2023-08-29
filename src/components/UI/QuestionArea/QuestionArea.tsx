import { FC, ReactNode } from 'react';

import styles from './QuestionArea.module.scss';
import cn from 'classnames';

interface IQuestionArea {
  children: ReactNode;
  className?: string;
}

const QuestionArea: FC<IQuestionArea> = ({ children, className }) => {
  return <div className={cn(styles.questionArea, className)}>{children}</div>;
};

export default QuestionArea;
