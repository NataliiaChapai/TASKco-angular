import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, filter, finalize, ignoreElements, tap} from 'rxjs/operators';

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
  sort = '';
  showModal = false;
  boardId = '';
  submitted = false;
  direction = 'asc';
 
 

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
    .subscribe(() => this.boards$ = this.boards$.pipe(filter(board => board[0]._id !== id)))
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
          this.boards$ = this.boards$.pipe(tap(board => {
            if (board[0]._id === this.boardId) {
             board[0].name = name;
            }
           }))
        },
        () => (this.submitted = false)
      );
  }



}
