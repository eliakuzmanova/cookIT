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
  totalTime!: number
  ingredients: String[];
  directions: String[];
  recipeId: string;
  recipe!: IRecipe;
  detailService: any;
  isPluralLength: boolean = false;
  loggedUser: any;
  isAuthor: boolean = false;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private editRecipeService: EditRecipeService, private detailsService: DetailsService) {
    this.ingredients = [],
    this.directions = []
    this.recipeId = this.route.snapshot.params['id']
    
    this.detailsService.getDetails(this.recipeId).subscribe(value => {
      this.recipe = value;
      this.recipe.image = `http://localhost:5750/${this.recipe.image}`
      this.recipe.author.image = `http://localhost:5750/${this.recipe.author.image}`
      this.isPluralLength = this.recipe.author.recipes.length > 1 ? true : false;
      this.loggedUser = this.authService.getUserInfo();
      this.isAuthor = this.loggedUser?._id == this.recipe?.author._id

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
    form.value.image = this.image

    this.totalTime = Number(form.value.prepTime) + Number(form.value.cookingTime)
    form.value.totalTime = this.totalTime

    const formData = new FormData();

    formData.append("userId", this.authService.getUserInfo()._id)
    formData.append("image", form.value.image);
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
        this.router.navigate(["/"])
      }
    });

  }
}
