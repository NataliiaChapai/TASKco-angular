import { Component, OnInit } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, filter, finalize} from 'rxjs/operators';

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
  isLoaded: boolean;
  filterByName = '';

  constructor(private dashboard: DashboardService, public modal: ModalService) {
    this.isLoaded = false;
    this.boards$ = this.dashboard
    .getBoards()
    .pipe(finalize(() => this.isLoaded = true),
    catchError(err => observableOf([])));
  }

  ngOnInit(): void {}

  deleteBoard(id: string) {
    this.isLoaded = false;
    this.dashboard.deleteBoard(id)
    .subscribe(() => this.boards$ = this.boards$.pipe(filter(board => board[0].id !== id)))
  }

}
