import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../../features/auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
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
          this.authService.logout();
          this.router.navigate(['/auth']);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
