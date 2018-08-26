import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { JwtAuthService } from '../../services/jwt-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

import { SnotifyService } from 'ng-snotify';
import { UserService } from '../../services/user.service';
import { RoutingStateService } from '../../services/routing-state.service';
import { TransferDataService } from '../../services/transfer-data.service';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { PostService } from '../../services/post.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private currenUrl: string;
  private returnUrl: string;
  private logoutUrl;
  public username = localStorage.getItem('username');
  public user = [];
  public posts;
  public isLoggedIn: boolean;
  public error = [];

  constructor(
    private _route: ActivatedRoute,
    private _jwt: JwtAuthService,
    private _router: Router,
    private _auth: AuthService,
    private _userService: UserService,
    private _routingState: RoutingStateService,
    private _transferData: TransferDataService,
    private _searchService: SearchService,
    private _postService: PostService,
    private _cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this._auth.authStatus.subscribe(value => this.isLoggedIn = value);
    this.returnUrl = this._routingState.getPreviousUrl();
    this.updateNav();
    this._userService.changeEmitted$.subscribe(
      text => {
        if (text == 'Login successfully')
          this.updateNav();
      });
    // this.getPost();

  }

  updateNav() {
    let token = localStorage.getItem('token');
    if (token) {
      this.getUser(token);
    }
  }

  onChange(event) {
    this._router.navigate([`search`, event]);
  }


  logout(event: MouseEvent) {
    event.preventDefault();
    this._jwt.remove();
    this._auth.changeAuthStatus(false);
    this._router.navigate(['/']);
  }

  getUser(token) {
    this._userService.getUser(token).subscribe(
      data => this.handleUserData(data),
    )
  }

  handleUserData(data) {
    this.user = data;
    this._cd.detectChanges();
  }

  getPost() {
    this._postService.getAllPosts().subscribe(
      data => this.handlePostsData(data),
    )
  }

  handlePostsData(data) {
    this.posts = data.data;
  }
}
