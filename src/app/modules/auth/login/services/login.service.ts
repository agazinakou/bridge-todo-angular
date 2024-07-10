import { Injectable } from '@angular/core';
import { User } from '../../../../core/models/user';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http
      .post<any>(`${environment.api.core_base_url}/api/v1/login`, user)
      .pipe(
        map((response: any) => {
          console.log('response service', response);
          return response;
        })
      );
  }
}
