import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth';
import {Store} from '@ngrx/store';
import {selectRoleData} from '../../../state/role/role.selectors';
import {MENU_LIST} from '../../../data/fake-data';
import {catchError, EMPTY, Subject, takeUntil, tap} from 'rxjs';
import {loadRole} from '../../../state/role/role.actions';
import {StorageService} from '../../../services/storage.service';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ErrorMessage} from '../../../shared/components/error-message/error-message';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ErrorMessage],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);
  private storageService = inject(StorageService);
  private destroy$ = new Subject();
  private store = inject(Store);
  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    userName: [null, Validators.compose([Validators.required])],
    passWord: [null, Validators.compose([Validators.required])]
  })
  roleData = this.store.selectSignal(selectRoleData);

  login() {
    const body = this.loginForm.getRawValue();
    this.authService.login(body)
      .pipe(
        catchError(err => {
          console.log('Sai tài khoản hoặc mật khẩu', err);
          return EMPTY;
        }),
        tap(res => {
          this.authService.setAuthenticated(true);
          this.storageService.setItem('authenticated', res?.token);
          this.store.dispatch(loadRole())
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(
        (res: any) => {
          console.log('Login success', res)
          const listRole = this.roleData();
          const firstMenuItem = this.findFirstMenuItem(listRole);
          if (firstMenuItem) this.router.navigate([firstMenuItem?.url]);
          else alert('Tài khoản không có quyền nào ' + this.authService.getAuthenticated());
        }
      );
  }

  findFirstMenuItem(listRole: any): any{
    return MENU_LIST.find(item =>
      item.role.some(auth => listRole.includes(auth))
    );
  }
}
