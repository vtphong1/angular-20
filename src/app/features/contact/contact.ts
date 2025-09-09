import {Component, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport, ScrollingModule} from '@angular/cdk/scrolling';
import {SelectService} from '../../services/select';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-contact',
  imports: [ScrollingModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  items: any[] = [];
  page = 1;
  loading = false;

  constructor(private api: SelectService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // this.loading = true;
    this.api.getList(this.page, 0).subscribe(data => {
      this.items = [...this.items, ...data];
      console.log('items', this.items)
      this.loading = false;
    });
  }

  onScroll(index: number) {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end === total && !this.loading) {
      this.page++;
      this.loadData();
    }
  }
}
