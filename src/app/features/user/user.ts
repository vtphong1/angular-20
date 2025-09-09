import {Component, inject} from '@angular/core';
import {BaseComponent} from '../../core/bases/base-component';
import {catchError, delay, EMPTY, Observable, tap} from 'rxjs';
import {UserService} from './user-service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class User extends BaseComponent{
  formGroup = this.fb.group({});
  private userService = inject(UserService);
  arr = [1,2,3,4,5];

  ngOnInit() {
    this.searchData();
  }
  override apiStreamData(): Observable<any> {
    return this.userService.getListUser()
      .pipe(
        tap(res => {
          console.log('Res data call api search', res)
        }),
      )
  }
}
