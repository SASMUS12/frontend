// src/models/UserModel.ts
import { makeAutoObservable } from 'mobx';

class UserModel {
  users: string[] = []; // Здесь хранится список пользователей
  filter = 'Всё'; // По умолчанию фильтр "Всё"
  detailedSettingsVisible = false; // Состояние отображения подробных настроек

  constructor() {
    makeAutoObservable(this);
  }

  // Функция для установки выбранного фильтра
  setFilter(filter: string) {
    this.filter = filter;
  }

  // Функция для переключения отображения подробных настроек
  toggleDetailedSettings() {
    this.detailedSettingsVisible = !this.detailedSettingsVisible;
  }
}

const userModel = new UserModel();
export default userModel;
