import { HttpClient } from '@angular/common/http';
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
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.interface';
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root',
})
export class BoardStore {
  private subject = new BehaviorSubject<Task[]>([]);

  tasks$: Observable<Task[]> = this.subject.asObservable();
  boardId: string;

  constructor(
    private http: HttpClient,
    private loader: LoadingService,
    private messages: MessagesService,
    private route: ActivatedRoute,
    private board: BoardService
  ) {
    this.route.params.subscribe(params => (this.boardId = params['id']));
    this.loadAllTasks();
  }

  private loadAllTasks() {
    const url = environment.apiUrl + `/board/${this.boardId}`;

    const loadTasks$ = this.http.get<any>(url).pipe(
      map(res => res.tasks),
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
    let updatedTasks: Task[];
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

  filterByStatus(status: string): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.status == status))
    );
  }
}
