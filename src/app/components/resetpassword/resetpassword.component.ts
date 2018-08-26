import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtAuthService } from '../../services/jwt-auth.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }

  public errors = [];
  public error = null;
  constructor(
    private route: ActivatedRoute,
    private jwt: JwtAuthService,
    private router: Router,
    private notify: SnotifyService
  ) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token'];
    });
  }

  onSubmit() {
    this.jwt.changPassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    )
  }

  handleResponse(data) {
    if (!data.error) {
      this.notify.success('Now login with your new password', 'Success!');
      this.router.navigateByUrl('/login');
    } else {
      this.error = this.notify.error(data.error, 'Please try again!', { timeout: 5000 });
    }
  }

  handleError(error) {

    this.errors = error.error.errors;
    if (error.error.message) {
      this.notify.error(error.error.message, 'Please try again!', {
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }


  ngOnInit() {
  }

}
