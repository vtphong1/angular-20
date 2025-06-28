import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCommon } from './table-common';

describe('TableCommon', () => {
  let component: TableCommon;
  let fixture: ComponentFixture<TableCommon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCommon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCommon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
