import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IRecipe} from "../../interfaces/index"

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  url: string = "http://localhost:5750/recipes/"

  constructor(private http:HttpClient) { }

  createRecipe(formData: FormData) {
    return this.http.post(`${this.url}create`, formData)
  }
}
