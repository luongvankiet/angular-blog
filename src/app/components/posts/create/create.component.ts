import { Component, OnInit } from '@angular/core';
import { CategoriesComponent } from '../../categories/categories.component';
import { CategoryService } from '../../../services/category.service';
import { RoutingStateService } from '../../../services/routing-state.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PostService } from '../../../services/post.service';
import { SnotifyService } from 'ng-snotify';
import { JwtAuthService } from '../../../services/jwt-auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public categories;
  public post;
  public isLoggedIn;
  private _returnUrl;
  private form = {
    title: null,
    content: null,
    thumbnail: null,
    user_id: null,
    category_id: null,
  }
  constructor(
    private _categoryService: CategoryService,
    private _routingState: RoutingStateService,
    private _router: Router,
    private _userService: UserService,
    private _postService: PostService,
    private _notify: SnotifyService,
    private _jwt: JwtAuthService
  ) { }

  ngOnInit() {
    this.getCategories();
    this._returnUrl = this._routingState.getPreviousUrl();
    let token = localStorage.getItem('token');
    if (token) {
      this.getUser(token);
    }
    this.isLoggedIn = this._jwt.isLoggedIn();
  }

  getCategories() {
    this._categoryService.getAllCategories().subscribe(
      data => this.handleCategoriesData(data)
    )
  }
  getUser(token) {
    this._userService.getUser(token).subscribe(
      data => this.handleUserData(data)
    )
  }

  handleCategoriesData(data) {
    this.categories = data.data;
  }

  handleUserData(data) {
    this.form.user_id = data.id;
  }

  onSubmit() {
    const uploadData = new FormData();
    uploadData.append('title', this.form.title);
    uploadData.append('content', this.form.content);
    uploadData.append('user_id', this.form.user_id);
    uploadData.append('category_id', this.form.category_id);
    uploadData.append('thumbnail', this.form.thumbnail, this.form.thumbnail.name);
    this._postService.create(uploadData)
      .subscribe(
        data => this.handlePostData(data),
        error => this._notify.error('Something went wrong!', 'Error')
      );

  }

  onUpload(files: File) {
    let file = files[0];
    this.form.thumbnail = file;
  }

  handlePostData(data) {
    this.post = data.data;
    this._notify.success('Your post has been successfully created', 'Success');
    this._router.navigate([`/posts/${this.post.slug}`]);
  }

  onBack() {
    this._router.navigate([this._returnUrl]);
  }
}
