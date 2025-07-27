import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {loadRole, loadRoleFailure, loadRoleSuccess} from './role.actions';
import {ROLE_LOAD_EFFECT} from '../../data/fake-data';
import {AuthService} from '../../services/auth';

export class RoleEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  loadRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRole),
      switchMap(() =>
        of(ROLE_LOAD_EFFECT).pipe(
          map((data) => {
            console.log('Load role');
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

