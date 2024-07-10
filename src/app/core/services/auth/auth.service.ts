import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { DOCUMENT } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User> | undefined;
  currentUserSubject!: BehaviorSubject<User>;

  constructor(@Inject(DOCUMENT) private document: Document, private jwtHelper: JwtHelperService) { }

  public get currentTokenValue() {
    var localStorage = this.document.defaultView?.localStorage;
    if(localStorage){
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  public isAuthenticated(): boolean {
    var localStorage = this.document.defaultView?.localStorage;
    if(localStorage){
      const token = localStorage.getItem('token');
      if(token){
        return !this.jwtHelper.isTokenExpired(token);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    location.reload();
  }
}
