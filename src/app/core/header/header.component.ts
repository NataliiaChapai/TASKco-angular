import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/features/auth/models/user';

import { AuthStore } from 'src/app/features/auth/services/auth.store';
import { DashboardStore } from 'src/app/features/dashboard/services/dashboard.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;
    user$: Observable<User>;
    avatarURL$: Observable<string|null>;

  constructor(
    public store: AuthStore,
    private dashboardStore: DashboardStore,
    private router: Router
  ) { 
    this.isLoggedIn$ = this.store.isLoggedIn$.pipe(map(res => res));
    this.isLoggedOut$ = this.store.isLoggedOut$.pipe(map(res => res));
    this.user$ = this.store.user$.pipe(map(res => res));
    this.avatarURL$ = this.store.user$.pipe(map(res => {
      if(!res.avatarURL && res.email) {
        return './assets/images/avatarka.png';
      }
      return res.avatarURL;
    }));
  }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault();
    this.store.logout();
    // this.dashboardStore.clearData();
    this.router.navigate(['/auth']);
  }

}
