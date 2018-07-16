import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  public category = [];
  public posts = [];
  private _categoryId;
  private _categorySlug;

  constructor(
    private _categoriesService: CategoryService,
    private _postsService: PostService,
    private _location: Location,
    private _route: ActivatedRoute,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this._route.params.subscribe(param => {
      this.handleParam(param);
      this.getCategory();
    });
  }

  getCategory() {
    this._categoriesService.getCategory(this._categorySlug, this._categoryId).subscribe(
      data => this.handleCategory(data),
      error => console.log(error)
    )
  }

  handleParam(param) {
    this._categoryId = param.id;
    this._categorySlug = param.slug;

  }

  handleCategory(data) {
    this.category = data.data;
  }

  handlePosts(data) {
    this.posts = data.data;
  }

}
