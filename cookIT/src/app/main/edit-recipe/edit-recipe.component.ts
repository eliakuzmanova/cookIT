import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm, NgModel } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EditRecipeService } from './edit-recipe.service'
import { IRecipe } from 'src/app/interfaces';
import { DetailsService } from '../details/details.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent {

  @ViewChild("form") form!: NgForm;
  @ViewChild("inputIngredients") inputIngredients!: NgModel
  @ViewChild("inputDirections") inputDirections!: NgModel

  image: File | undefined
  defaultImage!: string;
  totalTime!: number
  ingredients: String[] = [];
  directions: String[] = [];
  recipeId: string;
  recipe!: IRecipe;
  detailService: any;
  isPluralLength: boolean = false;
  loggedUser: any;

  titleValue!: string;
  prepTimeValue!: number;
  cookingTimeValue!: number;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private editRecipeService: EditRecipeService, private detailsService: DetailsService) {
 
    this.recipeId = this.route.snapshot.params['id']

    this.detailsService.getDetails(this.recipeId).subscribe(value => {

      this.recipe = value;
      this.defaultImage = `http://localhost:5750/${this.recipe.image}`
    
      this.isPluralLength = this.recipe.author.recipes.length > 1 ? true : false;
      this.loggedUser = this.authService.getUserInfo();
      this.ingredients = this.recipe.ingredients;
      this.directions = this.recipe.directions;
      this.titleValue = this.recipe.title;
      this.prepTimeValue = this.recipe.prepTime;
      this.cookingTimeValue = this.recipe.cookingTime;
    })
  }

  onAddIngredient(e: any) {

    if (e.target.previousSibling.value.length > 0) {
      this.ingredients.push(e.target.previousSibling.value);
    }

    this.inputIngredients.reset();

  }

  onAddDirection(e: any) {

    if (e.target.previousSibling.value.length > 0) {
      this.directions.push(e.target.previousSibling.value);
    }

    this.inputDirections.reset();

  }

  onRemoveStep(index: any, arrName: String) {

    (arrName == "ingredients" ? this.ingredients : this.directions).splice(index, 1);
  }

  OnFileChange(e: any) {
    this.image = e.target.files[0]
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) { return; }
    if(this.image){
      form.value.image = this.image
      }

    this.totalTime = Number(form.value.prepTime) + Number(form.value.cookingTime)
    form.value.totalTime = this.totalTime

    const formData = new FormData();

    formData.append("recipeId", this.recipeId)
    formData.append("image", form.value.image? form.value.image: this.recipe.image);
    formData.append("title", form.value.title);
    formData.append("prepTime", form.value.prepTime);
    formData.append("cookingTime", form.value.cookingTime);
    formData.append("totalTime", form.value.totalTime);
    formData.append("ingredients", JSON.stringify(this.ingredients));
    formData.append("directions", JSON.stringify(this.directions));

    this.editRecipeService.editRecipe(formData).subscribe({
      next: (v) => console.log('HTTP response', v),
      error: (err) => console.log('HTTP Error', err),
      complete: () => {
        this.router.navigate([`/details/${this.recipeId}`])
      }
    });

  }
}
