import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class BoardStore {
  private subject = new BehaviorSubject<Task[]>([]);
 
  tasks$: Observable<Task[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loader: LoadingService,
    private messages: MessagesService,
    private route: ActivatedRoute,
  ) {
    this.loadAllTasks();
  }

  private loadAllTasks() {
    let id;
    this.route.params.subscribe(params => id = params['id']);    
    const url = environment.apiUrl + `/board/${id}`;

    const loadTasks$ = this.http.get<any>(url).pipe(
      map(res => res.tasks),
      catchError(err => {
        const message = 'Could not load tasks';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(tasks => this.subject.next(tasks))
    );
    this.loader.showLoaderUntilCompleted(loadTasks$)
    .subscribe();
  }

  filterByStatus(status: string): Observable<Task[]> {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.status == status))
    );
  }
}
