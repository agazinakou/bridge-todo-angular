import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fees'
})
export class FeesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value;
  }
}
