import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _baseUrl = 'http://localhost:8000/api'
  constructor(private _http:HttpClient) { }

  getAllCategories(){
    return this._http.get(`${this._baseUrl}/categories`);
  }

  getCategory(slug, id){
    return this._http.get(`${this._baseUrl}/categories/${slug}/${id}`);
  }
}
