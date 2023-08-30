import { useState, useEffect } from "react";
import { api } from "../../utils/constants";
import {
  UserLanguage,
  SkillLevelEnum,
  GenderEnum,
  NullEnum,
} from "../../utils/openapi";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import UserCard from "./UserCard/UserCard";
import IconButton from "./Buttons/IconButton/IconButton";
import UserLanguages from "./UserLanguages/UserLanguages";
import Topics from "./Topics/Topics";
import About from "./About/About";
import Reviews from "./Reviews/Reviews";
import Certificates from "./Certificates/Certificates";
import settings from "../../images/userProfile/settings.png";
import edit from "../../images/userProfile/edit.png";
import styles from "./UserProfile.module.scss";

interface UserData {
  username: string;
  first_name?: string;
  avatar?: string | null;
  age: string;
  slug: string | null;
  country?: string | null;
  languages?: UserLanguage[];
  gender?: GenderEnum | NullEnum | null;
  goals?: string[];
  interests?: string[];
  about?: string;
  last_activity: string | null;
  is_online: boolean;
  gender_is_hidden: boolean;
  age_is_hidden: boolean;
  role: string;
  is_blocked: boolean;
  birth_date?: string | null;
}

interface Language {
  isocode: string;
  skill_level: SkillLevelEnum;
}

interface EditedData {
  first_name: string;
  username: string;
  avatar?: File | null;
  country: string | null;
  birth_date: string;
  languages: Language[];
  gender?: GenderEnum | NullEnum | null;
  goals: string[];
  interests: string[];
  about: string;
  age: string;
}

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<EditedData>({
    first_name: "",
    avatar: "",
    country: "",
    birth_date: "",
    languages: [],
    gender: null,
    goals: [],
    interests: [],
    about: "",
    username: "",
    age: "",
  });
  const [imageBase64, setImageBase64] = useState(null);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as null;
        if (base64Data) {
          setImageBase64(base64Data);
          setEditedData((prevData) => ({ ...prevData, avatar: base64Data }));
        }
      };
      reader.readAsDataURL(file);
    }
    console.log("imageBase64", imageBase64);
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Токен не найден");
        setIsLoading(false);
        return;
      }
      const response = await api.api.usersMeRetrieve({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Успех", response.data);
      setUserData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    if (userData) {
      setEditedData({
        ...userData,
        first_name: editedData.username,
        avatar: editedData.avatar,
        country: editedData.country,
        birth_date: userData.age,
        languages: [
          {
            isocode: "En",
            skill_level: SkillLevelEnum.Newbie,
          },
        ],
        gender: editedData.gender,
        goals: [],
        interests: editedData.interests,
        about: editedData.about,
        age: userData.age,
        username: editedData.username,
      });
      setIsEditing(!isEditing);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Токен не найден");
        return;
      }

      const updatedUserData: EditedData = {
        ...userData,
        ...editedData,
        avatar: editedData.avatar ?? null,
      };

      const response = await api.api.usersMePartialUpdate(updatedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Успешно обновленные данные:", response.data);
      if (response.data !== null) {
        setUserData(response.data);
      }
      setIsEditing(false);
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error("Ошибка при сохранении данных:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("editedData", editedData);

  return (
    <>
      <Header />
      {isEditing ? (
        <div className={styles.profile}>
          <div className={styles.profile__card}>
            <UserCard
              isEditing={isEditing}
              name={editedData.username}
              age={editedData.birth_date}
              gender={
                userData?.gender || GenderEnum.Male || GenderEnum.Female || null
              }
              location={
                typeof editedData.country === "string"
                  ? editedData.country
                  : userData?.country?.code || ""
              }
              avatar={userData?.avatar || ""}
              handleFileInputChange={handleFileInputChange}
              setName={(value) =>
                setEditedData((prevData) => ({ ...prevData, username: value }))
              }
              setAge={(value) =>
                setEditedData((prevData) => ({
                  ...prevData,
                  birth_date: value,
                }))
              }
              setGender={(value) =>
                setEditedData((prevData) => ({ ...prevData, gender: value }))
              }
              setLocation={(value) =>
                setEditedData((prevData) => ({ ...prevData, country: value }))
              }
            />
            <div className={styles.profile__buttons}>
              <IconButton
                icon={settings}
                handleFunction={handleEditProfile}
                iconWidth={30}
                iconHeight={30}
              />
            </div>
            <div className={styles.profile__moreAbout}>
              <div>
                <UserLanguages isEditing={isEditing} userLanguages={[]} />
                <Topics
                  isEditing={isEditing}
                  interests={userData?.interests || []}
                  setEditedData={(value: string[]) =>
                    setEditedData((prevData) => ({
                      ...prevData,
                      interests: value,
                    }))
                  }
                />
                <Certificates />
              </div>
              <div>
                <About
                  isEditing={isEditing}
                  about={editedData.about}
                  setAboutMe={(value: string) =>
                    setEditedData((prevData) => ({ ...prevData, about: value }))
                  }
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
              name={userData?.first_name || userData?.username || ""}
              age={userData?.age || ""}
              gender={
                userData?.gender || GenderEnum.Male || GenderEnum.Female || null
              }
              location={userData?.country?.code || "" || null}
              avatar={userData?.avatar || ""}
              handleFileInputChange={handleFileInputChange}
              setName={(value) =>
                setEditedData((prevData) => ({
                  ...prevData,
                  first_name: value,
                }))
              }
              setAge={(value) =>
                setEditedData((prevData) => ({ ...prevData, age: value }))
              }
              setGender={(value) =>
                setEditedData((prevData) => ({ ...prevData, gender: value }))
              }
              setLocation={(value) =>
                setEditedData((prevData) => ({ ...prevData, country: value }))
              }
            />
            <div className={styles.profile__buttons}>
              <IconButton
                icon={edit}
                handleFunction={handleEditProfile}
                iconWidth={20}
                iconHeight={20}
              />
              <IconButton
                icon={settings}
                handleFunction={handleEditProfile}
                iconWidth={30}
                iconHeight={30}
              />
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
                  setEditedData={(value: string[]) =>
                    setEditedData((prevData) => ({
                      ...prevData,
                      interests: value,
                    }))
                  }
                />
                <Certificates />
              </div>
              <div>
                <About
                  isEditing={isEditing}
                  about={userData?.about || ""}
                  setAboutMe={(value: string) =>
                    setEditedData((prevData) => ({ ...prevData, about: value }))
                  }
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
