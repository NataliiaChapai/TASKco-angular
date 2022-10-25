import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isLoggedIn$.pipe(map(res => res));
    this.isLoggedOut$ = this.auth.isLoggedOut$.pipe(map(res => res));
  }

}
