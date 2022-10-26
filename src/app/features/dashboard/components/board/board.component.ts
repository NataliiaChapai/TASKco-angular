import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';

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
  filterByName = '';
  sort = '';
  showModal = false;
  boardId = '';
  submitted = false;
  direction = 'asc';

  constructor(
    public modal: ModalService,
    private loader: LoadingService,
    public store: DashboardStore
  ) {}

  ngOnInit() {
    this.reloadBoards();
  }

  reloadBoards() {
    this.loader.loadingOn();
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
}
