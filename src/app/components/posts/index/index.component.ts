import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { PostService } from '../../../services/post.service';
import { CategoryService } from '../../../services/category.service';
import { ImageService } from '../../../services/image.service';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public posts;
  public categories;
  public images;
  hasImage: boolean;
  public ImageUrl = 'http://localhost:8000/images';

  private _observablePostsData: Observable<any>;
  private _observableCategoriesData: Observable<any>;
  private _observableImagesData: Observable<any>;


  constructor(
    private _postService: PostService,
    private _categoryService: CategoryService,
    private _imageService: ImageService
  ) { }

  ngOnInit() {
    this.getPosts();
    this.getCategories();
    this.getImages();
  }

  ngOnDestroy(): void {

  }

  getPosts() {
    this._observablePostsData = this._postService.getAllPosts();
    this._observablePostsData.pipe(map(data => {
      return data.data;
    })).subscribe(
      data => this.handlePostsData(data),
      error => console.log(error)
    );
  }

  getCategories() {
    this._observableCategoriesData = this._categoryService.getAllCategories();
    this._observableCategoriesData.pipe(map(data => {
      return data.data;
    })).subscribe(
      data => this.handleCategoriesData(data),
      error => console.log(error)
    );
  }

  getImages() {
    this.hasImage = true;
    this._observableImagesData = this._imageService.loadImage();
    this._observableImagesData.subscribe(
      data => {
        this.images = data.data;
        console.log(this.images)
        this.hasImage = false;
      },

      error => {
        this.hasImage = false;
        console.log(error);

      }
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.images = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }


  handleCategoriesData(data) {
    this.categories = data;
  }

  handlePostsData(data) {
    this.posts = data;
  }

}
