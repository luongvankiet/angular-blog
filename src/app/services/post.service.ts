import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of, interval } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  })
};
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _baseUrl = 'http://localhost:8000/api';
  constructor(private _http: HttpClient) { }

  getAllPosts() {
    return this._http.get(`${this._baseUrl}/posts`);
  }


  getPopularPosts() {
    return this._http.get(`${this._baseUrl}/popular-posts`);
  }

  getNewPosts() {
    return this._http.get(`${this._baseUrl}/newPosts`);
  }

  getPost(slug) {
    return this._http.get(`${this._baseUrl}/posts/${slug}`);
  }

  getPostsByCategory(category_id) {
    return this._http.get(`${this._baseUrl}/category/${category_id}/posts`);
  }

  hasPost(slug): boolean {
    if (this.getPost(slug)) {
      return true;
    }
    return false;
  }

  countLikeDislike(id) {
    return this._http.get(`${this._baseUrl}/count/${id}`);
  }

  getLikeDislike(post_id) {
    return this._http.get(`${this._baseUrl}/likes_dislikes/${post_id}`);
  }

  updateLikeDislike(data) {
    return this._http.post(`${this._baseUrl}/likes_dislikes`, data);
  }

  deletePost(id) {
    return this._http.delete(`${this._baseUrl}/posts/${id}`);
  }

  create(data) {
    return this._http.post(`${this._baseUrl}/posts`, data);
  }

  updataPost(data) {
    const body = new HttpParams()
      .set('title', data.get('title'))
      .set('content', data.get('content'))
      .set('category_id', data.get('category_id'))
      .set('user_id', data.get('user_id'))
      .append('thumbnail', data.get('thumbnail'));
    // console.log(body.toString());
    // console.log(data);
    
    return this._http.put(`${this._baseUrl}/posts/${data.get('id')}`, body.toString(), httpOptions);
  }

}
