import {Injectable, inject, effect, signal, PLATFORM_ID} from '@angular/core';
import { fromEvent, merge, timer } from 'rxjs';
import { tap, switchMapTo, startWith } from 'rxjs/operators';
import {AuthService} from './auth';
import {isPlatformBrowser} from '@angular/common';
import {IDLE_TIMER} from '../data/app.constants';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class IdleService {
  private isIdle = signal(false);
  private idleTimeout = IDLE_TIMER; // 5 phút
  constructor(private authService: AuthService,
              private router: Router){
    this.trackUserActivity();
    this.watchIdleState();
  }

  private trackUserActivity() {
    const platformId = inject(PLATFORM_ID);
    const isBrowser = isPlatformBrowser(platformId);
    if (isBrowser) {
      const userEvents$ = merge(
        fromEvent(window, 'mousemove'),
        fromEvent(window, 'mousedown'),
        fromEvent(window, 'keydown'),
        fromEvent(window, 'touchstart'),
        fromEvent(window, 'scroll')
      );

      // ⏱ Mỗi lần có tương tác → reset timer 5 phút
      userEvents$.pipe(
        startWith(0),
        switchMapTo(timer(this.idleTimeout)),
        tap(() => this.isIdle.set(true))
      ).subscribe();

      // 🔁 Khi có bất kỳ tương tác nào thì reset idle về false
      userEvents$.subscribe(() => {
        if (this.isIdle()) {
          console.log('🔄 Có tương tác, reset idle');
        }
        this.isIdle.set(false);
      });
    }
  }

  private watchIdleState() {
    effect(() => {
      const currentUrl = this.router.url;
      if (this.isIdle()) {
        if (currentUrl !== '/login') {
          console.log('🚪 Không hoạt động trong 5 phút → logout');
          this.authService.logOut();
        }
      }
    });
  }
}
