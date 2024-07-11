import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { CoreModule } from '../../core/core.module';
import { TodosComponent } from './todos/components/todos.component';
import { AddTodoComponent } from './todos/components/add-todo/add-todo.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    TodosComponent,
    AddTodoComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    DashboardRoutingModule,
    InputTextModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
