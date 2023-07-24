import { Component, OnInit } from '@angular/core';
import { AuthService } from './main/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cookIT';
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    try {
      this.authService.getUserInfo()
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
