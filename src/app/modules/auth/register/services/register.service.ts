import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { map } from 'rxjs';
import { User } from '../../../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http
      .post<any>(`${environment.apiUrl}/register`, user)
      .pipe(
        map((response: any) => {
          console.log('Register service', response);
          return response;
        })
      );
  }
}
