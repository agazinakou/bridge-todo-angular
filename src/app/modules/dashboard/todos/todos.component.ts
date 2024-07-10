import { Component } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {
  amount = 100000000;
  today = new Date();
  customer = 'Adam Warlok';
}
