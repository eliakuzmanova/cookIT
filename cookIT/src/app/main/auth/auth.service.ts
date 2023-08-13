import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivateFn, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';
import { AuthenticateComponent } from './authenticate/authenticate.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  user: IUser | undefined;
  url: string = "http://localhost:5750/"

  constructor(private http: HttpClient, private router: Router, private authenticateComponent: AuthenticateComponent) {
    this.isLoggedIn = !!this.user || !this.getUserInfo()
  }

  getLoggedInUser(): any {
    try {

      if (this.user && this.getUserInfo()) {
        return this.user;
      }

    } catch (err: any) {
      throw new Error(err)
    }
  }

  onLogin(email: string, password: string) {
    try {
      this.http.post<IUser>(`${this.url}login`, { email, password })
        .subscribe({
          next: (value) => {

            this.user = value
            this.isLoggedIn = true

            if (!this.user.image) {
              this.user.image = "uploads/user-pic.png"
            }

            this.setLocalStorageState("auth", this.user)
          },
          error: (err) => {  throw new Error(err) ;},
          complete: () => {
            this.authenticateComponent.isAuthenticated$$.next(this.user)
            this.router.navigate(["/"])
          }
        });
    } catch (err: any) {
      throw new Error(err)
    }
  }

  onRegister(username: string, email: string, password: string) {
    try {
      this.http.post(`${this.url}register`, { username, email, password }).subscribe({
        next: (v) => console.log('HTTP response', v),
        error: (err) => { throw new Error(err) },
        complete: () => this.onLogin(email, password)
      });
    } catch (err: any) {
      throw new Error(err)
    }

  }

  onLogout() {
    try {
      this.isLoggedIn = false
      this.user = undefined
      this.authenticateComponent.isAuthenticated$$.next(this.user)
      this.setLocalStorageState("auth", {})
      this.router.navigate(["/login"])
    } catch (err: any) {
      throw new Error(err)
    }
  }

  getUserInfo() {
    try {
      const persistedStateSerialized = localStorage.getItem("auth");

      if (persistedStateSerialized && Object.keys(persistedStateSerialized).length > 0 && persistedStateSerialized != "{}") {
        const persistedState = JSON.parse(persistedStateSerialized!);
        this.authenticateComponent.isAuthenticated$$.next(persistedState)
        return persistedState;
      }
      this.authenticateComponent.isAuthenticated$$.next(undefined)
      return undefined;
    } catch (err: any) {
      throw new Error(err)
    }
  }

  setLocalStorageState(key: string, value: string | {}) {
    try {

      localStorage.setItem(key, JSON.stringify(value));
    } catch (err: any) {
      throw new Error(err)
    }

  };

}

export function authenticationGuard(): CanActivateFn {
  try {
    return () => {
      const authService: AuthService = inject(AuthService);
      const user = authService.getUserInfo()
      if (user) {
        return true;
      }
      const router: Router = inject(Router);
      router.navigate(['/login']);
      return false;
    };
  } catch (err: any) {
    throw new Error(err)
  }
}

export function isGuest(): CanActivateFn {
  try {
    return () => {
      const authService: AuthService = inject(AuthService);
      const user = authService.getUserInfo()
      if (user) {
        const router: Router = inject(Router);
        router.navigate(['/']);
        return false;
      }
      return true;
    };
  } catch (err: any) {
    throw new Error(err)
  }
}

