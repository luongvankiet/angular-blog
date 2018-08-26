import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _baseUrl = 'http://localhost:8000/api/search?search=';
  constructor(private _httpClient: HttpClient) { }

  searchEntries(term) {
    return this._httpClient.get(this._baseUrl + term).pipe(debounceTime(1000),distinctUntilChanged());
  }
}
