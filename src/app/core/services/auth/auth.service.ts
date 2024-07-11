import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(DOCUMENT) private document: Document, private jwtHelperService: JwtHelperService) { }

  currentTokenValue = () => {
    if(typeof localStorage !== 'undefined'){
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  isAuthenticated = async () => {
    var token = this.currentTokenValue();
    if(token){
      if(this.jwtHelperService.isTokenExpired(token)){
        this.logout();
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  logout = () => {
    localStorage.clear();
    location.href = '/';
  }
}
