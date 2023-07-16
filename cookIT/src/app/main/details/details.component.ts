import { Component, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
import { ActivatedRoute } from '@angular/router';
import { IRecipe } from "../../interfaces/index"

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],

})
export class DetailsComponent implements OnInit {
  isPluralLength = false;
  recipeId!: string;
  recipe: IRecipe | undefined;
  constructor(private route: ActivatedRoute, private detailService: DetailsService) { 

  }
  ngOnInit() {

    this.recipeId = this.route.snapshot.params['id']
    this.detailService.getDetails(this.recipeId).subscribe(value => {
    this.recipe = value;
    this.recipe.image = `http://localhost:5750/uploads/${this.recipe.image}`
    this.recipe.author.image = `http://localhost:5750/uploads/${this.recipe.author.image}`
    this.isPluralLength = this.recipe.author.recipes.length > 1 ? true : false;
    })
  }
}
