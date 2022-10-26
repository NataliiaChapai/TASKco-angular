import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Board } from '../models/board.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]> {
    const url = environment.apiUrl + '/boards';
    return this.http.get<any>(url).pipe(
      map(res => res.boards))
  }

  deleteBoard(id: string): Observable<void> {
    const url = environment.apiUrl + `/boards/${id}`;
    return this.http.delete<void>(url)
  }

  addBoard(board: Partial<Board>) {
    const url = environment.apiUrl + `/boards`;
    return this.http.post<any>(url, board).pipe(
      tap(board => board.board))
  }

  updateBoard(id: string, board: Partial<Board>): Observable<Board> {
    const url = environment.apiUrl + `/boards/${id}`;
    return this.http.put<Board>(url, board).pipe(
      tap(board => board))
  }
}
