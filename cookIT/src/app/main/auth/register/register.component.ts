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

 constructor(private authService: AuthService) {

 }

 onSubmit(form: NgForm): void{
  
  if (form.invalid) { return; }

  if(form.value.password != form.value["confirm-password"]) {
    throw new Error("Passwords do not match");
  }

  
  this.authService.onRegister(
    form.value.username, 
    form.value.email, 
    form.value.password)

 }
}
