import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  
  @Input() currentPage: number = 1;
  @Input() total: number = 0;
  @Input() limit: number = 5;
  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];

  ngOnInit(): void {
    let selectedPage = sessionStorage.getItem('selectedPage');

    if (selectedPage) {
      this.currentPage = Number(selectedPage);
      this.changePage.emit(this.currentPage);
    }
    this.setPagination();
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el) => el + start);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['total']) {
      this.total = changes?.['total'].currentValue;
      this.setPagination();
    }
  }

  setPagination() {
    const pageCount = Math.ceil(this.total / this.limit);
    this.pages = this.range(1, pageCount);
  }




}
