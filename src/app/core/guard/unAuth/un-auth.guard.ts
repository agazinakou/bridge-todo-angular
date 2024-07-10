import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class unAuthGuard  {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }

}
