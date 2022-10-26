import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  tap,
} from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/services/loading.service';

import { Board } from '../../models/board.interface';
import { DashboardService } from '../../services/dashboard.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  boards$: Observable<Board[]>;
  filterByName = '';
  sort = '';
  showModal = false;
  boardId = '';
  submitted = false;
  direction = 'asc';

  constructor(private dashboard: DashboardService, public modal: ModalService, private loader: LoadingService) {}

  ngOnInit(): void {
    this.loader.loadingOn();
    this.boards$ = this.dashboard.getBoards().pipe(
      finalize(() => (this.loader.loadingOff())),
      catchError(err => observableOf([]))
    );
  }

  deleteBoard(id: string) {
    this.loader.loadingOn();
    this.dashboard
      .deleteBoard(id)
      .subscribe(
        () =>
          (this.boards$ = this.boards$.pipe(
            filter(board => board[0]._id !== id),
            finalize(() => this.loader.loadingOff())
          ))
      );
  }

  editBoard(id: string) {
    this.boardId = id;
    this.modal.showEdit();
  }

  updateBoard(name: any) {
    this.dashboard.updateBoard(this.boardId, name).subscribe(
      () => {
        this.submitted = false;
        this.modal.closeEdit();
        this.boards$ = this.boards$.pipe(
          tap(board => {
            if (board[0]._id === this.boardId) {
              board[0].name = name;
            }
          })
        );
      },
      () => (this.submitted = false)
    );
  }
}
