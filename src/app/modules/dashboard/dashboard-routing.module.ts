import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { AppLayoutComponent } from '../../core/layouts/app-layout/app-layout.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { authGuard } from '../../core/guard/auth/auth.guard';
import { TodosComponent } from './todos/components/todos.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: AppLayoutComponent,
    children: [{
      path: '',
      component: DashboardComponent,
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
