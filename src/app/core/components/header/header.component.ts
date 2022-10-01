import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { map } from 'rxjs';
import { CurrentUser } from 'src/app/auth/models/currentUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;
    user$: Observable<CurrentUser>;

  constructor(
    public auth: AuthService
  ) { 
    this.isLoggedIn$ = this.auth.isLoggedIn$.pipe(map(res => res));
    this.isLoggedOut$ = this.auth.isLoggedOut$.pipe(map(res => res));
    this.user$ = this.auth.user$.pipe(map(res => {
      console.log(res);
      
      return res}));
  }

  ngOnInit(): void {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
  }

}
