import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EditService {
  url: string = "http://localhost:5750/profile/edit"

  constructor(private http:HttpClient) { }

  editProfile(formData: FormData) {
    return this.http.post(`${this.url}`, formData)
  }
}
