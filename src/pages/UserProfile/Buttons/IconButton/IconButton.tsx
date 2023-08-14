import React from "react";
import IconButtonProps from '../../../../types/userProfile/types';
import styles from "./IconButton.module.scss";


const IconButton: React.FC<IconButtonProps> = ({ icon, handleFunction, iconWidth, iconHeight }) => {
  return (
    <>
      <button className={styles.profile__button} onClick={handleFunction}>
        <img 
          className={styles.profile__icon} 
          src={icon} alt="кликабельная иконка" 
          style={{ width: iconWidth, height: iconHeight }}/>
      </button>
    </>
  )
}

export default IconButton;