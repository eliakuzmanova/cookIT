import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
import { IRecipe } from "../../interfaces/index"
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  hasRecipes: boolean = false;
  recipes: IRecipe[] = [];
  constructor(private catalogService: CatalogService) {

  }
  ngOnInit(): void {
 try{
    this.catalogService.getAllRecipes().subscribe(values => {
      this.recipes = values
      this.recipes.map((recipe) => {
        recipe.image = `http://localhost:5750/${recipe.image}`;
        this.hasRecipes = this.recipes.length > 0 ? true : false;
      })
     })
     
  }catch(err: any) {
    throw new Error(err)
  }
}
  
}
