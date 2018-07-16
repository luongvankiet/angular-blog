import { Component, OnInit, TemplateRef } from '@angular/core';
import { JwtAuthService } from '../../services/jwt-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  returnUrl: string;

  public loggedIn: boolean;

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
    private _route: ActivatedRoute,
    private _jwt: JwtAuthService,
    private _router: Router,
    private _auth: AuthService,
    private _modalService: BsModalService,
    private _notify: SnotifyService
  ) { }

  ngOnInit() {
    this._auth.authStatus.subscribe(value => this.loggedIn = value);
    this.returnUrl = this._router.url;
  }

  openModal(template: TemplateRef<any>, event: MouseEvent) {
    event.preventDefault();
    this.modalRef = this._modalService.show(template);
  }


  openModal2(template: TemplateRef<any>, event: MouseEvent) {
    event.preventDefault();
    this.modalRef2 = this._modalService.show(template);
    this.modalRef.hide();
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this._jwt.remove();
    this._auth.changeAuthStatus(false);
    this._router.navigateByUrl('/');
  }

  loginSubmit() {
    this._jwt.login(this.login_form).subscribe(
      data => this.handleToken(data),
      error => this.handleError(error)
    );
  }

  registerSubmit() {
    this._jwt.register(this.register_form).subscribe(
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
    this._router.navigateByUrl(this.returnUrl);
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


  hideLoginModal() {
    if (this.error = []) {
      this.modalRef.hide();
    }
  }

  hideRegisterModal() {
    if (this.error = []) {
      this.modalRef.hide();
    }
  }

}
