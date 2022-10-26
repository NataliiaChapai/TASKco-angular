import { Injectable } from '@angular/core';
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
import { Board } from '../models/board.interface';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardStore {
  private subject = new BehaviorSubject<Board[]>([]);

  boards$: Observable<Board[]> = this.subject.asObservable();

  constructor(
    private loader: LoadingService,
    private messages: MessagesService,
    private dashboard: DashboardService
  ) {
    this.loadAllBoards();
  }

  public loadAllBoards() {
    const loadBoards$ = this.dashboard.getBoards().pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not load boards';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(boards => this.subject.next(boards))
    );
    this.loader.showLoaderUntilCompleted(loadBoards$).subscribe();
  }

  updateBoard(id: string, changes: Partial<Board>): Observable<any> {
    const boards = this.subject.getValue();
    const index = boards.findIndex(doard => doard._id == id);
    const updatedBoard: Board = {
      ...boards[index],
      ...changes,
    };
    const updateBoards: Board[] = boards.slice(0);
    updateBoards[index] = updatedBoard;
    this.subject.next(updateBoards);
    return this.dashboard.updateBoard(id, changes).pipe(
      catchError(err => {
        const message = 'Could not save board';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  addBoard(board: Partial<Board>): Observable<any> {
    const boards = this.subject.getValue();
    let updatedBoards: Board[] = [];
    return this.dashboard.addBoard(board).pipe(
      tap(res => (updatedBoards = [...boards, res.board])),
      catchError(err => {
        const message = 'Could not add board';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      finalize(() => this.subject.next(updatedBoards)),
      shareReplay()
    );
  }

  deleteBoard(id: string) {
    const boards = this.subject.getValue();
    const updatedBoards = boards.filter(board => board._id != id);
    this.subject.next(updatedBoards);
    return this.dashboard.deleteBoard(id).pipe(
      catchError(err => {
        const message = 'Could not delete doard';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      shareReplay()
    );
  }
}
