import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Board } from '../../models/board.interface';
import { DashboardStore } from '../../services/dashboard.store';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {

  @Input() filterByName = '';
  @Input() sort = '';
  @Input() direction = 'asc';

  boards$: Observable<Board[]>;
  showModal = false;
  showAddModal = false;
  boardId = '';
  submitted = false;
  toConfirm = false;

  constructor(
    public store: DashboardStore
  ) {}

  ngOnInit() {
    this.reloadBoards();
  }

  reloadBoards() {
    this.boards$ = this.store.boards$.pipe(map(res => res));
  }

  toDelete(id: string) {
    this.toConfirm = true;
    this.boardId = id;
  }

  deleteBoard(confirmation: boolean) {
    if (confirmation) {
      this.store.deleteBoard(this.boardId).subscribe();
    }
    this.toConfirm = false;    
    this.boardId = ''
  }

  editBoard(id: string) {
    this.boardId = id;
    this.showModal = true;
  }

  updateBoard(name: Partial<Board>) {
    this.store.updateBoard(this.boardId, name).subscribe({
      next: () => {
        this.submitted = false;
        this.showModal = false;
        this.boardId = '';
      },
      error: () => (this.submitted = false)
    });
  }

  addBoard(data: Partial<Board>) {
    this.submitted = true;
    this.store.addBoard(data).subscribe({
      next: () => {
        this.submitted = false;
        this.showAddModal = false;
      },
      error: () => (this.submitted = false),
    });
  }

}
