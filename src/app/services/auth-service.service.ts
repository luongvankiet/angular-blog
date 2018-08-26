import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtAuthService } from './jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(this.jwt.isLoggedIn());
  authStatus = this.isLoggedIn.asObservable();

  changeAuthStatus(value: boolean){
    this.isLoggedIn.next(value)
  }

  constructor(private jwt: JwtAuthService) { }
}
