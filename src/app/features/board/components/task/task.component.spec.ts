import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { TASKS } from 'src/db-test-data';
import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let el: DebugElement;
  ;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule, PipesModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the task list', () => {
    component.tasks = TASKS;
    fixture.detectChanges();
    const tasks = el.queryAll(By.css('.tasks__item'));
    expect(tasks).toBeTruthy();
    expect(tasks.length).toBe(5);
  });

  it('should display the first task', () => {
    component.tasks = TASKS;
    fixture.detectChanges();
    const task = component.tasks[0]
    const card = el.query(By.css('.tasks__item:first-child'));
    const name = card.query(By.css('h2'))
    expect(card).toBeTruthy();
    expect(name.nativeElement.textContent).toBe(task.name);
  });
});
