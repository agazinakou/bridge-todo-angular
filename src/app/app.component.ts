import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  userActivity: any;
  userInactive = new Subject<any>();

  constructor(translate: TranslateService, private authService: AuthService){
    if(typeof localStorage !== 'undefined'){
      let language: any = localStorage.getItem('LANGUAGE');
      if(language){
        language = JSON.parse(language);
        translate.use(language.code);
      }
    }

    this.setTimeout();
    this.userInactive.subscribe(async () => {
      if (await this.authService.isAuthenticated()) {
        this.authService.logout();
      }
    });
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 300000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

}
