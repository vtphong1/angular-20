import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  private darkMode$ = new BehaviorSubject<boolean>(false);

  toggle() {
    this.darkMode$.next(!this.darkMode$.value);
  }

  get darkModeChanges() {
    return this.darkMode$.asObservable();
  }
}
