import { Component, OnInit } from '@angular/core';
import { filter, Observable, pipe } from 'rxjs';
import { User } from 'src/app/features/auth/models/user';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { map } from 'rxjs';
import { CurrentUser } from 'src/app/features/auth/models/currentUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;
    user$: Observable<CurrentUser>;
    avatarUrl$: Observable<string|null>;

  constructor(
    public auth: AuthService
  ) { 
    this.isLoggedIn$ = this.auth.isLoggedIn$.pipe(map(res => res));
    this.isLoggedOut$ = this.auth.isLoggedOut$.pipe(map(res => res));
    this.user$ = this.auth.user$.pipe(map(res => res));
    this.avatarUrl$ = this.auth.user$.pipe(map(res => {
      if(!res.avatarUrl && res.email) {
        return './assets/images/avatarka.png';
      }
      return res.avatarUrl;
    }));
  }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
  }

}
