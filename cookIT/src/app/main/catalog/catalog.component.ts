import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
import { IRecipe } from "../../interfaces/index"
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  recipes: IRecipe[] = [];
  constructor(private catalogService: CatalogService) {

  }
  ngOnInit(): void {

    this.catalogService.getAllRecipes().subscribe(values => {
      this.recipes = values
      this.recipes.map((recipe) => {
        recipe.image = `http://localhost:5750/uploads/${recipe.image}`;
      })
     })
  }
}
