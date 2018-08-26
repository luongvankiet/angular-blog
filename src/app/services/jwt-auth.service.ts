import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {

  private _headers = new Headers({
    'Content-Type': 'application/json',
  });

  private _token;

  private iss = {
    login: 'http://localhost:8000/api/auth/login',
    register: 'http://localhost:8000/api/auth/register'
  }

  constructor(
    private _http: HttpClient,
  ) {
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

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
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

  isLoggedIn() {
    return this.isValid();
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = this.payload(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    
    return date;
  }

  
  isTokenExpired(token?: string): boolean {
    if(!token) token = this.get();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
}
