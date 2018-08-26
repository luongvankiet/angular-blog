import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { JwtAuthService } from '../../services/jwt-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { RoutingStateService } from '../../services/routing-state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private isLoggedIn: boolean;
  public register_form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  }
  public error = [];
  public resetError = null;

  constructor(
    private _auth: AuthService,
    private _jwt: JwtAuthService,
    private _route: ActivatedRoute,
    private _notify: SnotifyService,
    private _router: Router,
    private _routingState: RoutingStateService
  ) { }

  ngOnInit() {
    this._auth.authStatus.subscribe(value => this.isLoggedIn = value);
  }

  registerSubmit() {
    this._jwt.register(this.register_form).subscribe(
      data => this.handleToken(data),
      error => this.handleError(error)
    );
  }

  handleToken(data) {
    this._jwt.handle(data.access_token);
    this._auth.changeAuthStatus(true);
    this._router.navigateByUrl("/");
  }


  handleError(error) {
    if (error.error.errors.email) {
      this._notify.error(error.error.errors.email, 'Please try again!', {
        timeout: 5000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
    if (error.error.errors.password) {
      this._notify.error(error.error.errors.password, 'Please try again!', {
        timeout: 5000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  
  back(){
    this._router.navigate(['/']);
  }
}
