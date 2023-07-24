import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { CreateService } from './create.service'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  @ViewChild("form") form!: NgForm;
  @ViewChild("inputIngredients") inputIngredients!: NgModel
  @ViewChild("inputDirections") inputDirections!: NgModel

  errors: String[] | any[] = [];

  image: File | undefined
  totalTime!: number
  ingredients: String[];
  directions: String[];
  selectedImage: string | undefined;

  constructor(private createService: CreateService, private authService: AuthService, private router: Router) {

    this.ingredients = [],
      this.directions = []
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
    if(e.target.files[0]) {
      this.selectedImage = e.target.files[0].name;
      } else {
        this.selectedImage = undefined;
      }
  }

  onSubmit(form: NgForm): void {
    try {
    if (form.invalid) { return; }
    form.value.image = this.image

    this.totalTime = Number(form.value.prepTime) + Number(form.value.cookingTime)
    form.value.totalTime = this.totalTime
    if(this.ingredients.length == 0){
      this.errors.push("Ingredients is required")
      return
    } else {
      this.errors.push("")
    }

    if(this.directions.length == 0){
      this.errors.push("Directions is required")
      return
    } else {
      this.errors.push("")
    }
    
    const formData = new FormData();

    formData.append("userId", this.authService.getUserInfo()._id)
    formData.append("image", form.value.image);
    formData.append("title", form.value.title);
    formData.append("prepTime", form.value.prepTime);
    formData.append("cookingTime", form.value.cookingTime);
    formData.append("totalTime", form.value.totalTime);
    formData.append("ingredients", JSON.stringify(this.ingredients));
    formData.append("directions", JSON.stringify(this.directions));

    this.createService.createRecipe(formData).subscribe({
      next: (v) => console.log('HTTP response', v),
      error: (err) => {throw new Error(err)},
      complete: () => {
        this.router.navigate(["/"])
      }
    });
  } catch (err: any) {
    this.errors.push(err)
  }

  }
}
