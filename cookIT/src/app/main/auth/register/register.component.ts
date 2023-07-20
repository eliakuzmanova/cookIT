import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
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

 onSubmit(form: NgForm): void | any{
  try {
    
  
  if (form.invalid) { return; }
  const formData = new FormData();

  if(form.value.password != form.value["confirm-password"]) {
    throw new Error("Passwords do not match")
  }

  formData.append("username", form.value.username);
  formData.append("email", form.value.email);
  formData.append("password", form.value.password);
  
  this.authService.onRegister(formData)
  .subscribe({
    next: () =>  this.authService.onLogin(formData),
    error: (err) => console.log('HTTP Error', err),
      complete: () => console.info('complete') 
  })

  }catch (err) {
    console.log(err);
    return err;
  }
 }
}
