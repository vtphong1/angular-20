import { createFeature } from '@ngrx/store';
import {roleReducer} from './role.reducer';

export const roleFeature = createFeature({
  name: 'role',
  reducer: roleReducer,
});

export const selectRoleData = roleFeature.selectData;
export const selectRoleLoading = roleFeature.selectLoading;
export const selectRoleError = roleFeature.selectError;
