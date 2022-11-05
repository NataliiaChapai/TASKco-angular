import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Task } from '../models/task.interface';
import { Colors } from '../models/colors.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  boardId = ''

  constructor(
    private http: HttpClient,
  ) { }

  getAllTasks(id: string): Observable<Task[]> {
    const url = environment.apiUrl + `/board/${id}`;
    this.boardId = id;
    return this.http.get<any>(url).pipe(map(data => data.tasks), shareReplay());
  }

  getColors(id: string): Observable<Colors> {
    const url = environment.apiUrl + `/board/colors/${id}`;
    return this.http.get<Colors>(url).pipe(map(data => data), shareReplay());
  }

  getBoardName(id: string) {
    const url = environment.apiUrl + `/boards/${id}`;
    return this.http.get<any>(url).pipe(map(data => data.board), shareReplay());
  }

  updateTask(id: string, changes: Partial<Task>) {
    const url = environment.apiUrl + `/board/tasks/${id}`;
    return this.http.put<any>(url, changes);
  }

  addTask(id: string, task: Partial<Task>) {
    const url = environment.apiUrl + `/board/${id}`;
    return this.http.post<any>(url, task).pipe(map(data => data.task), shareReplay());
  }

  deleteTask(id:string) {
    const url = environment.apiUrl + `/board/tasks/${id}`;
    return this.http.delete<any>(url);
  }

  updateStatus(id: string, status: Partial<Task>) {
    const url = environment.apiUrl + `/board/tasks/${id}`;
    return this.http.patch<any>(url, status);
  }

  updateColor(id: string, column: string, color: string) {
    const url = environment.apiUrl + `/board/colors/${id}`;
    return this.http.patch<any>(url, {column, color});
  }

  addComment(id: string, comment: Partial<Task>) {
    const url = environment.apiUrl + `/board/comments/${id}`;
    return this.http.post<any>(url, comment);
  }

  deleteComment(id: string) {
    const url = environment.apiUrl + `/board/comments/${id}`;
    return this.http.delete<any>(url);
  }

}
