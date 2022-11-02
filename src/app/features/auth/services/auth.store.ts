import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, filter } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

import { MessagesService } from 'src/app/shared/services/messages.service';
import { AuthService } from './auth.service';
import { User } from '../models/user';

const ANONYMOUS_USER: User = {
  email: '',
  avatarURL: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  public subject = new BehaviorSubject<User>(ANONYMOUS_USER);

  user$: Observable<User> = this.subject
    .asObservable()
    .pipe(filter(user => !!user));
    
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  
  constructor(private auth: AuthService, private messages: MessagesService) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user.email));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(
    map(loggedIn => !loggedIn)
  );
    
    const user = localStorage.getItem('user');
    if (user) {
      this.subject.next(JSON.parse(user));
    }
  }

  register(data: User): Observable<any> {
    return this.auth.register(data).pipe(
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
    return this.auth.login(data).pipe(
      tap(res => {
        const { token } = res;
        const { user } = res;
        const { email, avatarURL } = user;
        const currentUser = { email, avatarURL };
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return this.auth.logout();
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  sendPassword(email: Partial<User>) {
    return this.auth.sendPassword(email).pipe(
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
