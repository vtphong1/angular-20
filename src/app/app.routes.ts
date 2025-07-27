import { Routes } from '@angular/router';
import {authGuard, roleGuard} from './core/guards/auth-guard';
import {LayoutMain} from './layout/layout-main/layout-main';
import {AUTHORIZES} from './data/fake-data';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.routes)
  },
  {
    path: 'dashboard',
    component: LayoutMain,
    loadChildren: () => import('./features/dashboard/dashboard.route').then(m => m.route),
    canActivate: [authGuard, roleGuard],
    data: {
      authorities: [AUTHORIZES.DASHBOARD.DASHBOARD_READ]
    }
  },
  {
    path: 'contact',
    component: LayoutMain,
    loadChildren: () => import('./features/contact/contact.route').then(m => m.contactRoute),
    canActivate: [authGuard, roleGuard],
    data: {
      authorities: [AUTHORIZES.CONTACT.CONTACT_READ]
    }
  },
  {
    path: 'user',
    component: LayoutMain,
    loadChildren: () => import('./features/user/user.route').then(m => m.userRoute),
    canActivate: [authGuard, roleGuard],
    data: {
      authorities: [AUTHORIZES.USER.USER_READ]
    }
  },
  {
    path: 'admin',
    component: LayoutMain,
    loadChildren: () => import('./features/admin/admin.route').then(m => m.adminRoute),
    canActivate: [authGuard, roleGuard],
    data: {
      authorities: [AUTHORIZES.ADMIN.ADMIN_READ]
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  { path: '**', redirectTo: '/dashboard'},
];
