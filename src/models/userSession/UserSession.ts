import { action, computed, makeObservable, observable } from "mobx";
import { User } from "./User";

import {UserRepr} from "../../utils/openapi";

class UserSession {
  private _user: User | null = null;

  constructor() {
    makeObservable<UserSession, "_user">(this, {
      _user: observable,
      user: computed,
      isAuthenticated: computed,
      update: action,
      signOut: action,
    });
  }

  get user() {
    return this._user;
  }

  get isAuthenticated(): boolean {
    return this._user !== null;
  }

  update(data: UserRepr) {
    this._user = new User(data);
  }

  signOut() {
    this._user = null;
  }
}

export const userSession = new UserSession();
