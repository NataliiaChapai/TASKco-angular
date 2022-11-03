import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {

  @Input() placeholder: string;
  @Input() type: string;
  
  @Output() model = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  passValue(value: string) {
    this.model.emit(value);
  }

}

