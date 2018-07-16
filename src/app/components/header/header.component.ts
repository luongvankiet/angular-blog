import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public categories;

  private _observableCategoriesData: Observable<any>;
  constructor(private _categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategoriesData();
  }

  getCategoriesData() {
    this._observableCategoriesData = this._categoryService.getAllCategories();
    this._observableCategoriesData.pipe(
      map(data => {
        return data.data;
      })).subscribe(
        data => this.handleCategoriesData(data),
        error => console.log(error)
      );
  }

  handleCategoriesData(data){
    this.categories = data;
  }

}
