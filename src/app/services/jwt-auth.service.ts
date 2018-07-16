import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {

  private _baseUrl: '';

  private iss = {
    login: 'http://localhost:8000/api/auth/login',
    register: 'http://localhost:8000/api/auth/register'
  }

  constructor(
    private _http: HttpClient,
  ) {console.log(this.checkExpiredToken());
   }

  login(data) {
    return this._http.post('http://localhost:8000/api/auth/login', data);
  }

  register(data) {
    return this._http.post('http://localhost:8000/api/auth/register', data);
  }

  resetPassword(data) {
    return this._http.post('http://localhost:8000/api/auth/resetpassword', data);
  }

  changPassword(data) {
    return this._http.post('http://localhost:8000/api/auth/changepassword', data);
  }



  // getUser(token){
  //   return this._http.post(`${this._baseUrl}/me`);
  // }

  handle(token) {
    this.set(token);
  }

  set(token) {
    const payload = this.payload(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', payload.exp);
    
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return (Object.values(this.iss).indexOf(payload.iss) > -1) ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  loggedIn() {
    return this.isValid();
  }

  checkExpiredToken(){
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return expiresAt;
  }
}
