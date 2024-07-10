import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { authGuard } from '../../core/guard/auth/auth.guard';
import { AppLayoutComponent } from '../../core/layouts/app-layout/app-layout.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: AppLayoutComponent,
    children: [{
      path: '',
      component: DashboardComponent
    },{
      path: 'todos',
      component: TodosComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
