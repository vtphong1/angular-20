import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, tap, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  private authenticated: boolean = false;
  private router = inject(Router);
  private storageService = inject(StorageService);
  login(){
    return of('You are logged in');
  }

  setAuthenticated(authenticated: boolean): void {
    this.authenticated = authenticated;
  }

  getAuthenticated(): boolean {
    return this.authenticated;
  }

  logOut(): void {
    this.router.navigate(['/auth/login']);
    this.storageService.removeItem('authenticated');
    this.setAuthenticated(false);
  }

  checkApiMe() {
    return of(Math.random() > 0.5).pipe(
      tap(res => {
        console.log('Check api me', res);
      })
    );
  }

}
