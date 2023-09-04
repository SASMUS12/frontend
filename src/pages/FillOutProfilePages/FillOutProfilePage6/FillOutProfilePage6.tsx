import { observer } from 'mobx-react-lite';

import Header from '../../../components/Header/Header';
import ProgressLine from '../../../components/UI/ProgressLine/ProgressLine';
import { Button } from '../../../components/UI/Button/Button';
import { Textarea } from '../../../components/UI/Textarea/Textarea';

import { useModel } from './model';

import styles from '../FillOutProfilePages.module.scss';
import { useEffect } from 'react';

const FillOutProfilePage6 = () => {
  const model = useModel();

  useEffect(() => {
    model.handleCurrentUser();
  }, []);

  useEffect(() => {
    model.handleSubmitButtonDisabled();
  }, [model.about]);

  return (
    <>
      <Header />
      <main className={styles.content}>
        <button
          className={styles.content__returnButton}
          onClick={model.handleReturnButtonClick}
        >
          Назад
        </button>
        <div className={styles.container}>
          <ProgressLine pageNumber={6} />
          <h1 className={styles.container__title}>Расскажите о себе</h1>
          <form className={styles.form} onSubmit={model.handleSubmit}>
            <Textarea
              className={styles.form__textarea}
              name='about'
              value={model.about}
              placeholder='Напишите несколько предложений о себе, чтобы вас могли найти партнеры со схожими интересами или стилем жизни'
              required
              onValue={model.handleValue}
              maxLength={1000}
            >
              {model.about}
            </Textarea>
            <Button
              className={styles.form__button}
              type='submit'
              variant='primary'
              disabled={false}
            >
              Готово
            </Button>
          </form>
        </div>
      </main>
    </>
  );
};

export default observer(FillOutProfilePage6);
