import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {defer, delay, of, tap, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {StorageService} from './storage.service';
import {USER_ROLE} from '@app/data/fake-data';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private authenticated: boolean = false;
  private router = inject(Router);
  private storageService = inject(StorageService);
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  login(body: any) {
    let validUser = (body['userName'] === 'user' && body['passWord'] === 'user') ||
      (body['userName'] === 'admin' && body['passWord'] === 'admin');
    if (validUser) return of({token: body['userName']});
    else return throwError(() => new Error('Login error')).pipe(
      delay(3000)
    );
  }

  setAuthenticated(authenticated: boolean): void {
    this.authenticated = authenticated;
  }

  getAuthenticated(): boolean {
    return this.authenticated;
  }

  logOut(): void {
    this.router.navigate(['/auth/login']);
    this.storageService.removeItem('token');
    this.setAuthenticated(false);
  }

  checkApiMe() {
    return of(Math.random() > 0.5).pipe(
      tap(res => {
        console.log('Check api me', res);
      })
    );
  }

  loadRole() {
    return defer(() => {
      if (this.isBrowser) {
        const token = this.storageService.getCookie('token');
        const userRole = USER_ROLE.find((item: any) => item.user === token);
        return userRole ? of(userRole.role) : this.failCommon();
      } else {
        return of(null);
      }
    });
  }

  failCommon() {
    return throwError(() => new Error('Lỗi Api')).pipe(
      delay(3000)
    );
  }

}
