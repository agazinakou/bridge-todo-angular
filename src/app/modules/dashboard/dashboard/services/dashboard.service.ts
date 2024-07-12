import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getResume() {
    return this.http
      .get<any>(`${environment.apiUrl}/resume`)
      .pipe(
        map((response: any) => {
          console.log('Dashboard service', response);
          return response;
        })
      );
  }
}
