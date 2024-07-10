import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/components/login.component';
import { RegisterComponent } from './modules/auth/register/components/register.component';
import { AppLayoutComponent } from './core/layouts/app-layout/app-layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard/components/dashboard.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { unAuthGuard } from './core/guard/unAuth/un-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [unAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [unAuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
