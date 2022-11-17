import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, shareReplay, tap, throwError } from 'rxjs';

import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { CurrentUser } from '../models/current-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  defaultUser = {
    email: '',
    avatarURL: '',
    createdAt: ''
  }

  private subject = new BehaviorSubject<CurrentUser>(this.defaultUser)

  currentUser$: Observable<CurrentUser> = this.subject.asObservable();

  constructor(
    private user: UserService,
    private messages: MessagesService,
    private loader: LoadingService
  ) { 
    if (localStorage.getItem('user')) {
      this.loadCurrentUser(); 
    } 
  }

  loadCurrentUser() {
    const loadUser$ = this.user.getCurrentUser().pipe(
      map(res => res),
      catchError(err => {
        const message = 'Could not load user data';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(user => this.subject.next(user))
    );
    this.loader.showLoaderUntilCompleted(loadUser$).subscribe();
  }

  updateAvatar(avatar: File): Observable<Partial<CurrentUser>> {
    const user = this.subject.getValue();
    let updateUser: CurrentUser = this.defaultUser;
    return this.user.updateAvatar(avatar).pipe(
      catchError(err => {
        const message = 'Could not update avatar';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(res => updateUser = {...user, avatarURL: res}),
      finalize(() => this.subject.next(updateUser)),
      shareReplay()
    );
  }

  updatePassword(password: Partial<CurrentUser>) {
    return this.user.updatePassword(password).pipe(
      catchError(err => {
        const message = 'Could not change password';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap(res => {
        this.messages.showSuccess(res.message);
      }),
      shareReplay()
    );
  }

  saveAvatarUrl(avatarURL: string) {
    const user = this.subject.getValue();
    if (!user.avatarURL) {
    const updateUser = {
      ...user,
      avatarURL
    }
    this.subject.next(updateUser);
    return this.user.saveAvatarUrl(avatarURL).pipe(
      catchError(err => {
        const message = 'Could not save url';
        console.log(message, err);
        return throwError(err);
      }),
      shareReplay()
    )};
  }

  clearUserData() {
    this.subject.next(this.defaultUser)
  }
}
