import { Component} from '@angular/core';
import { AuthenticateComponent } from '../main/auth/authenticate/authenticate.component';
import { authenticationGuard } from '../main/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLogged: any;

 constructor(private authenticateComponent: AuthenticateComponent) {
   this.authenticateComponent.isAuthenticated$$.subscribe({
    next: (value) => this.isLogged = value
  });

 }



}
