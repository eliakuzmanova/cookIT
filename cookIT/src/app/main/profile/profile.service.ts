import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IUser} from "../../interfaces/index"

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url: string = "http://localhost:5750/users/"

  constructor(private http:HttpClient) { }

  getUserById(id:string) {
    return this.http.get<IUser>(`${this.url}${id}`)
  }
}