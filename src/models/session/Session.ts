import { action, computed, makeObservable, observable } from "mobx";
import { User, UserInterface } from "./User";

class Session {
  private _user: User | null = null;
  private _accessToken: string | null = null;
  private _refreshToken: string | null = null;

  constructor() {
    makeObservable<Session, "_user" | "_accessToken" | "_refreshToken">(this, {
      _user: observable,
      _accessToken: observable,
      _refreshToken: observable,
      user: computed,
      isAuthenticated: computed,
      updateUser: action,
      setAccessToken: action,
      setRefreshToken: action,
      signOut: action,
    });
  }

  get user() {
    return this._user;
  }

  get isAuthenticated(): boolean {
    return this._user !== null;
  }

  updateUser(data: UserInterface) {
    this._user = new User(data);
  }

  setAccessToken(token: string) {
    this._accessToken = token;
  }

  setRefreshToken(token: string) {
    this._refreshToken = token;
  }

  signOut() {
    localStorage.clear();
    this._user = null;
    this._accessToken = null;
    this._refreshToken = null;
  }
}

export const session = new Session();
