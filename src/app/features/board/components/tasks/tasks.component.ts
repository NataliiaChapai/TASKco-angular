import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

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
  colorSet = ['white', 'beige', 'yellow', 'orange', 'orangered','lightsalmon',  'lightpink', 'deeppink', 'red', 'purple', 
  '#20b2ab33', 'lightgreen', 'green', 'mediumslateblue', 'blue'];
  todoColor: string;
  inprogressColor: string;
  doneColor: string;
  archiveColor: string;
  oldType: string;
  filterByName = '';
  sort = '';
  direction = 'asc';
  archive = false;

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
    
    this.store.colors$.subscribe(colors => {
      this.todoColor = colors.todo;
      this.inprogressColor = colors.inprogress;
      this.doneColor = colors.done;
      this.archiveColor = colors.archive;
      });
  }

  saveChanges(changes: Partial<Task>, id: string) {
    if (!changes.name) {
      return;
    }
    this.store.saveChanges(id, changes).subscribe();
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

  deleteTask(id: string) {
    this.store.deleteTask(id).subscribe();
  }

  archiveTask(id: string) {
    this.store.changeStatus(id, 'Archive').subscribe();
  }

  changeColor(column: string, color: string,) {
    this.store.changeColor(column, color).subscribe();
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

  addComment(id: string, comment: any) {
    if (!comment.comment) {
      return;
    }
    this.store.addComment(id, comment).subscribe();
  }

  deleteComment(id: string) {
    this.store.deleteComment(id).subscribe();
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

  allowDrop(ev: DragEvent) {
    ev.preventDefault();
  }

  drag(ev: DragEvent, id: string) {
    ev.dataTransfer?.setData("text", id);
    const container = ev.target as HTMLElement;
    this.oldType = container.dataset['type'] as string;
  }

}
