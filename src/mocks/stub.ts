import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-form',
  template: `
  <div class="password-wrapper">
    <input 
        appPasswordToggle
        type="password">                
    </div>
  `
})
export class UserFormStubComponent {}

@Component({
    selector: 'app-slider-button',
    template: `
    <div class="slider__btn">{{content}}</div>
    `
  })
export class SliderButtonStubComponent {
    @Input() content: string;
}