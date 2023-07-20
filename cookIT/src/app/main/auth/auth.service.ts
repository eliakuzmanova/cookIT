import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
 
  isLoggedIn: boolean = false;
  user: IUser | undefined;
  url: string = "http://localhost:5750/"
  
  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn = !!this.user || !this.useLocalStorage()
  }

  getLoggedInUser(): any {
    if (this.user && this.useLocalStorage()) {
      return this.user;
    }
  }

  onLogin(email: string, password: string) {
    this.http.post<IUser>(`${this.url}login`, {email,password})
      .subscribe({
        next: (value) => {
          this.user = value
          this.isLoggedIn = true
          if(!this.user.image) {
            this.user.image = "uploads/user-pic.png"
          }
          this.setLocalStorageState("auth", this.user)

        },
        error: (err) => console.log('HTTP Error', err),
        complete: () => console.info('complete')
      });
      
  }

  onRegister(username: string, email: string, password: string) {
     this.http.post(`${this.url}register`, {username, email, password}).subscribe({
      next: (v) => console.log('HTTP response', v),
      error: (err) => console.log('HTTP Error', err),
      complete: () => console.info('complete') 

    });
  }

  onLogout() {
    this.isLoggedIn = false
    this.setLocalStorageState("auth", {})
    this.router.navigate(["/login"])
  }

  useLocalStorage() {
    const persistedStateSerialized = localStorage.getItem("auth");

    if (persistedStateSerialized) {
      const persistedState = JSON.parse(persistedStateSerialized);
  
      return persistedState;
    }

    return undefined;
  }

  setLocalStorageState(key: string, value: string | {}) {

    localStorage.setItem(key, JSON.stringify(value));

  };


}
