import { Component, OnInit } from '@angular/core';
import { AuthService } from '../main/auth/auth.service';
import { IUser } from '../interfaces';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  user : IUser | undefined;
  isLoggedIn : boolean = false;
 constructor(private authService: AuthService) {
  
  
 }

 ngOnInit() {
  this.user = this.authService.getUserInfo();
  this.isLoggedIn = !!this.user
 }

}
