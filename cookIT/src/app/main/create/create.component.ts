import { Component, ViewChild} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { CreateService } from './create.service'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  @ViewChild("form") form!: NgForm;
  @ViewChild("inputIngredients") inputIngredients!: NgModel
  @ViewChild("inputDirections") inputDirections!: NgModel

  image: File | undefined
  totalTime!: number
  ingredients: String[];
  directions: String[];

  constructor(private createService: CreateService, private authService: AuthService) {
    	this.ingredients = [],
      this.directions = []
  }

  onAddIngredient(e: any){

    if(e.target.previousSibling.value.length > 0) {
    this.ingredients.push(e.target.previousSibling.value);
  }

  this.inputIngredients.reset();

  }

  onAddDirection(e: any){

    if(e.target.previousSibling.value.length > 0) {
    this.directions.push(e.target.previousSibling.value);
    }
   
    this.inputDirections.reset();
    
  }

  onRemoveStep(index: any, arrName: String){

    (arrName=="ingredients"? this.ingredients: this.directions).splice(index, 1);
  }

  OnFileChange(e: any) {
    this.image = e.target.files[0]
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) { return; }
    form.value.image = this.image

    this.totalTime = Number(form.value.prepTime) + Number(form.value.cookingTime)
    const formData = new FormData();

    formData.append("userId", this.authService.getUserInfo()._id)
    formData.append("image", form.value.image);
    formData.append("title", form.value.title);
    formData.append("prepTime", String(form.value.prepTime));
    formData.append("cookingTime", String(form.value.cookingTime));
    formData.append("totalTime", String(this.totalTime));
    formData.append("ingredients", JSON.stringify(this.ingredients));
    formData.append("directions", JSON.stringify(this.directions));


    this.createService.createRecipe(formData).subscribe({
      next: (v) => console.log('HTTP response', v),
      error: (err) => console.log('HTTP Error', err),
      complete: () => console.info('complete') 
    }
    );

  }
}
