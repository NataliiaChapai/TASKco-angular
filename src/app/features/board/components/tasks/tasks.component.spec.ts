import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { click, TASKS } from 'src/mocks/db-test-data';
import { BoardModule } from '../../board.module';
import { BoardStore } from '../../services/board.store';

import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let el: DebugElement;
  let boardStore: any;

  beforeEach(async () => {
    const boardStoreSpy = jasmine.createSpyObj('BoardStore', [
      'filterByStatus',
      'filterColorsByStatus',
      'saveChanges',
    ]);

    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, BoardModule],
      providers: [
        {
          provide: BoardStore,
          useValue: boardStoreSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
    boardStore = TestBed.inject(BoardStore);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display 3 lists of tasks', () => {
    boardStore.filterByStatus.and.returnValue(of(TASKS));
    fixture.detectChanges();
    const columns = el.queryAll(By.css('.tasks__column'));
    expect(columns.length).toBe(3);
  });

  it('should display only archive tasks when slider button clicked', () => {
    boardStore.filterByStatus.and.returnValue(of(TASKS));
    fixture.detectChanges();
    const slider = el.queryAll(By.css('.right'));
    click(slider[0]);
    fixture.detectChanges();
    const columns = el.queryAll(By.css('.tasks__column'));
    expect(columns.length).toBe(1);
  });
});
