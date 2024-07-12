import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CoreService } from './services/core/core.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { errorInterceptor, jwtInterceptor } from './interceptors';
import { FeesPipe } from './pipes';


const Modules: any = [
  TranslateModule,
  ProgressSpinnerModule
]

const Pipes: any = [
  FeesPipe
]

@NgModule({
  declarations: [
    ...Pipes,
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
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: (coreService: CoreService) => () => coreService.init(),
      deps: [CoreService],
      multi: true
    }
  ]
})
export class CoreModule { }
