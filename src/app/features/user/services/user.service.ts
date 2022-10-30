import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../models/current-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getCurrentUser() {
    const url = environment.apiUrl + '/users/current';
    return this.http.get<any>(url).pipe(
      map(res => res.user))
  }

  updatePassword(password: Partial<CurrentUser>) {
    const url = environment.apiUrl + '/users/password';
    return this.http.patch<any>(url, password).pipe(
      tap(res => res))
  }

  updateAvatar(avatar: File) {
    let formParams = new FormData();
   formParams.append('avatar', avatar)
    const url = environment.apiUrl + '/users/avatars';
    return this.http.patch<any>(url, formParams).pipe(
      map(res => res.user.avatarURL))
  }

  saveAvatarUrl(avatarURL: string) {
    const url = environment.apiUrl + '/users/google-avatar';
    return this.http.patch<any>(url, {avatarURL}).pipe(
      map(res => res.avatarURL))
  }

}
