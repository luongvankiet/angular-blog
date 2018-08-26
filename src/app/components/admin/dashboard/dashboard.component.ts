import { Component, OnInit } from '@angular/core';
import { RoutingStateService } from '../../../services/routing-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private _currentUrl;
  private _isActive: boolean;
  constructor(
    private _routingState: RoutingStateService
  ) { }

  ngOnInit() {
    this._currentUrl = this._routingState.getCurrentRoute();
  }

  isActive(url): boolean {
    if (url == this._currentUrl) {
      return true;
    }
  }
}
