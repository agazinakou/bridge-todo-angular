import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bridge-todo';

  constructor(translate: TranslateService){
    if(typeof localStorage !== 'undefined'){
      let language: any = localStorage.getItem('LANGUAGE');
      if(language){
        language = JSON.parse(language);
        translate.use(language.code);
      }
    }
  }

}
