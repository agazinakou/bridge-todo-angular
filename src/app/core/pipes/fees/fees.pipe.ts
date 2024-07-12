import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fees'
})
export class FeesPipe implements PipeTransform {

  transform(value: unknown, ..._args: unknown[]): unknown {
    console.log(_args);
    return value;
  }
}
