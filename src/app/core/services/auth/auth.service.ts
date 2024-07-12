import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(DOCUMENT) private document: Document,
  private jwtHelperService: JwtHelperService, private http: HttpClient) { }

  currentTokenValue = () => {
    if(typeof localStorage !== 'undefined'){
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  isAuthenticated = async () => {
    const token = this.currentTokenValue();
    if(token){
      if(this.jwtHelperService.isTokenExpired(token)){
        this.logout();
        return false;
      } else {
        return await this.checkTokenValidity();
      }
    } else {
      return false;
    }
  }

  checkTokenValidity = () => {
    return new Promise((resolve) => {
      const date: any = this.jwtHelperService.getTokenExpirationDate();
      const minutes = this.remainingMinutes(new Date(), new Date(date));
      if(minutes < 10){
        /*this.http
        .post<any>(`${environment.apiUrl}/refresh`, {})
        .subscribe((response: any) => {
          console.log('checkTokenValidity', response);
          localStorage.setItem('token', response.authorisation.token);
          });*/
          resolve(true);
      } else {
        resolve(true);
      }
    });

  }

  remainingMinutes = (now: any, tokenExpireDate: any) => {
    const diffInMs = Math.abs(now - tokenExpireDate);
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    console.log('diffInMinutes', diffInMinutes);
    return diffInMinutes;
  }

  logout = () => {
    localStorage.removeItem('token');
    location.href = '/';
  }
}
