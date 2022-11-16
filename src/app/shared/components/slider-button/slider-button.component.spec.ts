import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderButtonStubComponent } from 'src/mocks/stub';

describe('SliderButtonComponent', () => {
  let fixture: ComponentFixture<SliderButtonStubComponent>;
  let component: SliderButtonStubComponent;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderButtonStubComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderButtonStubComponent);
    component = fixture.componentInstance;
    component.content = 'btn';
    fixture.detectChanges();
    el = fixture.debugElement;
  });
  
  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should add div content', () => {
    const button= el.nativeElement.querySelector('div');
    expect(button.innerText).toBe('btn');
  });
});
