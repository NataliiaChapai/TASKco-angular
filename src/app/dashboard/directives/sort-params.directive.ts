import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appSortParams]',
})
export class SortParamsDirective {
  @Output() param: EventEmitter<any> = new EventEmitter();

  constructor(private element: ElementRef) {}

  @HostListener('click') onClickIcon() {
    this.selectSort(this.element.nativeElement.value);
  }

  selectSort(value: string) {
    switch (value) {
      case 'nameAsc':
        this.param.emit({ direction: 'asc', sort: 'name' });
        break;

      case 'createdAtAsc':
        this.param.emit({ direction: 'asc', sort: 'createdAt' });
        break;

      case 'todoAsc':
        this.param.emit({ direction: 'asc', sort: 'todo' });
        break;

      case 'inprogressAsc':
        this.param.emit({ direction: 'asc', sort: 'inprogress' });
        break;

      case 'doneAsc':
        this.param.emit({ direction: 'asc', sort: 'done' });
        break;

      case 'nameDesc':
        this.param.emit({ direction: 'desc', sort: 'name' });
        break;

      case 'createdAtDesc':
        this.param.emit({ direction: 'desc', sort: 'createdAt' });
        break;

      case 'todoDesc':
        this.param.emit({ direction: 'desc', sort: 'todo' });
        break;

      case 'inprogressDesc':
        this.param.emit({ direction: 'desc', sort: 'inprogress' });
        break;

      case 'doneDesc':
        this.param.emit({ direction: 'desc', sort: 'done' });
        break;
    }
  }
}
