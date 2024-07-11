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
  amount = 100000000;
  today = new Date();
  customer = 'Adam Warlok';

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
          }
        },
        (error: any) => {
          this.loading = false;
        }
      );
  }

}
