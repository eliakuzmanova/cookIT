import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {
  isAuthenticated$$: Subject<any> = new Subject();

  constructor() {
   
  }
}
