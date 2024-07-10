import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { CoreModule } from '../../core/core.module';
import { TodosComponent } from './todos/components/todos.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TodosComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
