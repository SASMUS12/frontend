// src/components/DetailedSettings.tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import userModel from '../../models/UserModel';
import styles from './DetailedSettings.module.scss'; // импорт стилей из SCSS модуля

const DetailedSettings: React.FC = observer(() => {
  // Если подробные настройки не отображаются, вернуть пустое значение (ничего не отображать)
  if (!userModel.detailedSettingsVisible) {
    return null;
  }

  return (
    <div className={styles.detailedSettings}>
      {/* Здесь добавьте дополнительные настройки для фильтрации и сортировки пользователей */}
    </div>
  );
});

export default DetailedSettings;
