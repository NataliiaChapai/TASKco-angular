import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn$: Observable<boolean>;

  constructor( 
    private auth: AuthService,
    private router: Router
     ) {
      this.isLoggedIn$ = this.auth.isLoggedIn$.pipe(map(res => res));
     }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.isLoggedIn$)  {
      return true;
    } else {
      this.auth.logout();
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
