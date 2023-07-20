import { Component, ViewChild  } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild("form") form!: NgForm;
  
  constructor(private authService: AuthService) {

  }

  onSubmit(form: NgForm): void | any{
    
    if (form.invalid) { return; }
    const formData = new FormData();
  
    formData.append("username", form.value.username);
    formData.append("password", form.value.password);
    
    // this.authService.onLogin(formData)

   }

}
