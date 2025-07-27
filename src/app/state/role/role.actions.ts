import { createAction, props } from '@ngrx/store';

export const loadRole = createAction('[Role] Load');
export const loadRoleSuccess = createAction(
  '[Role] Load Success',
  props<{ data: any }>()
);
export const loadRoleFailure = createAction(
  '[Role] Load Failure',
  props<{ error: any }>()
);
