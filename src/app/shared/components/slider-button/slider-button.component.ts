import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-button',
  templateUrl: './slider-button.component.html',
  styleUrls: ['./slider-button.component.css']
})
export class SliderButtonComponent implements OnInit {

  @Input() content: string;

  constructor() { }

  ngOnInit(): void {
  }

}
