import {AUTHORITIES} from '@shared/models/authorization.constants';

export const AUTHORIZES = {
  DASHBOARD: {
    DASHBOARD_READ: 'DASHBOARD_READ',
    DASHBOARD_UPDATE: 'DASHBOARD_UPDATE',
    DASHBOARD_ADD: 'DASHBOARD_ADD',
    DASHBOARD_DELETE: 'DASHBOARD_DELETE'
  },
  CONTACT: {
    CONTACT_READ: 'CONTACT_READ',
    CONTACT_UPDATE: 'CONTACT_UPDATE',
    CONTACT_ADD: 'CONTACT_ADD',
    CONTACT_DELETE: 'CONTACT_DELETE'
  },
  USER: {
    USER_READ: 'USER_READ',
    USER_UPDATE: 'USER_UPDATE',
    USER_ADD: 'USER_ADD',
    USER_DELETE: 'USER_DELETE'
  },
  ADMIN: {
    ADMIN_READ: 'ADMIN_READ',
    ADMIN_UPDATE: 'ADMIN_UPDATE',
    ADMIN_ADD: 'ADMIN_ADD',
    ADMIN_DELETE: 'ADMIN_DELETE'
  }
}
export const MENU_LIST = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    url: '/dashboard',
    role: [AUTHORIZES.DASHBOARD.DASHBOARD_READ]
  },
  {
    id: 'contact',
    name: 'Contact',
    url: '/contact',
    role: [AUTHORIZES.CONTACT.CONTACT_READ]
  },
  {
    id: 'user',
    name: 'User',
    url: '/user',
    role: [AUTHORIZES.USER.USER_READ]
  },
  {
    id: 'admin',
    name: 'Admin',
    url: '/admin',
    role: [AUTHORIZES.ADMIN.ADMIN_READ]
  }
]


export const USER_ROLE = [
  {
    user: 'user',
    role: [
      AUTHORITIES.DASHBOARD.DASHBOARD_READ,
      AUTHORITIES.DASHBOARD.DASHBOARD_ADD,
      AUTHORITIES.DASHBOARD.DASHBOARD_DELETE,
      AUTHORITIES.DASHBOARD.DASHBOARD_UPDATE,
      // AUTHORITIES.CONTACT.CONTACT_READ,
    ]
  },
  {
    user: 'admin',
    role: [
      AUTHORITIES.DASHBOARD.DASHBOARD_READ,
      AUTHORITIES.DASHBOARD.DASHBOARD_ADD,
      AUTHORITIES.DASHBOARD.DASHBOARD_DELETE,
      AUTHORITIES.DASHBOARD.DASHBOARD_UPDATE,
      AUTHORITIES.CONTACT.CONTACT_READ,
      AUTHORITIES.USER.USER_READ,
      AUTHORITIES.ADMIN.ADMIN_READ
    ]
  }
]

export const USER_LOGIN = [
  {
    username: 'user',
    password: 'user',
  },
  {
    username: 'admin',
    password: 'admin'
  }
]
