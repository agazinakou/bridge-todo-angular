import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/components/login.component';
import { RegisterComponent } from './modules/auth/register/components/register.component';
import { unAuthGuard } from './core/guard/unAuth/un-auth.guard';
import { authGuard } from './core/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [unAuthGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [unAuthGuard],
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    enableTracing: false,
    onSameUrlNavigation: "reload"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
