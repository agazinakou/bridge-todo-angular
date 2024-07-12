import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AuthService } from './core/services/auth/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  userActivity: any;
  userInactive = new Subject<any>();

  event: any;

  constructor(translate: TranslateService, private router: Router,
    private authService: AuthService, private location: Location){
    if(typeof localStorage !== 'undefined'){
      let language: any = localStorage.getItem('LANGUAGE');
      if(language){
        language = JSON.parse(language);
        translate.use(language.code);
      }
    }
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

}
