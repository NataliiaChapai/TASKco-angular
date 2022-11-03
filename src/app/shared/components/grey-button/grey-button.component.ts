import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grey-button',
  templateUrl: './grey-button.component.html',
  styleUrls: ['./grey-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreyButtonComponent implements OnInit {
  
  @Input() content: string;
  @Input() type: string;

  constructor() { }

  ngOnInit(): void {
  }

}
