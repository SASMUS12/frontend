// src/models/UserModel.ts
import { makeAutoObservable } from 'mobx';

class UserModel {
  users: string[] = [];
  filter = 'Всё';
  detailedSettingsVisible = false;

  constructor() {
    makeAutoObservable(this);
  }

  setFilter(filter: string) {
    this.filter = filter;
  }

  toggleDetailedSettings() {
    this.detailedSettingsVisible = !this.detailedSettingsVisible;
  }
}

const userModel = new UserModel();
export default userModel;
