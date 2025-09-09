import { Injectable } from '@angular/core';
import {BaseHttpService} from '../../core/bases/base-http.service';
import {HttpClient} from '@angular/common/http';
import {delay, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http);
  }

  getListUser() {
    // return of('Hello user').pipe(delay(3000));
    return throwError(() => new Error('Fake error')).pipe(
      delay(3000)
    );
  }
}
