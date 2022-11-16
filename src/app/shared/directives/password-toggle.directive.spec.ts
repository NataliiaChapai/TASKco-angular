import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormStubComponent } from 'src/mocks/stub';
import { PasswordToggleDirective } from './password-toggle.directive';

describe('PasswordToggleDirective', () => {
  let fixture: ComponentFixture<UserFormStubComponent>;
  let component: UserFormStubComponent;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormStubComponent, PasswordToggleDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });
  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should change input type', () => {
    const input = el.nativeElement.querySelector('input');
    const toggle = el.nativeElement.querySelector('span');

    toggle.click();
    fixture.detectChanges();

    expect(input.type).toBe('text');
  });
});
