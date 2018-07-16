import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _baseUrl = 'http://localhost:8000/api';

  constructor(private _http: HttpClient) { }

  getAllPosts(){
    return this._http.get(`${this._baseUrl}/posts`);
  }

  getPopularPosts(){
    return this._http.get(`${this._baseUrl}/popular-posts`);
  }

  getPost(id){
    return this._http.get(`${this._baseUrl}/posts/${id}`);
    
  }

}
