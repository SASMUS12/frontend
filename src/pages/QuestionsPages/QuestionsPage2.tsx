import Header from '../../components/Header/Header';
import ProgressLine from '../../components/UI/ProgressLine/ProgressLine';
import QuestionArea from '../../components/UI/QuestionArea/QuestionArea';
import { Input } from '../../components/UI/Input/Input';
import { Select } from '../../components/UI/Select/Select';

import styles from './QuestionsPages.module.scss';
import cn from 'classnames';

import { useModel } from './model';
import { api } from '../../utils/constants';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/UI/Button/Button';
import { Language } from '../../utils/openapi';

const QuestionsPage2 = () => {
  const model = useModel();

  const [languagesData, setLanguagesData] = useState<Language[]>([]);
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);

  const fetchLanguagesData = async () => {
    try {
      console.log('отправка запроса ---');
      const response = await api.api.languagesList();
      console.log('ответ получен -', response);
      const languages = response.data;
      setLanguagesData(languages);
    } catch (error) {
      console.error('Ошибка при получении данных о языках:', error);
    }
  };

  useEffect(() => {
    fetchLanguagesData();
  }, []);

  const handleOpenLanguageMenu = () => {
    setLanguageMenuOpen(true);
  };

  return (
    <>
      <Header />
      <main className={styles.content}>
        <div className={styles.container}>
          <ProgressLine pageNumber={2} />
          <h1 className={styles.container__title}>
            Укажите страну или город и родной язык
          </h1>
          <QuestionArea>
            <Input
              className={styles.container__questionArea_input}
              type='search'
              name='country'
              value={model.country}
              label='Страна или город, в которых вы сейчас живете'
              labelStyles='label18'
              isLabelHintHidden={true}
              placeholder='Начните вводить название'
              required
              maxLength={12}
              onValue={model.handleValue}
            />
          </QuestionArea>
          <QuestionArea>
            <Select
              className={styles.container__questionArea_input}
              name='language'
              label='Ваш родной язык, язык на котором вы свободно говорите'
              labelStyles='label18'
              isLabelHintHidden={true}
              placeholder='Напишите или выберете'
              required
            >
              <option value=''></option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              {languagesData &&
                languagesData.map((language: Language) => (
                  <option value={language.name}>{language.name}</option>
                ))}
            </Select>
            <Button
              onClick={handleOpenLanguageMenu}
              className={styles.popup__addButton}
            >
              {'добавить язык'}
            </Button>
          </QuestionArea>
        </div>
      </main>
    </>
  );
};

export default QuestionsPage2;
