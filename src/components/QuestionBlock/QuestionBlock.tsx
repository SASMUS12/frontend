import React, {useEffect, useState, FC } from 'react';
import styles from "./QuestionBlock.module.scss";
import IQuestion from '../../types/types'
import arrow from '../../images/arrow.png';

interface IProps {
  item: IQuestion
}

const QuestionBlock: React.FC<IProps> = (props: IProps) => {

  const [isOpen, setIsOpen] = useState(false);

  const { item } = props;

  return(
    <div className={styles.questionBlock}>
      <div>
        <h3>{item.question}</h3>
        <img 
          src={arrow} 
          alt="Стрелка вниз (открывает текст по клику)" 
          className={isOpen ? styles.questionBlock__picDown : styles.questionBlock__picRight} 
          onClick={() => {setIsOpen(!isOpen)}}/>
      </div>
      {isOpen && item.text.map((current, i) => <p key={i}>{current}</p>)}
    </div>
  );
};

export default QuestionBlock;