import {Component, inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {IPagination, IResponse} from './model';
import {
  auditTime,
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  EMPTY, map,
  Observable,
  of, Subject,
  switchMap, takeUntil,
} from 'rxjs';
@Component({
  selector: 'app-base',
  imports: [],
  template: ``,
  styles: ``
})
export class BaseComponent{
  protected title = 'angular-20';
  protected fb = inject(FormBuilder);
  protected paginate: IPagination = {
    page: 0,
    size: 10,
    total: 0
  }
  protected payload = {
    page: 0,
    size: 10,
    total: 10,
    keyword: ''
  };
  pageIndexChange$ = new BehaviorSubject<number>(1);
  pageSizeChange$ = new BehaviorSubject<number>(10);
  keyWord$ = new BehaviorSubject<string>('');
  destroy$ = new Subject();
  searchData() {
    combineLatest([
      this.pageIndexChange$,
      this.pageSizeChange$,
      this.keyWord$
        .pipe(
          debounceTime(100),
          map(keyword => keyword.trim()),
          distinctUntilChanged(),
        )
    ])
      .pipe(
        auditTime(100),
        switchMap(() => this.apiStreamData().pipe(
          catchError(() => {
            console.log('Catch error form base component');
            return EMPTY;
          })
        )),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  apiStreamData<T>(): Observable<IResponse<T>> {
    return of({
      code: '',
      data: [],
      message: ''
    } as IResponse<T>);
  }

  changePage(index: number): void {
    console.log('index change', index);
    this.pageIndexChange$.next(index)
  }

  changeSize(size: number): void {
    console.log('size change', size);
    this.pageSizeChange$.next(size);
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
