import { Component, OnInit } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, filter, finalize, tap } from 'rxjs/operators';

import { Board } from '../../models/board.interface';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  boards$: Observable<Board[]>;
  isLoaded: boolean;
  filterByName = '';

  constructor(private dashboard: DashboardService) {
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
