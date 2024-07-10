import { ResolveFn } from '@angular/router';

export const todoResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
