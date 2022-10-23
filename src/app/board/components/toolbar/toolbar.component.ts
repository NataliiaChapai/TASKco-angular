import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() boardName$: Observable<string>;
  @Output() filterByName = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {    
  }

  addFilterValue(value: string) {
    this.filterByName.emit(value);
  }

}
