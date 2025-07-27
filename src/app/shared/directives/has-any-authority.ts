import {Directive, inject, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectRoleData} from '../../state/role/role.selectors';

@Directive({
  selector: '[hasAnyAuthority]',
  standalone: true
})
export class HasAnyAuthority {
  private templateRef = inject(TemplateRef<any>);
  private viewContainerRef = inject(ViewContainerRef);
  private store = inject(Store);
  private listRole = this.store.selectSignal(selectRoleData); // signal của quyền user
  private authorities: string[] = [];

  @Input()
  set hasAnyAuthority(value: string[] | string | any) {
    this.authorities = typeof value === 'string' ? [value] : value ?? [];
    this.updateView();
  }

  private updateView(): void {
    this.viewContainerRef.clear();

    const userRoles = this.listRole(); // lấy quyền từ store
    const matched = this.authorities.some(auth => userRoles?.includes(auth));

    if (matched || this.authorities.length === 0) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
