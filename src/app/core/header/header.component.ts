import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/features/auth/models/user';

import { AuthStore } from 'src/app/features/auth/services/auth.store';
import { DashboardStore } from 'src/app/features/dashboard/services/dashboard.store';
import { UserStore } from 'src/app/features/user/services/user.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;
    user$: Observable<User>;
    avatarURL: string;

  constructor(
    public store: AuthStore,
    private user: UserStore,
    private router: Router
  ) { 
    this.isLoggedIn$ = this.store.isLoggedIn$.pipe(map(res => res));
    this.isLoggedOut$ = this.store.isLoggedOut$.pipe(map(res => res));
    this.user$ = this.store.user$.pipe(map(res => res));
    this.user.currentUser$.subscribe(res => {
      if(!res.avatarURL) {
        this.avatarURL = './assets/images/avatarka.png';
      }
      this.avatarURL = res.avatarURL;
    });
  }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault();
    this.store.logout();
    this.user.clearUserData();
    this.router.navigate(['/auth']);
  }

}
