import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: IUser[] | null;

  constructor(private router: Router) { }

  login() {

  }
  register() {
  }

  logout() {
    this.setLocalStorageState("auth", {})
    this.router.navigate(["/login"])
  }

  useLocalStorage(key: string, initialValue: string | {}) {
    const persistedStateSerialized = localStorage.getItem(key);

    if (persistedStateSerialized) {
      const persistedState = JSON.parse(persistedStateSerialized);
      return persistedState;
    }

    return initialValue;
  }

  setLocalStorageState(key: string, value: string | {}) {

    localStorage.setItem(key, JSON.stringify(value));

  };


}
