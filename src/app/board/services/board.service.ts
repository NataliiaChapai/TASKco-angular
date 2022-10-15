import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Task } from '../models/task.interface';
import { environment } from 'src/environments/environment';
// import { Board } from 'src/app/dashboard/models/board.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  // boardId: any;
  boardId = ''

  constructor(
    private http: HttpClient,
    // private route: ActivatedRoute,
  ) { 
    // this.boardId = this.getBoardId();
  }

  // getBoardId() {
  //   this.route.params.subscribe(params => this.boardId = params['id'])
  //   console.log(this.boardId);
  // }

  getAllTasks(id: string): Observable<Task[]> {
    const url = environment.apiUrl + `/board/${id}`;
    this.boardId = id;
    return this.http.get<any>(url).pipe(map(data => data.tasks))
  }

  getBoardName(id: string) {
    const url = environment.apiUrl + `/boards/${id}`;
    return this.http.get<any>(url).pipe(map(data => data.board))
  }

}
