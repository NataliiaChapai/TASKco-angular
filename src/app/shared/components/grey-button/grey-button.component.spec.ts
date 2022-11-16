import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreyButtonStubComponent } from 'src/mocks/stub';

describe('GreyButtonComponent', () => {
  let fixture: ComponentFixture<GreyButtonStubComponent>;
  let component: GreyButtonStubComponent;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GreyButtonStubComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreyButtonStubComponent);
    component = fixture.componentInstance;
    component.content = 'btn';
    component.type = 'submit'
    fixture.detectChanges();
    el = fixture.debugElement;
  });
  
  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should add button content', () => {
    const button= el.nativeElement.querySelector('button');
    expect(button.innerText).toBe('btn');
  });

  it('should change button type', () => {
    const button= el.nativeElement.querySelector('button');
    expect(button.type).toBe('submit');
  });
});
