import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {RoleEffects} from './state/role/role.effects';
import {roleFeature} from './state/role/role.selectors';
import {appInitProvider, getLocalStorage} from './core/providers/initRoleProvider';
import {authInterceptor} from './core/interceptors/auth-interceptor';
import {authFeature} from './state/auth/auth.selectors';
import {LoginEffects} from './state/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    provideStore({
      [authFeature.name]: authFeature.reducer,
      [roleFeature.name]: roleFeature.reducer,
    }),
    provideEffects([LoginEffects, RoleEffects]),
    appInitProvider,
    getLocalStorage
  ]
};
