import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  loadImage(){
    return this._http.get(`${this._baseUrl}/images`);
  }

  trustedUrl(html){
    return this._sannitizer.bypassSecurityTrustHtml(html);
  }
}
