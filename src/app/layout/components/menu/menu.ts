import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {MENU_LIST} from '../../../data/fake-data';
import {CommonModule} from '@angular/common';
import {Store} from '@ngrx/store';
import {selectRoleData} from '../../../state/role/role.selectors';
import {HasAnyAuthority} from '../../../shared/directives/has-any-authority';
import {AuthService} from '../../../services/auth';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, HasAnyAuthority],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {
  private router = inject(Router)
  private authService = inject(AuthService);
  listMenu = MENU_LIST;
  goTo(path: string) {
    this.router.navigate([path]);
  }
  logOut(): void {
    this.authService.logOut();
  }
}
