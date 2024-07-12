import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bridge-todo';

  constructor(translate: TranslateService){
    console.log('env', environment);
    if(typeof localStorage !== 'undefined'){
      let language: any = localStorage.getItem('LANGUAGE');
      if(language){
        language = JSON.parse(language);
        translate.use(language.code);
      }
    }
  }

}
