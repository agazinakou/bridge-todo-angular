import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class unAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const status: any = await this.authService.isAuthenticated();
    if(status){
      this.router.navigate(['/dashboard'])
    }
    console.log(status);
    return !status;
  }
}
