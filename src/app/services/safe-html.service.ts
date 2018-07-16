import { Injectable } from '@angular/core';
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'SafeHtml'})
@Injectable({
  providedIn: 'root'
})
export class SafeHTMLService {

  constructor(private _sanitizer:DomSanitizer) { }

  transform(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}
