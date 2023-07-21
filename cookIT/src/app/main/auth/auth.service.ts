import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';
import { AuthenticateComponent } from './authenticate/authenticate.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService{
 
  isLoggedIn: boolean = false;
  user: IUser | undefined;
  url: string = "http://localhost:5750/"
  
  constructor(private http: HttpClient, private router: Router, private authenticateComponent: AuthenticateComponent) {
    this.isLoggedIn = !!this.user || !this.getUserInfo()
  }

  getLoggedInUser(): any {
    if (this.user && this.getUserInfo()) {
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
        complete: () => {
          this.authenticateComponent.isAuthenticated$$.next(this.user)
          this.router.navigate(["/"])}
      });
    
  }

  onRegister(username: string, email: string, password: string) {
     this.http.post(`${this.url}register`, {username, email, password}).subscribe({
      next: (v) => console.log('HTTP response', v),
      error: (err) => {throw new Error(err)},
      complete: () => this.onLogin(email, password)
    });

  }

  onLogout() {
    this.isLoggedIn = false
    this.user = undefined
    this.authenticateComponent.isAuthenticated$$.next(this.user)
    this.setLocalStorageState("auth", {})
    this.router.navigate(["/login"])
  }

  getUserInfo() {
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
