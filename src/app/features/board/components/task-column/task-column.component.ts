import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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

  oldType: string;

  constructor(
    private store: BoardStore
  ) { }

  ngOnInit(): void {
  }

  addTask(changes: Partial<Task>, status: string) {
    if (changes.name === '') {
      return;
    }
    const task = {
      ...changes,
      status
    }
    this.store.addTask(task).subscribe();
    this.canAdd = [false, false, false];
  }

  changeColor(column: string, color: any,) {
    this.store.changeColor(column, color.target.value).subscribe();
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
