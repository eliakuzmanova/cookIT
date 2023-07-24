import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild("form") form!: NgForm;
  errors: String[] | any[] = [];

  constructor(private authService: AuthService) {

  }

  onSubmit(form: NgForm): void {
  try{

    if (form.invalid) { return; }

    if (form.value.password != form.value["confirm-password"]) {
      this.errors.push("Passwords do not match")
    } else {
      this.errors = [];
    }


    this.authService.onRegister(
      form.value.username,
      form.value.email,
      form.value.password
      )
   
  } catch (err:any) {
    this.errors.push(err)
  }
  } 

}
