import { Injectable } from '@angular/core';
import {delay, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  constructor() { }

  getList(pageIndex: any, pageSize: any) {
    return of([
      {
        name: 'Phong'
      },
      {
        name: 'Nhật Hà'
      }
    ]).pipe(delay(200));
  }
}
