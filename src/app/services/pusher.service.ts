import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
declare const Pusher: any;
@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  channel: any;
  private _baseUrl = 'http://localhost:8000/api';
  constructor(private _http:HttpClient) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe('events-channel');
  }

  updateLikeDislike(data){
    return this._http.post(`${this._baseUrl}/likes_dislikes`, data);
  }
}
