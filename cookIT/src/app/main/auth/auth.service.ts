import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  // isLoggedIn: boolean = false;
  // user: any | undefined;
  url: string = "http://localhost:5750/"
  constructor(private http: HttpClient, private router: Router) {
    // this.isLoggedIn = !!this.user || !this.useLocalStorage("auth")
  }

  // onIsLoggedIn(): boolean {
  //   if (!this.user || !this.useLocalStorage("auth")) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // onLogin(formData: FormData) {
  //   this.http.post(`${this.url}login`, formData)
  //     .subscribe({
  //       next: (value) => {
  //         this.user = value
  //         this.setLocalStorageState("auth", this.user.token)
  //       },
  //       error: (err) => console.log('HTTP Error', err),
  //       complete: () => console.info('complete')
  //     });

  // }

  onRegister(username: string, email: string, password: string) {
     this.http.post(`${this.url}register`, {username, email, password}).subscribe({
      next: (v) => console.log('HTTP response', v),
      error: (err) => console.log('HTTP Error', err),
      complete: () => console.info('complete') 

    });
  }

  // onLogout() {
  //   this.setLocalStorageState("auth", {})
  //   this.router.navigate(["/login"])
  // }

  // useLocalStorage(key: string) {
  //   const persistedStateSerialized = localStorage.getItem(key);

  //   if (persistedStateSerialized) {
  //     const persistedState = JSON.parse(persistedStateSerialized);
  //     return persistedState;
  //   }

  //   return undefined;
  // }

  // setLocalStorageState(key: string, value: string | {}) {

  //   localStorage.setItem(key, JSON.stringify(value));

  // };


}
