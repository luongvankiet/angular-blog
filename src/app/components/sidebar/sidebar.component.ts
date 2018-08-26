import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { RoutingStateService } from '../../services/routing-state.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public posts;
  public categories;
  public user = [];
  public isAdmin: boolean;
  public isPostsLoading: boolean = true;
  public isCategoriesLoading: boolean = true;
  private _token = localStorage.getItem('token');
  private _currentRoute;
  public active;
  public avatarUrl = "assets/images/default_avatar.png";
  constructor(
    private _postService: PostService,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _routingState: RoutingStateService,
    private _imageService: ImageService
  ) { }

  ngOnInit() {
    this._currentRoute = this._routingState.getCurrentRoute();
    this.getPopularPosts();
    this.getCategories();
    if (this._token) {
      this.getUser(this._token);
    }
    let role = localStorage.getItem('role');
    if (role && role.indexOf('admin') > -1) {
      this.isAdmin = true;
    }
  }

  getPopularPosts() {
    this._postService.getPopularPosts().subscribe(
      data => {
        this.handlePosts(data);
        this.isPostsLoading = false;
      },
      error => console.log(error)
    );
  }

  getUser(token) {
    this._userService.getUser(token).subscribe(
      data => this.handleUserData(data),
    )
  }

  getCategories() {
    this._categoryService.getAllCategories().subscribe(
      data => {
        this.handleCategoriesData(data);
        this.isCategoriesLoading = false;
      },
    )
  }

  handlePosts(data) {
    this.posts = data.data;
  }

  handleCategoriesData(data) {
    this.categories = data.data;
  }

  handleUserData(data) {
    this.user = data;
    this.getAvatar(data.id);
  }

  isActive(url): boolean {
    if (url) {
      if (this._currentRoute.indexOf(url) > -1) {
        return true
      } else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  getAvatar(id) {
    this._imageService.getAvatar(id).subscribe(
      data => this.handleAvatar(data),
    )
  }

  handleAvatar(data) {
    if (data.image) {
      this.avatarUrl = 'http://localhost:8000/images/' + data.image;
    }
  }
}
