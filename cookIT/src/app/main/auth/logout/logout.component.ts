import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    try{
    this.authService.onLogout()
    }catch(err: any) {
      throw new Error(err)
    }
  }
}
