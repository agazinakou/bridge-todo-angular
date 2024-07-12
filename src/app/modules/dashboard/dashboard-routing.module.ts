import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { AppLayoutComponent } from '../../core/layouts/app-layout/app-layout.component';
import { authGuard } from '../../core/guard/auth/auth.guard';
import { TodosComponent } from './todos/components/todos.component';
import { UsersComponent } from './users/components/users.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [{
      path: '',
      component: DashboardComponent,
    },{
      path: 'todos',
      component: TodosComponent
    },{
      path: 'users',
      component: UsersComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
