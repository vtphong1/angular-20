import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth';
import {Store} from '@ngrx/store';
import {selectRoleData} from '../../state/role/role.selectors';

export const authGuard: CanActivateFn =(route, state) => {
  const authService = inject(AuthService);
  return authService.getAuthenticated();
};

export const roleGuard: CanActivateFn =(route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  const listRole = store.selectSignal(selectRoleData)() || [];
  const authorities = route.data['authorities'] || [];

  const checkRole = authorities?.some((item: string) => listRole?.includes(item));

  if (!checkRole) return router.createUrlTree(['/auth/login']);
  return checkRole;
}
