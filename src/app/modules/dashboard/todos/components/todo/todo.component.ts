import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../../../../core/models/todo';
import { TodosService } from '../../services/todos.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input() todo = new Todo;
  @Output() action = new EventEmitter<boolean>();

  constructor(private todosService: TodosService) {

  }

  mark = (todo: Todo) => {
    this.todosService
      .mark(todo)
      .pipe(first())
      .subscribe(
        (response: any) => {
          if(response.status === 'success'){
            this.action.emit(true);
          }
        }
      );
  }

  remove = (id: string) => {
    this.todosService
      .delete(id)
      .pipe(first())
      .subscribe(
        (response: any) => {
          if(response.status === 'success'){
            this.action.emit(true);
          }
        }
      );
  }
}
