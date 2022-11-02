import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.interface';
import { BoardStore } from '../../services/board.store';

@Component({
  selector: 'app-archive-task',
  templateUrl: './archive-task.component.html',
  styleUrls: ['./archive-task.component.css']
})
export class ArchiveTaskComponent implements OnInit {

  @Input() archiveTasks: Task[] | null = [];
  @Input() filterByName = '';
  @Input() sort = '';
  @Input() direction = 'asc';
  @Input() color: string | null;
  @Input() archive = false;

  constructor(
    private store: BoardStore
  ) { }

  ngOnInit(): void {
  }

  changeColor(column: string, color: any,) {
    this.store.changeColor(column, color.target.value).subscribe();
  }

}
