import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isPopularPostLoading = true;
  isLatestPostLoading = true;
  isCategoriesLoading = true;
  public latestPosts;
  public popularPosts;
  public categories;
  public moreCategories;
  constructor(
    private _postService: PostService,
    private _categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getPopularPost();
    this.getPosts();
    this.getCategories();
  }

  getPopularPost() {
    this._postService.getPopularPosts().subscribe(
      data => {
        this.handle(data);
        this.isPopularPostLoading = false;
      })
  }

  handle(data){
    this.popularPosts = data.data.slice(0,1);
    console.log(this.popularPosts);
    
  }

  getPosts() {
    this._postService.getNewPosts().subscribe(
      data => {
        this.handlePosts(data);
        this.isLatestPostLoading = false;
      }
    )
  }

  handlePosts(data) {
    this.latestPosts = data.data;
  }

  getCategories(){
    this._categoryService.getAllCategories().subscribe(
      data => {
        this.handleCategories(data);
        this.isCategoriesLoading = false;
      }
    )
  }

  handleCategories(data){
    this.categories = data.data.slice(0,5);
    this.moreCategories = data.data.slice(5, data.data.length);
  }
}
