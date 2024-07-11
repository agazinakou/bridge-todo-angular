import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../../core/models/user';
import { environment } from '../../../../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http
      .post<any>(`${environment.apiUrl}/login`, user)
      .pipe(
        map((response: any) => {
          console.log('Login service', response);
          return response;
        })
      );
  }
}
