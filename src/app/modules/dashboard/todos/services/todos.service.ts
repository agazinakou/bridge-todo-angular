import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs';
import { Todo } from '../../../../core/models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http
      .get<any>(`${environment.apiUrl}/todos`)
      .pipe(
        map((response: any) => {
          console.log('Todos service', response);
          return response;
        })
      );
  }

  add(todo: Todo) {
    return this.http
      .post<any>(`${environment.apiUrl}/todo`, todo)
      .pipe(
        map((response: any) => {
          console.log('Todos service', response);
          return response;
        })
      );
  }

  mark(todo: Todo) {
    return this.http
      .put<any>(`${environment.apiUrl}/todo/${todo.id}/mark`, {done: !todo.done})
      .pipe(
        map((response: any) => {
          console.log('Todos service', response);
          return response;
        })
      );
  }

  delete(id: string) {
    return this.http
      .delete<any>(`${environment.apiUrl}/todo/${id}`)
      .pipe(
        map((response: any) => {
          console.log('Todos service', response);
          return response;
        })
      );
  }
}
