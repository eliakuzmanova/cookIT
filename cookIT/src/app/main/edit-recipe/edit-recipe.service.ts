import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditRecipeService {
  url: string = "http://localhost:5750/recipe/edit"
  constructor(private http:HttpClient) { }
  editRecipe(formData: FormData) {
    return this.http.post(`${this.url}`, formData)
  }
}
