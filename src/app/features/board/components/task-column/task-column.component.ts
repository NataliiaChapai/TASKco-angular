import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Task } from '../../models/task.interface';
import { BoardStore } from '../../services/board.store';

@Component({
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskColumnComponent implements OnInit {

  @Input() tasks: Task[] | null = [];
  @Input() color: string | null;
  @Input() filterByName = '';
  @Input() sort = '';
  @Input() direction = 'asc';
  @Input() archive = false;
  @Input() taskType: string = '';
  @Input() i: 0|1|2;
  @Input() canAdd = [false, false, false];
  @Input() done?: boolean = false;

  addForm: FormGroup;
  oldType: string;

  constructor(
    private store: BoardStore,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      content: [null],
    });
  }

  addTask(status: string) {
    const {content} = this.addForm.value;
    if (!content) {
      return;
    }
    const task = {
      name: content,
      status
    }
    this.store.addTask(task).subscribe();
    this.canAdd = [false, false, false];
    this.addForm.reset();
  }

  changeColor(column: string, color: any,) {
    this.store.changeColor(column.split(' ').join('').toLowerCase(), color.target.value).subscribe();
  }

  drop(ev: DragEvent) {
    ev.preventDefault();
    const id = ev.dataTransfer?.getData("text") as string;
    const container = ev.target as HTMLElement;
    const type = container.dataset['type'] as string;
    if (this.oldType === type) {
      return;
    }
    if (type === 'Todo' || type === 'In progress' || type === 'Done') {
      this.store.changeStatus(id, type).subscribe();
    }
  }
}
