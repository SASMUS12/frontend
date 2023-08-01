import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";
import UserCard from './UserCard/UserCard';
import styles from "./UserProfile.module.scss";


const UserProfile = () => {
  return(
    <div className={styles.profile}>
      <UserCard />
    </div>
  );
};

export default UserProfile;