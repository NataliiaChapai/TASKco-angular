import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn$: Observable<boolean>;

  constructor( 
    private store: AuthStore,
    private router: Router
     ) {
      this.isLoggedIn$ = this.store.isLoggedIn$.pipe(map(res => res));
     }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.isLoggedIn$)  {
      return true;
    } else {
      this.store.logout();
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
