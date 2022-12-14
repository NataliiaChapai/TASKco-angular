import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPasswordToggle]'
})
export class PasswordToggleDirective {
  shown = false;

  constructor(private el: ElementRef) {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.innerHTML = '👁';
    span.style.fontSize = '24px';
    span.style.color = 'lightseagreen';
    span.style.position = 'absolute';
    span.style.top = '12px';
    span.style.right = '40px';
    span.style.cursor = 'pointer';
    span.addEventListener('click', () => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }

  toggle(span: HTMLElement) {
    this.shown = !this.shown;
    if (this.shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.style.textDecoration = 'line-through';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.style.textDecoration = 'none';
    }
  }
}
