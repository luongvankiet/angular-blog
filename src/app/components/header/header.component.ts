import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public categories;
  public moreCategories;
  constructor(private _categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategoriesData();
  }

  getCategoriesData() {
    this._categoryService.getAllCategories().subscribe(
        data => this.handleCategoriesData(data),
      );
  }

  handleCategoriesData(data){
    this.categories = data.data.slice(0,5);
    this.moreCategories = data.data.slice(5, data.data.length);
  }

}
