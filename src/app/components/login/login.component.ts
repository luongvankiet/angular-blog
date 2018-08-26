import { Component, OnInit, TemplateRef, Output } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthService } from '../../services/auth-service.service';
import { JwtAuthService } from '../../services/jwt-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { RoutingStateService } from '../../services/routing-state.service';
import { UserService } from '../../services/user.service';
import { TransferDataService } from '../../services/transfer-data.service';
import { EventEmitter } from 'events';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  returnUrl: string;

  public isLoggedIn: boolean;
  public login_form = {
    email: null,
    password: null
  }

  public register_form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  }

  public resetpassword_form = {
    email: null
  }

  public error = [];
  public resetError = null;
  public loginError = null;

  constructor(
    private _modalService: BsModalService,
    private _auth: AuthService,
    private _jwt: JwtAuthService,
    private _route: ActivatedRoute,
    private _notify: SnotifyService,
    private _router: Router,
    private _routingState: RoutingStateService,
    private _userService: UserService,
    private _transferData: TransferDataService
  ) { }

  ngOnInit() {
    this._auth.authStatus.subscribe(value => this.isLoggedIn = value);
    this.returnUrl = this._routingState.getPreviousUrl();

  }
  openModal(template: TemplateRef<any>, event: MouseEvent) {
    event.preventDefault();
    this.modalRef = this._modalService.show(template);
  }

  loginSubmit() {
    this._jwt.login(this.login_form).subscribe(
      data => this.handleToken(data),
      error => this.handleError(error)
    );
  }

  resetPasswordSubmit() {
    this._jwt.resetPassword(this.resetpassword_form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    if (data.error) {
      this.resetError = this._notify.error(data.error, 'Please try again!', { timeout: 5000 });
    } else {
      this._notify.success(data.data, 'Success!', { timeout: 0 });
    }
  }

  handleToken(data) {
    this._jwt.handle(data.access_token);
    this._auth.changeAuthStatus(true);
    // todo save reference user info into localstorage
    this._userService.getUser(data.access_token).subscribe(
      data => {
        this.handleUserData(data)
      }
    )
  }

  handleError(error) {
    if (error.error.errors) {
      this.error = error.error.errors;
    }
    this.loginError = this._notify.error(error.error.error, 'Please try again!', { timeout: 5000 });
    if (error.error.message) {
      this._notify.error(error.error.message, 'Please try again!', {
        timeout: 5000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  handleUserData(data) {
    this._userService.emitChange('Login successfully');
    localStorage.setItem('user_id', data.id);
    if (data.roles.length > 0) {
      localStorage.setItem('role', data.roles[0].name);
      if (data.roles[0].name.indexOf('admin') > -1) {
        this._router.navigate(['/admin']);
      } else {
        this._router.navigate([this.returnUrl]);
      }
    } else {
      localStorage.setItem('role', 'user');
      this._router.navigate([this.returnUrl]);
    }
  }

  back() {
    this._router.navigate(['/']);
  }
}
