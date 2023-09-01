import { useState } from "react";
// import SearchButton from "../../../components/UI/SearchButton/SearchButton";
import MenuButton from "../Buttons/MenuButton/MenuButton";
import styles from "./ChatsMenu.module.scss";

const ChatsMenu = () => {
  const [activeFilter, setActiveFilter] = useState("Chats");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSearchClick = () => {
    // TO DO: Handle search
  };

  return (
    <div className={styles.menu}>
      <div className={styles.menu__filters}>
        <MenuButton
          onClick={() => handleFilterClick("Chats")}
          isActive={activeFilter === "Chats"}
          title="Чаты"
        />
        <MenuButton
          onClick={() => handleFilterClick("Groups")}
          isActive={activeFilter === "Groups"}
          title="Группы"
        />
      </div>
      {/*<SearchButton onClick={handleSearchClick} />*/}
    </div>
  );
};

export default ChatsMenu;
