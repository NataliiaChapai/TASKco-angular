import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
}
