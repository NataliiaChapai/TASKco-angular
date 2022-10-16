import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Observable } from 'rxjs';
import { BoardService } from '../../services/board.service';
import { Task } from '../../models/task.interface';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {

  todoTasks$: Observable<Task[]>;
  inProgressTasks$: Observable<Task[]>;
  doneTasks$: Observable<Task[]>;
  archiveTasks$: Observable<Task[]>;
  boardId: string;
  boardName$: Observable<string>;

  constructor(
    private board: BoardService,
    private route: ActivatedRoute,
    private loader: LoadingService
  ) { }

  ngOnInit() {
    this.reloadTasks();
  }

  reloadTasks() {
        this.loader.loadingOn();
    this.route.params.subscribe(params => this.boardId = params['id'])

    const tasks$ = this.board.getAllTasks(this.boardId)
    .pipe(map(tasks => tasks));

    const loadTasks$ = this.loader.showLoaderUntilCompleted(tasks$)

    const name$ = this.board.getBoardName(this.boardId)
    .pipe(map(board => board));
  
    this.todoTasks$ = loadTasks$
    .pipe(map(tasks => tasks.filter(task => task.status === 'Todo')));

    this.inProgressTasks$ = loadTasks$
    .pipe(map(tasks => tasks.filter(task => task.status === 'In progress')));

    this.doneTasks$ = loadTasks$
    .pipe(map(tasks => tasks.filter(task => task.status === 'Done')));

    this.archiveTasks$ = loadTasks$
    .pipe(map(tasks => tasks.filter(task => task.status === 'Archive')));

    this.boardName$ = name$
    .pipe(map(board => board.name))
  }

}
