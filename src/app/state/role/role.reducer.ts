import { createReducer, on } from '@ngrx/store';
import * as RoleActions from './role.actions';

export interface ConfigState {
  data: any;
  loading: boolean;
  error: any;
}

export const initialState: ConfigState = {
  data: null,
  loading: false,
  error: null,
};

export const roleReducer = createReducer(
  initialState,
  on(RoleActions.loadRole, (state) => ({ ...state, loading: true })),
  on(RoleActions.loadRoleSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
  })),
  on(RoleActions.loadRoleFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
