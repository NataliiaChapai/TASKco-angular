import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: User) {
    const url = environment.apiUrl + '/auth/register';
    return this.http.post<any>(url, data).pipe(tap(res => res));
  }

  login(data: User) {
    const url = environment.apiUrl + '/auth/login';
    return this.http.post<any>(url, data).pipe(map(res => res));
  }

  logout() {
    const url = environment.apiUrl + '/auth/logout';
    return this.http.get(url);
  }

  sendPassword(email: Partial<User>) {
    const url = environment.apiUrl + '/auth/forgot-password';
    return this.http.patch<any>(url, email).pipe(tap(res => res));
  }
}
