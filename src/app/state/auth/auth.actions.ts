import { createAction, props } from '@ngrx/store';

export const checkLogin = createAction('[Auth] Check Login');

export const checkLoginSuccess = createAction(
  '[Auth] Check Login Success',
  props<{ user: any }>()
);

export const checkLoginFailure = createAction(
  '[Auth] Check Login Failure',
  props<{ error: any }>()
);
