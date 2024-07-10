import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
  amount = 100000000;
  today = new Date();
  customer = 'Adam Warlok';
  loading = true;

  constructor(private todosService: TodosService){

  }

  ngOnInit(): void {
    this.todosService
    .getAll()
    .pipe(first())
    .subscribe(
      (response: any) => {
        console.log("response component", response);
      },
      (error: any) => {
        this.loading = false;
      }
    );
  }

}
