import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';
import { EditService } from './edit.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @ViewChild("form") form!: NgForm;

  errors: String[] | any[] = [];

  image: File | undefined;
  userImage! : string;
  user!: IUser;
  usernameValue!: string;
  emailValue!: string;
  selectedImage: string | undefined;

constructor(private authService: AuthService ,private router: Router, private editService: EditService) {}

  ngOnInit(): void {
    try{
    this.user = this.authService.getUserInfo()
    this.userImage = `http://localhost:5750/${this.user.image}`
    this.usernameValue = this.user.username
    this.emailValue = this.user.email
    }catch (err:any) {
      this.errors.push(err)
    }
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
    if (form.invalid) { return; }
    if(this.image){
    form.value.image = this.image
    }
    const formData = new FormData();

    formData.append("userId", this.user._id)
    formData.append("image", form.value.image? form.value.image: this.userImage);
    formData.append("username", form.value.username);
    formData.append("email", form.value.email);

 
    this.editService.editProfile(formData).subscribe({
      next: (v) =>this.authService.setLocalStorageState("auth", v),
      error: (err) => console.log('HTTP Error', err),
      complete: () => {
        this.router.navigate([`profile/${this.user._id}`])
      }
    });
  }
}
