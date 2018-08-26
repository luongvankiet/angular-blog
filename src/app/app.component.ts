import { Component, OnInit, ViewChild } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { RoutingStateService } from './services/routing-state.service';
import { Router, NavigationEnd } from '@angular/router';
import { JwtAuthService } from './services/jwt-auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth-service.service';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isDisplay = true;
  public token = localStorage.getItem('token');
  constructor(
    private _routingState: RoutingStateService,
    private _router: Router,
    private _jwt: JwtAuthService,
    private _authService: AuthService,
  ) {
    setTheme('bs4');
    _routingState.loadRouting();
    
  }

  @ViewChild('login')  login: LoginComponent

  ngOnInit(): void {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    // this._router.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //     this._router.navigated = false;
    //     window.scrollTo(0, 0);
    //   }
    // });

    if (this._jwt.isTokenExpired()) {
      this._authService.changeAuthStatus(false);
      this._jwt.remove();
    }

  }
}
