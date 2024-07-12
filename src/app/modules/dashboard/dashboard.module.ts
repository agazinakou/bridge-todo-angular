import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { TodosComponent } from './todos/components/todos.component';
import { AddTodoComponent } from './todos/components/add-todo/add-todo.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './todos/components/todo/todo.component';
import { ChartModule } from 'primeng/chart';
import { UsersComponent } from './users/components/users.component';
import { CoreModule } from '../../core';

@NgModule({
  declarations: [
    DashboardComponent,
    TodosComponent,
    AddTodoComponent,
    TodoComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    DashboardRoutingModule,
    InputTextModule,
    ReactiveFormsModule,
    ChartModule
  ]
})
export class DashboardModule { }
