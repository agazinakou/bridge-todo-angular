import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  currentUserSubject!: BehaviorSubject<User>;

  constructor(private http: HttpClient) { }

  init = () => {
    return new Promise<void>((resolve, reject) => {
      this.http.get<any>(environment.apiUrl + '/me').subscribe((response: any) => {
        this.currentUserSubject = new BehaviorSubject<User>(response.user);
        resolve();
      }, () => {
        reject();
      })
    });
  }
}
