import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreyButtonComponent } from './grey-button.component';

describe('GreyButtonComponent', () => {
  let component: GreyButtonComponent;
  let fixture: ComponentFixture<GreyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreyButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
