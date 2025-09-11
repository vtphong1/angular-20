import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {loadRole, loadRoleFailure, loadRoleSuccess} from './role.actions';
import {AuthService} from '../../services/auth';

export class RoleEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  loadRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRole),
      switchMap(() =>
        this.authService.loadRole().pipe(
          map((data) => {
            console.log('Load role', data);
            return loadRoleSuccess({ data })
          }),
          catchError((error) => {
            this.authService.logOut();
            return of(loadRoleFailure({ error }))
          })
        )
      )
    )
  );
}

