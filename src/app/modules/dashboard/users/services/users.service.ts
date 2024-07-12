import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http
      .get<any>(`${environment.apiUrl}/users`)
      .pipe(
        map((response: any) => {
          console.log('Users service', response);
          return response;
        })
      );
  }
}
