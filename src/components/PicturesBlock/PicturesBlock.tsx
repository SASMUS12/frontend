import React, { useEffect, useState } from "react";
import styles from "./PicturesBlock.module.scss";
import step1 from '../../images/step1.png';
import step21 from '../../images/step21.png';
import step22 from '../../images/step22.png';
import step23 from '../../images/step23.png';
import step3 from '../../images/step3.png';
import step4 from '../../images/step4.png';
import step5 from '../../images/step5.png';
import line1 from '../../images/line1.svg';

const PicturesBlock= () => {
  const [pic, setPic] = useState(1);

  return (
    <div className={styles.picturesBlock}>
      {pic === 1 && 
        <>
          <p>
            Учи и практикуй иностранный язык <span>с носителями из более чем 50 стран</span>
          </p>
          <img src={step1} alt="Картинки с довольными людьми" className={styles.picturesBlock__img}/>
        </>
      }
      {pic === 2 && <>
        <p>
          Находи новых друзей и единомышленников <span>с помощью гибкого поиска собеседника</span>
        </p>
        <img src={step21} alt="Картинки с довольными людьми" />
        <img src={step22} alt="Картинки с довольными людьми" />
        <img src={step23} alt="Картинки с довольными людьми" />
      </>}
      {pic === 3 && 
        <>
          <p>
            Организуй и вступай в<span> групповые чаты </span>и оттачивай языковые навыки
          </p>
          <img src={step3} alt="Картинки с довольными людьми" className={styles.picturesBlock__img} />
        </>
      }
      {pic === 4 && 
        <>
          <p>
            <span>Делись новостями </span>и следи за обновлениями друзей
          </p>
          <img src={step4} alt="Картинки с довольными людьми" className={styles.picturesBlock__img} />
        </>
      }
      {pic === 5 && 
        <>
          <p>
            Изучай язык <span>в любое время</span> и <span>в удобном месте</span>
          </p>
          <img src={step5} alt="Картинки с довольными людьми" className={styles.picturesBlock__img} />
        </>
      }
      <div className={styles.picturesBlock__container}>
      <img 
        src={line1} 
        alt="Линия" 
        className={pic === 1 ? styles.picturesBlock__picActive : styles.picturesBlock__item} 
        onClick={() => {setPic(1)}}/>
      <img 
        src={line1} 
        alt="Линия" 
        className={pic === 2 ? styles.picturesBlock__picActive : styles.picturesBlock__item} 
        onClick={() => {setPic(2)}}/>
      <img 
        src={line1} 
        alt="Линия" 
        className={pic === 3 ? styles.picturesBlock__picActive : styles.picturesBlock__item} 
        onClick={() => {setPic(3)}}/>
      <img 
        src={line1} 
        alt="Линия" 
        className={pic === 4 ? styles.picturesBlock__picActive : styles.picturesBlock__item} 
        onClick={() => {setPic(4)}}/>
      <img 
        src={line1} 
        alt="Линия" 
        className={pic === 5 ? styles.picturesBlock__picActive : styles.picturesBlock__item} 
        onClick={() => {setPic(5)}}/>
      </div>
    </div>
  );
};

export default PicturesBlock;
