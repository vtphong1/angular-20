import {APP_INITIALIZER} from '@angular/core';
import {Store} from '@ngrx/store';
import {StorageService} from '../../services/storage.service';
import {checkLogin} from '../../state/auth/auth.actions';

export function preloadStorage(storage: StorageService) {
  return () => storage.getItem('authenticated');
}

export const appInitProvider = {
  provide: APP_INITIALIZER,
  useFactory: (store: Store) => () => {
    store.dispatch(checkLogin());
  },
  deps: [Store],
  multi: true
};

export const getLocalStorage = {
  provide: APP_INITIALIZER,
  useFactory: preloadStorage,
  deps: [StorageService],
  multi: true
}
