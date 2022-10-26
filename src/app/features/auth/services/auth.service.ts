import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError, filter } from 'rxjs';
import { User } from '../models/user';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoginRes } from '../models/loginRes';
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../models/currentUser';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';

const ANONYMOUS_USER: CurrentUser = {
  email: null,
  avatarUrl: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public subject = new BehaviorSubject<CurrentUser>(ANONYMOUS_USER);

  user$: Observable<CurrentUser> = this.subject
    .asObservable()
    .pipe(filter(user => !!user));
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.email));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(
    map(loggedIn => !loggedIn)
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private messages: MessagesService
  ) {
    const user = localStorage.getItem('user');
    if (user) {
      this.subject.next(JSON.parse(user));
    }
  }

  register(data: User) {
    const url = environment.apiUrl + '/auth/register';
    return this.http.post<any>(url, data).pipe(
      catchError(err => {
        this.messages.showErrors(err);
        return throwError(err);
      }),
      tap(res => {
        this.messages.showSuccess(res.message);
      }),
      shareReplay()
    );
  }

  login(data: User) {
    const url = environment.apiUrl + '/auth/login';
    return this.http.post<LoginRes>(url, data).pipe(
      tap(res => {
        const { token } = res;
        const { user } = res;
        const { email, avatarUrl } = user;
        const currentUser = { email, avatarUrl };
        this.subject.next(currentUser);
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(currentUser));
      }),
      catchError(err => {
        this.messages.showErrors(err);
        return throwError(err);
      }),
      shareReplay()
    );
  }

  logout() {
    this.subject.next(ANONYMOUS_USER);
    const url = environment.apiUrl + '/auth/logout';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return this.http.get(url);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  sendPassword(email: Partial<User>) {
    const url = environment.apiUrl + '/auth/forgot-password';
    return this.http.patch<any>(url, email).pipe(
      catchError(err => {
        this.messages.showErrors('Fill in the email field');
        return throwError(err);
      }),
      tap(res => {
        this.messages.showSuccess(res.message);
      }),
      shareReplay()
    );
  }
}
