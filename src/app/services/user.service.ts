import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl = 'http://localhost:8000/api';
  // Observable string sources
  private updateNavbar = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.updateNavbar.asObservable();
  // Service message commands
  emitChange(change: any) {
    this.updateNavbar.next(change);
  }
  
  constructor(private _http: HttpClient) {
    
  }

  getUser(token) {
    return this._http.get(`${this._baseUrl}/auth/me?token=${token}`);
  }

  getUserByID(user_id) {
    return this._http.get(`${this._baseUrl}/users/${user_id}`);
  }

  getAllUsers() {
    return this._http.get(`${this._baseUrl}/users`);
  }

  getRoles() {
    return this._http.get(`${this._baseUrl}/roles`);
  }

  createRoles(data) {
    return this._http.post(`${this._baseUrl}/roles`, data)
  }

  updateUser(data) {
    return this._http.put(`${this._baseUrl}/users/${data.id}`, data);
  }

  deleteUser(user_id) {
    return this._http.delete(`${this._baseUrl}/users/${user_id}`);
  }

}
