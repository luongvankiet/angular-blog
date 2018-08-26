import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { JwtAuthService } from './jwt-auth.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { RoutingStateService } from './routing-state.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private _user;
  private _isAdmin: boolean;
  private _returnUrl;
  constructor(
    private router: Router,
    private jwt: JwtAuthService,
    private _userService: UserService,
    private _routingState: RoutingStateService
  ) {
    this._returnUrl = _routingState.getPreviousUrl();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.jwt.isLoggedIn()) {
      this.router.navigate([this._returnUrl]);
      return false;
    } else {
      return true;
    }
  }

}