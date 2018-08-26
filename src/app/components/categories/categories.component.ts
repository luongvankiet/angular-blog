import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { PageChangedEvent } from 'ngx-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  public category = [];
  public posts = [];
  private _hasCategory: boolean = true;
  private _categoryId;
  private _categorySlug;
  private _paginatedPosts;
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
      data => { this.handleCategory(data); this._hasCategory = true },
      error => { this._hasCategory = false }
    )
  }

  handleParam(param) {
    this._categoryId = param.id;
    this._categorySlug = param.slug;
  }

  handleCategory(data) {
    this.category = data.data;
    this.handlePosts(data.data);

  }

  handlePosts(data) {
    this.posts = data.posts;
    this._paginatedPosts = this.posts.slice(0, 5);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this._paginatedPosts = this.posts.slice(startItem, endItem);
  }
}
