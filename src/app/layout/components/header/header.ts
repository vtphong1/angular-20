import {Component, HostBinding, inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {Store} from '@ngrx/store';
import {selectRoleData} from '../../../state/role/role.selectors';
import {Theme} from '../../../services/theme';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private store = inject(Store);
  data = this.store.selectSignal(selectRoleData);

  private themService = inject(Theme);
  @HostBinding('class.dark') isDark = false;
  private platformId = inject(PLATFORM_ID);
  private renderer = inject(Renderer2);
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.themService.darkModeChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(mode => {
        console.log('This mode', mode);
        this.isDark = mode;
        if (isPlatformBrowser(this.platformId)) {
          if (this.isDark) {
            this.renderer.addClass(document.body, 'dark');
          } else {
            this.renderer.removeClass(document.body, 'dark');
          }
        }
      });
  }
  logOut() {
    this._authService.logOut();
    this._router.navigate(['/auth/login']);
  }

  changeMode() {
    this.themService.toggle()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
