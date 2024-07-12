import { JwtModule } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/components/login.component';
import { RegisterComponent } from './modules/auth/register/components/register.component';
import { CoreModule } from './core/core.module';
import { AppLayoutComponent } from './core/layouts/app-layout/app-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../i18n/', '.json');
}

export function tokenGetter() {
  if(typeof localStorage !== 'undefined'){
    return localStorage.getItem("token");
  } else {
    return null;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AppLayoutComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
        defaultLanguage: 'fr',
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.apiUrl],
        disallowedRoutes: [''],
      },
    }),
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
