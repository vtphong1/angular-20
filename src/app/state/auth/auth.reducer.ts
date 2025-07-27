import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any;
  isAuthenticated: boolean;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.checkLogin, (state) => ({ ...state, isAuthenticated: true })),
  on(AuthActions.checkLoginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null,
  })),
  on(AuthActions.checkLoginFailure, (state, { error }) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    error,
  }))
);
