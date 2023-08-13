import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IUser } from 'src/app/interfaces';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticateComponent } from '../authenticate/authenticate.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild("form") form!: NgForm;

  errors: any = [];
  isLoggedIn: boolean = false;
  user: IUser | undefined;


  constructor(private authService: AuthService, private http: HttpClient, private router: Router, private authenticateComponent: AuthenticateComponent) {
    this.isLoggedIn = !!this.user || !this.authService.getUserInfo()
  }

  onSubmit(form: NgForm): void | any {

    try {
      if (form.invalid) { return; }

      this.http.post<IUser>('http://localhost:5750/login', { email: form.value.email, password: form.value.password })
        .subscribe({
          next: (value) => {

            this.user = value
            this.isLoggedIn = true

            if (!this.user.image) {
              this.user.image = "uploads/user-pic.png"
            }

            this.authService.setLocalStorageState("auth", this.user)
          },
          error: (err) => {
         
           this.errors = this.errors.splice(0, this.errors.length)
           this.errors.push("Invalid email or password")
            return
          },
          complete: () => {
            this.authenticateComponent.isAuthenticated$$.next(this.user)
            this.router.navigate(["/"])
           
          }
        });



    } catch (err: any) {
      this.errors.push(err)
      return err
    }

  }
}
