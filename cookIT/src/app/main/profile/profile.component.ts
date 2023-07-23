import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { IUser } from "../../interfaces/index"
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id!: string;
  user!: IUser | undefined;
  isPluralLength = false;
  hasRecipes = false;
  loggedUser!: IUser | undefined;

  constructor(private profileService: ProfileService, private router: Router , private route: ActivatedRoute, private authService: AuthService) {
    this.route.params.subscribe(params => this.ngOnInit())
    if(!this.route.snapshot.params['id'] || this.route.snapshot.params['id'].length == 0) {
      this.router.navigate(['/not-found'])
    }
  }

  ngOnInit(): void {
    this.loggedUser = this.authService.getUserInfo()

    if(!this.loggedUser || this.route.snapshot.params['id'] != this.loggedUser?._id ) {
      this.id = this.route.snapshot.params['id']
    } else {
      this.id = this.loggedUser?._id
    }

    this.profileService.getUserById(this.id).subscribe(value => {
      this.user = value;
      this.user!.image = `http://localhost:5750/${this.user!.image}`
      this.user!.recipes.map((recipe) => {
        recipe.image = `http://localhost:5750/${recipe.image}`;
        this.isPluralLength = this.user!.recipes.length > 1 ? true : false;
        this.hasRecipes = this.user!.recipes.length < 1 ? true : false;

      })
    })

  }
}
