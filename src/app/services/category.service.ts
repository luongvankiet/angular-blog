import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
    return this._http.get(`${this._baseUrl}/categories/${slug}`);
  }

  createCategory(data){
    return this._http.post(`${this._baseUrl}/categories`, data);
  }

  updateCategory(data){
    return this._http.put(`${this._baseUrl}/categories/${data.id}`, data);
  }

  deleteCategory(id){
    return this._http.delete(`${this._baseUrl}/categories/${id}`);
  }
}
