import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthStore } from 'src/app/features/auth/services/auth.store';


@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private store: AuthStore,
    private router: Router
    ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.store.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.store.logout();
          this.router.navigate(['/auth']);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
