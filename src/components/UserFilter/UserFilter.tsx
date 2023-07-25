// src/components/UserFilter.tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import userModel from '../../models/UserModel';
import styles from './UserFilter.module.scss';

const UserFilter: React.FC = observer(() => {
  // Обработчик изменения выбранного фильтра
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    userModel.setFilter(event.target.value);
  };

  // Обработчик нажатия на кнопку "Настройки"
  const handleDetailedSettingsToggle = () => {
    userModel.toggleDetailedSettings();
  };

  return (
    <div className={styles.userFilter}>
      <div>
        <select value={userModel.filter} onChange={handleFilterChange}>
          <option value="Всё">Всё</option>
          <option value="Сейчас онлайн">Сейчас онлайн</option>
          <option value="Новые пользователи">Новые пользователи</option>
        </select>
      </div>
      <div>
        <button onClick={handleDetailedSettingsToggle}>Настройки</button>
      </div>
    </div>
  );
});

export default UserFilter;
