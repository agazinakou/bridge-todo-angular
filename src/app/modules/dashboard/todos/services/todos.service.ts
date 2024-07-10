import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http
      .get<any>(`${environment.api.core_base_url}/api/v1/todos`)
      .pipe(
        map((response: any) => {
          console.log('response service', response);
          return response;
        })
      );
  }
}
