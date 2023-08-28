import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import UserCard from './UserCard/UserCard';
import IconButton from './Buttons/IconButton/IconButton';
import UserLanguages from './UserLanguages/UserLanguages';
import Topics from './Topics/Topics';
import About from './About/About';
import Reviews from './Reviews/Reviews';
import Certificates from './Certificates/Certificates';
import settings from '../../images/userProfile/settings.png';
import edit from '../../images/userProfile/edit.png';
import array from '../../utils/constants';
import styles from './UserProfile.module.scss';
import { useModel } from '../../components/SignupSigninForm/model';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const model = useModel();

  useEffect(() => {
    console.log(`userPage: ${model.user}`);
  }, [model.user]);

  // UserCard
  const [name, setName] = useState('Светлана');
  const [age, setAge] = useState(33);
  const [gender, setGender] = useState('женщина');
  const [location, setLocation] = useState('Россия, Москва');

  // Topics
  const [themes, setThemes] = useState(array);
  const [inputValue, setInputValue] = useState('');

  // About
  const [aboutMe, setAboutMe] = useState(
    'Hi! I work as an interior designer and often meet with foreign customers, I want to improve my English to communicate fluently. I am looking for a person who could guide me and correct pronunciation mistakes.',
  );
  const [learningLanguage, setLearningLanguage] = useState(
    'improve conversational level',
  );

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    const userData = {
      name,
      age,
      gender,
      location,
      themes,
      aboutMe,
      learningLanguage,
    };
    const userDataString = JSON.stringify(userData);
    // eslint-disable-next-line no-undef
    localStorage.setItem('userData', userDataString);
    setIsEditing(false);
  };

  return (
    <>
      <Header />
      {isEditing ? (
        <div className={styles.profile}>
          <div className={styles.profile__card}>
            <UserCard
              isEditing={isEditing}
              name={name}
              age={age}
              gender={gender}
              location={location}
              setName={setName}
              setAge={setAge}
              setGender={setGender}
              setLocation={setLocation}
            />
            <div className={styles.profile__buttons}>
              <IconButton icon={settings} />
            </div>
            <div className={styles.profile__moreAbout}>
              <div>
                <UserLanguages isEditing={isEditing} />
                <Topics
                  isEditing={isEditing}
                  themes={themes}
                  setThemes={setThemes}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
                <Certificates />
              </div>
              <div>
                <About
                  isEditing={isEditing}
                  aboutMe={aboutMe}
                  setAboutMe={setAboutMe}
                  learningLanguage={learningLanguage}
                  setLearningLanguage={setLearningLanguage}
                />
              </div>
            </div>
            <div className={styles.profile__buttonsDown}>
              <button
                className={styles.profile__buttons_first}
                onClick={handleSaveChanges}
              >
                Сохранить изменения
              </button>
              <button
                className={styles.profile__buttons_second}
                onClick={handleCancelEdit}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.profile}>
          <div className={styles.profile__card}>
            <UserCard
              isEditing={isEditing}
              name={name}
              age={age}
              gender={gender}
              location={location}
              setName={setName}
              setAge={setAge}
              setGender={setGender}
              setLocation={setLocation}
            />
            <div className={styles.profile__buttons}>
              <IconButton icon={edit} handleFunction={handleEditProfile} />
              <IconButton icon={settings} />
            </div>
            <div className={styles.profile__moreAbout}>
              <div>
                <UserLanguages isEditing={isEditing} />
                <Topics
                  isEditing={isEditing}
                  themes={themes}
                  setThemes={setThemes}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
                <Certificates isEditing={isEditing} />
              </div>
              <div>
                <About
                  isEditing={isEditing}
                  aboutMe={aboutMe}
                  setAboutMe={setAboutMe}
                  learningLanguage={learningLanguage}
                  setLearningLanguage={setLearningLanguage}
                />
              </div>
            </div>
            <Reviews />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default observer(UserProfile);
