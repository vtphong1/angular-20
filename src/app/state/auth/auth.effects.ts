import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {AuthService} from '../../services/auth';
import {checkLoginFailure, checkLoginSuccess, checkLogin} from './auth.actions';
import {loadRole} from '../role/role.actions';

export class LoginEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  checkLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkLogin),
      exhaustMap(() =>
        this.authService.checkApiMe().pipe(
          map((user) => {
            console.log('check login', user);
            if (!user) throw new Error('No login');
            this.authService.setAuthenticated(true)
            return checkLoginSuccess({user})
          }),
          catchError((error) => {
            this.authService.logOut();
            return of(checkLoginFailure({ error }))
          })
        )
      )
    )
  );

  checkLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkLoginSuccess),
      map(() => loadRole())
    )
  );
}

