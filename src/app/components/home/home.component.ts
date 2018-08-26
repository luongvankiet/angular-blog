import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { RoutingStateService } from '../../services/routing-state.service';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public categories;
  public onLoadCarousel: boolean;
  public onLoadHeader: boolean;
  constructor(
    private _routingState: RoutingStateService,
    private _categoryService: CategoryService
  ) {

  }

  ngOnInit() {
    if (this._routingState.getCurrentRoute() == '/' || this._routingState.getCurrentRoute().indexOf('/categories') > -1) {
      this.onLoadCarousel = true;
    } else {
      this.onLoadCarousel = false;
    }
    if (this._routingState.getCurrentRoute().indexOf('/profile') > -1) {
      this.onLoadHeader = false;
    }
    else {
      this.onLoadHeader = true;
    }
  }
}
