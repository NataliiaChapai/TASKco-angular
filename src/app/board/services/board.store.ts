import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';

import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Task } from '../models/task.interface';
import { BoardService } from './board.service';
import { Colors } from '../models/colors.interface';

@Injectable({
  providedIn: 'root',
})
export class BoardStore {
  private subject = new BehaviorSubject<Task[]>([]);
  public colorSubject = new BehaviorSubject<Colors>({
    todo: 'azure',
    inprogress: 'azure',
    done: 'azure',
    archive: 'azure',
  });

  tasks$: Observable<Task[]> = this.subject.asObservable();
  colors$: Observable<Colors> = this.colorSubject.asObservable();
  boardId: string;

  constructor(
    private loader: LoadingService,
    private messages: MessagesService,
    private route: ActivatedRoute,
    private board: BoardService
  ) {
    this.route.params.subscribe(params => (this.boardId = params['id']));
    this.getColors().subscribe();
    this.loadAllTasks();
  }

  private loadAllTasks() {
    const loadTasks$ = this.board.getAllTasks(this.boardId).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not load tasks';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(tasks => this.subject.next(tasks))
    );
    this.loader.showLoaderUntilCompleted(loadTasks$).subscribe();
  }

  getColors(): Observable<Colors> {
    return this.board.getColors(this.boardId).pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not load colors';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(col => this.colorSubject.next(col)),
      shareReplay()
    );
  }

  saveChanges(id: string, changes: Partial<Task>): Observable<any> {
    const tasks = this.subject.getValue();
    const index = tasks.findIndex(task => task._id == id);
    const updatedTask: Task = {
      ...tasks[index],
      ...changes,
    };
    const updateTasks: Task[] = tasks.slice(0);
    updateTasks[index] = updatedTask;
    this.subject.next(updateTasks);
    return this.board.updateBoard(id, changes).pipe(
      catchError(err => {
        const message = 'Could not save task';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  addTask(task: Partial<Task>): Observable<any> {
    const tasks = this.subject.getValue();
    let updatedTasks: Task[] = [];
    return this.board.addTask(this.boardId, task).pipe(
      tap(newTask => (updatedTasks = [...tasks, newTask])),
      catchError(err => {
        const message = 'Could not add task';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      finalize(() => this.subject.next(updatedTasks)),
      shareReplay()
    );
  }

  deleteTask(id: string) {
    const tasks = this.subject.getValue();
    const updatedTasks = tasks.filter(task => task._id != id);
    this.subject.next(updatedTasks);
    return this.board.deleteTask(id).pipe(
      catchError(err => {
        const message = 'Could not delete task';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  changeStatus(id: string, status: string) {
    const tasks = this.subject.getValue();
    const index = tasks.findIndex(task => task._id == id);
    const updatedTask: Task = {
      ...tasks[index],
      ...{ status },
    };
    const updateTasks: Task[] = tasks.slice(0);
    updateTasks[index] = updatedTask;
    this.subject.next(updateTasks);
    return this.board.updateStatus(id, { status }).pipe(
      catchError(err => {
        const message = 'Could not change status';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  changeColor(column: string, color: string) {
    const colorSet = this.colorSubject.getValue();
    const newColor = {
      [column]: color,
    };
    const newColorSet = {
      ...colorSet,
      ...newColor,
    };
    return this.board.updateColor(this.boardId, column, color).pipe(
      catchError(err => {
        const message = 'Could not change color';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      finalize(() => this.colorSubject.next(newColorSet)),
      shareReplay()
    );
  }

  filterByStatus(status: string): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.status == status))
    );
  }
}
