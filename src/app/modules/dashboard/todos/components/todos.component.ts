import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { first } from 'rxjs';
import { Todo } from '../../../../core/models/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  todos : Todo[] = [];
  loading = true;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosService
      .getAll()
      .pipe(first())
      .subscribe(
        (response: any) => {
          if(response.status === 'success'){
            this.todos = response.todos;
            this.loading = false;
          }
        },
        () => {
          this.loading = false;
        }
      );
  }

  addCallBack = ($event: boolean) => {
      if($event){
        this.ngOnInit();
      }
  }

  removeCallBack = ($event: boolean) => {
    if($event){
      this.ngOnInit();
    }
}

}
