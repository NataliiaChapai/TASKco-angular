import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AuthStore } from '../auth/services/auth.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(
    public store: AuthStore,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.isLoggedIn$.pipe(map(res => res));
    this.isLoggedOut$ = this.store.isLoggedOut$.pipe(map(res => res));
  }

}
