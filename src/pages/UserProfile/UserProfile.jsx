import { useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { useModel } from "../../components/SignupSigninForm/model";
import { api } from '../../utils/constants';
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";
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
import styles from "./UserProfile.module.scss";


const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: '',
    avatar: './images/userProfile/edit.png',
    country: '',
    birth_date: null,
    languages: [],
    gender: '',
    goals: [],
    interests: [],
    about: '',
  });
  const model = useModel();
  const [imageBase64, setImageBase64] = useState('');

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]; // Получаем выбранный файл
    if (file) {
      // eslint-disable-next-line no-undef
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result; // Получаем Data URL (Base64)
        setImageBase64(base64Data);
      };
      reader.readAsDataURL(file); // Читаем файл как Data URL
    }
  };



  console.log(imageBase64);

    const fetchUserData = async () => {
      try {
        // eslint-disable-next-line no-undef
        const token = localStorage.getItem('accessToken');
        if (!token) {
          // eslint-disable-next-line no-undef
          console.error('Токен не найден');
          setIsLoading(false);
          return;
        }
        const response = await api.api.usersMeRetrieve({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // eslint-disable-next-line no-undef
        console.log('Успех', response.data);
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error('Ошибка при получении данных пользователя:', error);
        setIsLoading(false);
      }
    };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    console.log(`userPage: ${model.user}`);
  }, []);

  const handleEditProfile = () => {
    setEditedData({
      first_name: userData.username,
      avatar: imageBase64,
      country: editedData.country,
      birth_date: editedData.age,
      languages:[
        {
          isocode: "En",
          language: "English",
          skill_level: "Newbie"
        }
      ],
      gender: editedData.gender,
      goals:[],
      interests: editedData.interests,
      about: editedData.about,
    });
    // eslint-disable-next-line no-undef
    setIsEditing(!isEditing);
  };

  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    try {
      // eslint-disable-next-line no-undef
      const token = localStorage.getItem('accessToken');
      if (!token) {
        // eslint-disable-next-line no-undef
        console.error('Токен не найден');
        return;
      }

      const updatedUserData = { ...userData, ...editedData };
      const response = await api.api.usersMePartialUpdate(updatedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // eslint-disable-next-line no-undef
      console.log('Успешно обновленные данные:', response.data);

      setUserData(response.data);
      setIsEditing(false);
      // eslint-disable-next-line no-undef
      console.log('updatedUserData', updatedUserData);
      // eslint-disable-next-line no-undef
      console.log('userData', userData);
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Ошибка при сохранении данных:', error);
    }
  };
  // eslint-disable-next-line no-undef
  console.log('userData', userData);
  // eslint-disable-next-line no-undef
  console.log('editedData.interests', editedData.interests);
    // eslint-disable-next-line no-undef
    console.log('editedData', editedData);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return(
    <>
      <Header />
      {isEditing ? (
      <div className={styles.profile}>
        <div className={styles.profile__card}>
        <UserCard
          isEditing={isEditing}
          editedData={editedData}
          name={editedData.first_name}
          age={editedData.age}
          gender={editedData.gender}
          location={editedData.country}
          avatar={editedData.avatar}
          setImageBase64={setImageBase64} 
          handleFileInputChange={handleFileInputChange}
          setName={(value) => setEditedData((prevData) => ( { ...prevData, first_name: value }))}
          setAge={(value) => setEditedData((prevData) => ({ ...prevData, birth_date: value }))}
          setGender={(value) => setEditedData((prevData) => ({ ...prevData, gender: value }))}
          setLocation={(value) => setEditedData((prevData) => ({ ...prevData, country: value }))}
      />  
          <div className={styles.profile__buttons}>
            <IconButton icon={settings} />
          </div>
          <div className={styles.profile__moreAbout}>
          <div>
            <UserLanguages isEditing={isEditing}/>
            <Topics 
              isEditing={isEditing} 
              interests={userData.interests}
              setEditedData={(value) => setEditedData((prevData) => ({ ...prevData, interests: value }))}
            />
            <Certificates />
          </div>
          <div>
            <About 
              isEditing={isEditing}
              aboutMe={editedData.about}
              learningLanguage={editedData.learningLanguage}
              setAboutMe={(value) => setEditedData((prevData) => ({ ...prevData, about: value }))}
              setLearningLanguage={(value) => setEditedData((prevData) => ({ ...prevData, learningLanguage: value }))}
            />
          </div>
          </div>
          <div className={styles.profile__buttonsDown}>
            <button 
              className={styles.profile__buttons_first}
              onClick={handleSaveChanges}
            >Сохранить изменения</button>
            <button 
              className={styles.profile__buttons_second} 
              onClick={handleCancelEdit}
            >Отмена</button>
          </div>
        </div>
      </div>
      ) 
      : 
      (
      <div className={styles.profile}>
        <div className={styles.profile__card}>
        <UserCard
          isEditing={isEditing}
          name={userData.username}
          age={userData.age}
          gender={userData.gender}
          location={userData.country}
          avatar={editedData.avatar}
          setImageBase64={setImageBase64} 
          setName={(value) => setEditedData((prevData) => ({ ...prevData, first_name: value }))}
          setAge={(value) => setEditedData((prevData) => ({ ...prevData, age: value }))}
          setGender={(value) => setEditedData((prevData) => ({ ...prevData, gender: value }))}
          setLocation={(value) => setEditedData((prevData) => ({ ...prevData, country: value }))}
      />   
          <div className={styles.profile__buttons}>
            <IconButton icon={edit} handleFunction={handleEditProfile}/>
            <IconButton icon={settings} />
          </div>
          <div className={styles.profile__moreAbout}>
          <div>
            <UserLanguages 
              isEditing={isEditing} 
              languages={userData.languages}
            />
            <Topics 
              isEditing={isEditing} 
              interests={userData.interests}
              setEditedData={setEditedData}
            />
            <Certificates isEditing={isEditing}/>
          </div>
          <div>
            <About 
              isEditing={isEditing}
              aboutMe={userData.about}
              learningLanguage={userData.learningLanguage}
              setAboutMe={(value) => setEditedData((prevData) => ({ ...prevData, about: value }))}
              setLearningLanguage={(value) => setEditedData((prevData) => ({ ...prevData, learningLanguage: value }))}
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

export default UserProfile;