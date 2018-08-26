import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private _baseUrl = 'http://localhost:8000/api';


  constructor(
    private _http: HttpClient,
    private _sannitizer: DomSanitizer
  ) { }

  loadImage() {
    return this._http.get(`${this._baseUrl}/images`);
  }

  trustedUrl(html) {
    return this._sannitizer.bypassSecurityTrustHtml(html);
  }

  uploadImage(image) {
    return this._http.post(`${this._baseUrl}/images`, image);
  }

  getAvatar(user_id) {
    return this._http.get(`${this._baseUrl}/getAvatar/${user_id}`);
  }

  getCoverImage(user_id) {
    return this._http.get(`${this._baseUrl}/getCoverImage/${user_id}`);
  }

  getPostImage(id) {
    return this._http.get(`${this._baseUrl}/images/${id}`);
  }

  onSetImage(image_id, post_id, user_id) {
    const data = new HttpParams()
      .set('post_id', post_id)
      .set('user_id', user_id)
    return this._http.put(`${this._baseUrl}/images/${image_id}`, data);
  }

  onSetAvatar(image_id, user_id) {
    const data = new HttpParams()
      .set('user_id', user_id)
    return this._http.put(`${this._baseUrl}/setAvatar/${image_id}`, data);
  }

  onSetCoverImage(image_id, user_id) {
    const data = new HttpParams()
      .set('user_id', user_id)
    return this._http.put(`${this._baseUrl}/setCoverImage/${image_id}`, data);
  }

  deleteImage(id) {
    return this._http.delete(`${this._baseUrl}/images/${id}`);
  }
}
