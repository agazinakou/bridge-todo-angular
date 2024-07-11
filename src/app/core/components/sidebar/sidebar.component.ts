import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { CoreService } from '../../services/core/core.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  languages : any = [];
  currentLanguage : any = {};
  user = new User();

  constructor(@Inject(DOCUMENT) private document: Document,
  private translate: TranslateService, private authService: AuthService,
  private coreService: CoreService){
  }

  ngOnInit(): void {
    this.languages = [{
        code: 'fr',
        name: 'Français'
      },{
        code: 'en',
        name: 'English'
      },{
        code: 'es',
        name: 'Espagnol'
      }
    ];
    this.getCurrentLanguage();
    this.coreService.currentUserSubject.subscribe((e) => this.user = e);
  }

  getCurrentLanguage = () => {
    var localStorage = this.document.defaultView?.localStorage;
    if(localStorage){
      let local = localStorage.getItem('LANGUAGE');
      if(local){
        this.choose(JSON.parse(local));
      } else {
        this.choose(this.languages[0]);
      }
    }
  }

  choose = (language: any) => {
    this.currentLanguage = language;
    this.translate.use(language.code);
    var localStorage = this.document.defaultView?.localStorage;
    if(localStorage){
      localStorage.setItem('LANGUAGE', JSON.stringify(language));
    }
  }

  logout = () => {
    this.authService.logout();
  }
}
