import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appColorFill]'
})
export class ColorFillDirective {

  @Input('appColorFill') color: string | null;

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = this.color;
  }
}
