import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor() { }

  init = () => {
    return new Promise<void>((resolve, reject) => {
      resolve();
    });
  }
}
