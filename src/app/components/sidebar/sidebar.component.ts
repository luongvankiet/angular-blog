import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public posts;
  public categories;

  constructor(
    private _postService: PostService,
    private _categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.getPopularPosts();
    this.getCategoriesData();
  }

  getPopularPosts() {
    this._postService.getPopularPosts().subscribe(
      data => this.handlePosts(data),
      error => console.log(error)
    );
  }

  getCategoriesData() {
    this._categoryService.getAllCategories().subscribe(
      data => this.handleCategories(data),
      error => console.log(error),
    )
  }

  handlePosts(data) {
    this.posts = data.data;
  }

  handleCategories(data) {
    this.categories = data.data;
  }
}
