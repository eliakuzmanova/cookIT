import { Component, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
import { ActivatedRoute } from '@angular/router';
import { IRecipe } from "../../interfaces/index"
import { IUser } from 'src/app/interfaces';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],

})
export class DetailsComponent implements OnInit {
  isPluralLength = false;
  recipeId!: string;
  recipe: IRecipe | undefined;
  loggedUser : IUser | undefined;
  isAuthor: boolean = false;

  constructor(private route: ActivatedRoute, private detailService: DetailsService, private authService: AuthService,) { }
  ngOnInit() {  
    this.recipeId = this.route.snapshot.params['id']
    this.detailService.getDetails(this.recipeId).subscribe(value => {
    this.recipe = value;
    this.recipe.image = `http://localhost:5750/${this.recipe.image}`
    this.recipe.author.image = `http://localhost:5750/${this.recipe.author.image}`
    this.isPluralLength = this.recipe.author.recipes.length > 1 ? true : false;
    this.loggedUser = this.authService.getUserInfo();
    this.isAuthor = this.loggedUser?._id == this.recipe?.author._id
    console.log(this.isAuthor);
    
    })
  
    
  }
}
