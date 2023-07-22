import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @ViewChild("form") form!: NgForm;

  image: File | undefined;
  user!: IUser;
  usernameValue!: string;
  selectedImage: string | undefined;

constructor(private authService: AuthService ,private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUserInfo()
    this.user.image = `http://localhost:5750/${this.user.image}`
    this.usernameValue = this.user.username
  }


  OnFileChange(e: any) {
    this.image = e.target.files[0]
    if(e.target.files[0]) {
    this.selectedImage = e.target.files[0].name;
    } else {
      this.selectedImage = undefined;
    }
    
  }

  onSubmit(form: NgForm): void {
    
  }
}
