import { Component, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    
     this.authService.onLogin(
      form.value.email,
      form.value.password)

   }

}
