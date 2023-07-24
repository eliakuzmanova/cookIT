import { Component} from '@angular/core';
import { AuthenticateComponent } from '../main/auth/authenticate/authenticate.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLogged: any;

 constructor(private authenticateComponent: AuthenticateComponent) {

   this.authenticateComponent.isAuthenticated$$.subscribe({
    next: (value) => this.isLogged = value,
    error: (err) => {throw new Error(err)}
  });

 }



}
