import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BoardService } from '../../services/board.service';
import { Task } from '../../models/task.interface';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { BoardStore } from '../../services/board.store';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [BoardStore],
})

export class TasksComponent implements OnInit {
  todoTasks$: Observable<Task[]>;
  inProgressTasks$: Observable<Task[]>;
  doneTasks$: Observable<Task[]>;
  archiveTasks$: Observable<Task[]>;
  boardId: string;
  boardName$: Observable<string>;
  canAddTodo = false;
  canAdd = [false, false, false];

  constructor(
    private board: BoardService,
    private route: ActivatedRoute,
    private loader: LoadingService,
    private store: BoardStore
  ) {}

  ngOnInit() {
    this.reloadTasks();
  }

  reloadTasks() {
    this.loader.loadingOn();

    this.route.params.subscribe(params => (this.boardId = params['id']));

    const name$ = this.board
      .getBoardName(this.boardId)
      .pipe(map(board => board));

    this.todoTasks$ = this.store.filterByStatus('Todo');

    this.inProgressTasks$ = this.store.filterByStatus('In progress');

    this.doneTasks$ = this.store.filterByStatus('Done');

    this.archiveTasks$ = this.store.filterByStatus('Archive');

    this.boardName$ = name$.pipe(map(board => board.name));
  }

  saveChanges(changes: Partial<Task>, id: string) {
    if (!changes.name) {
      return;
    }
    this.store.saveChanges(id, changes).subscribe();
  }

  addTask(changes: Partial<Task>, status: string) {
    const task = {
      ...changes,
      status
    }
    this.store.addTask(task).subscribe();
    this.canAdd = [false, false, false];
  }

  deleteTask(id: string) {
    this.store.deleteTask(id).subscribe();
  }
}
