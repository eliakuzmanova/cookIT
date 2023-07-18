import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './profile.service';
import {IUser} from "../../interfaces/index"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  id!: string;
  user!: IUser | undefined;
  isPluralLength = false;
  hasRecipes = false;
  constructor(private profileService: ProfileService, private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.profileService.getUserById(this.id).subscribe(value => {
       this.user = value;       
       this.user.image = `http://localhost:5750/${this.user.image}`
       this.user.recipes.map((recipe) => {
        recipe.image = `http://localhost:5750/${recipe.image}`;
      })
      this.isPluralLength = this.user.recipes.length > 1 ? true : false;
      this.hasRecipes = this.user.recipes.length < 1 ? true : false;
      
     })
  }
}
