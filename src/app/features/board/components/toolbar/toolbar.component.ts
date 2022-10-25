import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  sortBy = '';

  @Input() boardName$: Observable<string>;
  @Output() filterByName = new EventEmitter<string>();
  @Output() sort = new EventEmitter<string>();
  @Output() direction = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {    
  }

  addFilterValue(value: string) {
    this.filterByName.emit(value);
  }
  
  addSortValue(value: string) {
    this.sort.emit(value);
  }

  addDirectionValue(value: string) {
    this.direction.emit(value);
  }


}
