import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { PostService } from '../../../services/post.service';
import { CategoryService } from '../../../services/category.service';
import { ImageService } from '../../../services/image.service';
import { tap } from 'rxjs/operators';
import { PageChangedEvent } from 'ngx-bootstrap';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public posts = [];
  public categories = [];
  public categoriesPaginate = [];
  public postsPaginate = [];
  public images;
  public countLike = [];
  public countDislike = [];
  isLoading = true;
  hasImage: boolean;
  public ImageUrl = `http://localhost:8000/images`;
  private _returnedArray = [];

  constructor(
    private _postService: PostService,
    private _categoryService: CategoryService,
    private _imageService: ImageService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  ngOnDestroy(): void {

  }

  getCategories() {
    this._categoryService.getAllCategories().subscribe(
      data => {
        this.handleCategoriesData(data);
        this.isLoading = false;
      },
    );
  }

  handleCategoriesData(data) {
    this.categories = data.data;
    this.categoriesPaginate = this.categories.slice(0, 7);
    this.categories.forEach(category => {
      category.posts.forEach(post => {
        this._postService.countLikeDislike(post.id).subscribe(
          data => {
            this.handleCount(post.id, data);
          }
        )
      });
      this.postsPaginate.push([category.id, category.posts.slice(0, 4)]);
    });
  }

  handleCount(post_id, data) {
    this.countLike.push([post_id, data.like]);
    this.countDislike.push([post_id, data.dislike]);
  }

  // handlePostsData(data) {
  //   this.posts.push(data.data);
  // }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.categoriesPaginate = this.categories.slice(startItem, endItem);
  }

  // postChanged(category_id, event: PageChangedEvent, i): void {
  //   this.postsPaginate.forEach(post => {
  //     if (category_id == post[0]) {
  //       this.categories.forEach(category => {
  //         if (category.id == category_id) {
  //           const startItem = (event.page - 1) * event.itemsPerPage;
  //           const endItem = event.page * event.itemsPerPage;
  //           this.postsPaginate.splice(i, 1, [category_id, category.posts.slice(startItem, endItem)]);
  //         }
  //       });
  //       // const index = this.postsPaginate.find(post => post.category_id = category_id);
  //     }
  //   })

  // }
}
