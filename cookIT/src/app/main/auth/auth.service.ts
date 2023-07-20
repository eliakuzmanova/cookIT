import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any | undefined;
  url: string = "http://localhost:5750/"
  constructor(private router: Router, private http:HttpClient) { }

  onLogin(formData: FormData) {   
     this.http.post(`${this.url}login`, formData)
     .subscribe({
      next: (value) => this.user = value,
      error: (err) => console.log('HTTP Error', err),
      complete: () => console.info('complete') 
     });

  }
  onRegister(formData: FormData) {
   return this.http.post(`${this.url}register`, formData)
  }

  onLogout() {
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
