import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingStateService } from '../../services/routing-state.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  private _returnUrl;

  constructor(
    private route: Router,
    private _routingState: RoutingStateService
  ) {
  }

  ngOnInit() {
    this._returnUrl = this._routingState.getPreviousUrl();
  }

  back(event: MouseEvent) {
    this.route.navigateByUrl(this._returnUrl);
  }
}
