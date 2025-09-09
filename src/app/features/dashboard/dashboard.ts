import {Component, inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {SHARED_COMPONENTS, SHARED_DIRECTIVES} from '../../shared/shared';
import {StorageService} from '../../services/storage.service';
import {combineLatest, delay, interval, of, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ...SHARED_DIRECTIVES, ...SHARED_COMPONENTS],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit, OnDestroy{
  private route = inject(Router);
  storageService = inject(StorageService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  person = { name: "John", age: 30 };
  destroy$ = new Subject();
  ngOnInit() {
  }

  logout(): void {
    localStorage.removeItem('token');
    this.route.navigate(['/auth/login']);
  }

  addNewCookie(): void {
    if(this.isBrowser) sessionStorage.setItem('name', 'Phong');
  }

  testEnum(): void {
    let add = myEnum.ADD;
    console.log('enum add', add);
  }

  getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
