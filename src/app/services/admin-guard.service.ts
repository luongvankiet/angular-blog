import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtAuthService } from './jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(
    private jwt: JwtAuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.jwt.isLoggedIn()) {
      if (!this.jwt.isTokenExpired()) {
        if (this.isAdmin()) {
          return true;
        } else {
          confirm('You cannot access this page');
          this.router.navigate(['/']);
          return false;
        }
      } else {
        // Navigate to the login page with extras
        confirm('You need to login to access this page');
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      confirm('You need to login to access this page');
      this.router.navigate(['/login']);
      return false;
    }
  }


  isAdmin(): boolean {
    let role = localStorage.getItem('role');
    if (role == 'admin') {
      return true;
    }
    else {
      return false;
    }
  }
}
