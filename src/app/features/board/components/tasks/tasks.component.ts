import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

import { BoardService } from '../../services/board.service';
import { Task } from '../../models/task.interface';
import { BoardStore } from '../../services/board.store';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [BoardStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TasksComponent implements OnInit {
  todoTasks$: Observable<Task[]>;
  inProgressTasks$: Observable<Task[]>;
  doneTasks$: Observable<Task[]>;
  archiveTasks$: Observable<Task[]>;
  boardName$: Observable<string>;
  todoColor$: Observable<string>;
  inProgressColor$: Observable<string>;
  doneColor$: Observable<string>;
  archiveColor$: Observable<string>;

  boardId: string;
  canAdd = [false, false, false];
  filterByName = '';
  sort = '';
  direction = 'asc';
  archive = false;

  constructor(
    private board: BoardService,
    private route: ActivatedRoute,
    private store: BoardStore
  ) {}

  ngOnInit() {
    this.reloadTasks();  
  }

  reloadTasks() {
    this.route.params.subscribe(params => (this.boardId = params['id']));

    const name$ = this.board
      .getBoardName(this.boardId)
      .pipe(map(board => board));

    this.todoTasks$ = this.store.filterByStatus('Todo');
    this.inProgressTasks$ = this.store.filterByStatus('In progress');
    this.doneTasks$ = this.store.filterByStatus('Done');
    this.archiveTasks$ = this.store.filterByStatus('Archive');

    this.boardName$ = name$.pipe(map(board => board.name));

    this.todoColor$ = this.store.filterColorsByStatus('todo');
    this.inProgressColor$ = this.store.filterColorsByStatus('inprogress');
    this.doneColor$ = this.store.filterColorsByStatus('done');
    this.archiveColor$ = this.store.filterColorsByStatus('archive');
  }

  saveChanges(changes: Partial<Task>, id: string) {
    if (!changes.name) {
      return;
    }
    this.store.saveChanges(id, changes).subscribe();
  }

  getFilterValue(value: string) {
    this.filterByName = value;
  }

  getSortValue(sort: string) {
    this.sort = sort;
  }

  getDirectionValue(direction: string) {
    this.direction = direction;
  }

  allowDrop(ev: DragEvent) {
    ev.preventDefault();
  }

}
