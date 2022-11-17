import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Task } from '../../models/task.interface';
import { BoardStore } from '../../services/board.store';

@Component({
  selector: 'app-archive-task',
  templateUrl: './archive-task.component.html',
  styleUrls: ['./archive-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveTaskComponent implements OnInit {

  @Input() archiveTasks: Task[] | null = [];
  @Input() filterByName = '';
  @Input() sort = '';
  @Input() direction = 'asc';
  @Input() color: string | null;

  constructor(
    private store: BoardStore
  ) { }

  ngOnInit(): void {
  }

  changeColor(column: string, color: any,) {
    this.store.changeColor(column, color.target.value).subscribe();
  }

}
