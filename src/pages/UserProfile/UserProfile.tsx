import { useState, useEffect } from 'react';
// import { observer } from "mobx-react-lite";
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
import styles from "./UserProfile.module.scss";

interface UserData {
  first_name: string;
  age: string;
  gender: string;
  country: {
    code: string;
  };
  avatar: null | string;
  interests: string[];
  languages: Language[];
  about: string;
  username: string;
}

interface Language {
  isocode: string;
  skill_level: string;
}

interface EditedData {
  first_name: string;
  username: string;
  avatar: null | File;
  country: string;
  birth_date: string;
  languages: Language[];
  gender: string;
  goals: any[];
  interests: string[];
  about: string;
}


const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<EditedData>({
    first_name: '',
    avatar: null,
    country: '',
    birth_date: '',
    languages: [],
    gender: '',
    goals: [],
    interests: [],
    about: '',
    username: '',
  });
  const model = useModel();
  const [imageBase64, setImageBase64] = useState(null);

  const handleFileInputChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // eslint-disable-next-line no-undef
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as null ;
        if (base64Data) {
        setImageBase64(base64Data);
        setEditedData((prevData) => ({ ...prevData, avatar: base64Data }));
      }};
      reader.readAsDataURL(file);
    }
  };

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
    if (userData) {
      setEditedData({
        ...userData,
        first_name: editedData.username,
        avatar: userData.avatar,
        country: editedData.country,
        birth_date: userData.age,
        languages:[
          {
            isocode: "En",
            skill_level: "Newbie"
          }
        ],
        gender: editedData.gender,
        goals:[],
        interests: editedData.interests,
        about: editedData.about,
      });
      setIsEditing(!isEditing);
    }
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
      if (response.data !== null){
        setUserData(response.data);
      }
      setIsEditing(false);
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Ошибка при сохранении данных:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('editedData', editedData)

  return(
    <>
      <Header />
      {isEditing ? (
      <div className={styles.profile}>
        <div className={styles.profile__card}>
        <UserCard
          isEditing={isEditing}
          name={editedData.username}
          age={editedData.birth_date}
          gender={editedData.gender || ''}
          location={editedData.country}
          avatar={userData?.avatar || ''}
          handleFileInputChange={handleFileInputChange}
          setName={(value) => setEditedData((prevData) => ( { ...prevData, username: value }))}
          setAge={(value) => setEditedData((prevData) => ({ ...prevData, birth_date: value }))}
          setGender={(value) => setEditedData((prevData) => ({ ...prevData, gender: value }))}
          setLocation={(value) => setEditedData((prevData) => ({ ...prevData, country: value }))}
      />  
          <div className={styles.profile__buttons}>
            <IconButton icon={settings} handleFunction={handleEditProfile} iconWidth={30} iconHeight={30}/>
          </div>
          <div className={styles.profile__moreAbout}>
          <div>
            <UserLanguages isEditing={isEditing} userLanguages={[]}/>
            <Topics 
              isEditing={isEditing} 
              interests={userData?.interests || []}
              setEditedData={(value: string[]) => setEditedData((prevData) => ({ ...prevData, interests: value }))}
            />
            <Certificates />
          </div>
          <div>
            <About 
              isEditing={isEditing}
              about={editedData.about}
              setAboutMe={(value: string) => setEditedData((prevData) => ({ ...prevData, about: value }))}
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
          name={userData?.first_name || userData?.username || ''}
          age={userData?.age || ''}
          gender={userData?.gender || ''}
          location={userData?.country || ''}
          avatar={userData?.avatar || ''}
          handleFileInputChange={handleFileInputChange}
          setName={(value) => setEditedData((prevData) => ({ ...prevData, first_name: value }))}
          setAge={(value) => setEditedData((prevData) => ({ ...prevData, age: value }))}
          setGender={(value) => setEditedData((prevData) => ({ ...prevData, gender: value }))}
          setLocation={(value) => setEditedData((prevData) => ({ ...prevData, country: value }))}
      />   
          <div className={styles.profile__buttons}>
            <IconButton icon={edit} handleFunction={handleEditProfile} iconWidth={20} iconHeight={20}/>
            <IconButton icon={settings} handleFunction={handleEditProfile} iconWidth={30} iconHeight={30}/>
          </div>
          <div className={styles.profile__moreAbout}>
          <div>
            <UserLanguages 
              isEditing={isEditing} 
              userLanguages={userData?.languages}
            />
            <Topics 
              isEditing={isEditing} 
              interests={userData?.interests || []}
              setEditedData={(value: string[]) => setEditedData((prevData) => ({ ...prevData, interests: value }))}
            />
            <Certificates />
          </div>
          <div>
            <About 
              isEditing={isEditing}
              about={userData?.about || ''}
              setAboutMe={(value: string) => setEditedData((prevData) => ({ ...prevData, about: value }))}
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