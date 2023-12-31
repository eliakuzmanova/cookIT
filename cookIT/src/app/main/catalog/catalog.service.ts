
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IRecipe} from "../../interfaces/index"

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  url: string = "http://localhost:5750/recipes/getAll"

  constructor(private http:HttpClient) { }

  getAllRecipes() {
    return this.http.get<IRecipe[]>(this.url)
  }
}