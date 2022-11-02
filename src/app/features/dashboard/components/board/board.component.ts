import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Board } from '../../models/board.interface';
import { DashboardStore } from '../../services/dashboard.store';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  boards$: Observable<Board[]>;
  @Input() filterByName = '';
  @Input() sort = '';
  @Input() direction = 'asc';
  showModal = false;
  boardId = '';
  submitted = false;

  constructor(
    public modal: ModalService,
    public store: DashboardStore
  ) {}

  ngOnInit() {
    this.reloadBoards();
  }

  reloadBoards() {
    this.boards$ = this.store.boards$.pipe(map(res => res));
  }

  deleteBoard(id: string) {
    this.store.deleteBoard(id).subscribe();
  }

  editBoard(id: string) {
    this.boardId = id;
    this.modal.showEdit();
  }

  updateBoard(name: any) {
    this.store.updateBoard(this.boardId, name).subscribe(
      () => {
        this.submitted = false;
        this.modal.closeEdit();
      },
      () => (this.submitted = false)
    );
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
}
