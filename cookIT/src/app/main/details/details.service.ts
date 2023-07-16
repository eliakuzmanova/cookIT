import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IRecipe} from "../../interfaces/index"

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  url: string = "http://localhost:5750/recipes/"

  constructor(private http:HttpClient) { }

  getDetails(id:string) {
    return this.http.get<IRecipe>(`${this.url}${id}/getOne`)
  }
}
