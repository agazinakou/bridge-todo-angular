import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeesPipe } from './pipes/fees/fees.pipe';
import { TranslateModule } from '@ngx-translate/core';

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
})
export class CoreModule { }
