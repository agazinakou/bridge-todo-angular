import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeesPipe } from './pipes/fees/fees.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { CoreService } from './services/core/core.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './interceptors/jwt/jwt.interceptor';

const Modules: any = [
  TranslateModule
]

const Pipes: any = [
  FeesPipe
]

@NgModule({
  declarations: [
    ...Pipes
  ],
  imports: [
    CommonModule,
    ...Modules,
  ],
  exports: [
    ...Pipes,
    ...Modules,
  ],
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: (coreService: CoreService) => () => coreService.init(),
      deps: [CoreService],
      multi: true
    },
  ]
})
export class CoreModule { }
