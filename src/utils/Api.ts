import { bazeUrl } from './constants';

type TRegister = {
  username: string,
  password: string
}

type TLogin = {
  username: string,
  password: string
}

type TUpdateUser = {
  email: string,
  username: string,
  password: string,
  first_name: string,
  image: string,
  slug: string,
  country: string,
  city: string,
  birth_date: string,
  gender: string,
  phone_number: string
}

//may be useful later
/*
type TRequestToResetPassword = {
  email: string;
}

type TResetPassword = {
  password: string;
  token: string
}

type TUpdateUserData = {
  username: string, 
  password: string
}*/

export class Api {
  private _bazeUrl: string;

  constructor(baseUrl: string) {
    this._bazeUrl = baseUrl;
  }

  _handleResult(res: Response) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

//need to add url ending
/*  getAnnouncements() {
    return fetch(`${this._bazeUrl}/`, {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(this._handleResult)
  } 
  */

  signUp(data: TRegister) {
    return fetch(`${bazeUrl}auth/jwt/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
    .then(this._handleResult)
  }

  signIn(data: TLogin) {
    return fetch(`${bazeUrl}auth/jwt/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(this._handleResult)
  }

  getUserRequest() {
    return fetch(`${bazeUrl}/users/me/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('token')}`
      },
    })
    .then(this._handleResult)
  }

  updateUser(data: TUpdateUser) {
    return fetch(`${bazeUrl}/users/me/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })
    .then(this._handleResult)
  }

  verifyToken() {
    return fetch(`${bazeUrl}/auth/jwt/verify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"token": localStorage.getItem('token')})
    })
    .then(this._handleResult)
  }

  refreshToken() {
    return fetch(`${bazeUrl}/auth/jwt/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"refresh": localStorage.getItem('refreshToken')})
    })
    .then(this._handleResult)
  }

  /*requestToResetPassword(data: TRequestToResetPassword) {
    return fetch(`${bazeUrl}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': data.email 
      })
    })
    .then(this._handleResult)
  }

  resetPassword(data: TResetPassword) {
    return fetch(`${bazeUrl}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
      .then(this._handleResult)
  }

//no such route in plan, mut maybe it would be later
  signOut() {
    return fetch(`${bazeUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"token": localStorage.getItem('refreshToken')})
    })
    .then(this._handleResult)
  }*/ 
}
  
export const api = new Api(bazeUrl);