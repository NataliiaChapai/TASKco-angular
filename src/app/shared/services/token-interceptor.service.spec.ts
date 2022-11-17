import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { TokenInterceptorService } from './token-interceptor.service';

describe('TokenInterceptorService', () => {
  let service: TokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(TokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add Authorization header', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpTestingController: HttpTestingController) => {
      let response;
      const headers = new HttpHeaders();
      localStorage.setItem('token', JSON.stringify('test'));
      http.get('/dashboard', { headers }).subscribe(res => response = res);
      const req = httpTestingController.expectOne('/dashboard');
      expect(req.request.headers.get('Authorization')).toBeTruthy();
      expect(req.request.headers.get('Authorization')).toBe('Bearer test');
      req.flush(true);
      localStorage.clear();
      httpTestingController.verify();
    }
  ));

  it('Authorization header should be null', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpTestingController: HttpTestingController) => {
      let response;
      const headers = new HttpHeaders();
      http.get('/dashboard', { headers }).subscribe(res => response = res);
      const req = httpTestingController.expectOne('/dashboard');
      expect(req.request.headers.get('Authorization')).toBeFalsy();
      expect(req.request.headers.get('Authorization')).toBe(null);
      req.flush(true);
      httpTestingController.verify();
    }
  ));
});

