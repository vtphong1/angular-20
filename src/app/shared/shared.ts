import {ConfirmDialog} from './components/confirm-dialog/confirm-dialog';
import {ErrorMessage} from './components/error-message/error-message';
import {TableCommon} from './components/table-common/table-common';
import {HasAnyAuthority} from './directives/has-any-authority';
import {DynamicFormComponent} from './components/dynamic-form-component/dynamic-form-component';
export const SHARED_COMPONENTS = [
  ConfirmDialog,
  ErrorMessage,
  TableCommon,
  DynamicFormComponent
]

export const SHARED_DIRECTIVES = [
  HasAnyAuthority
]

export const SHARED_PIPES = []
