import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { User } from '../models/user';

  const USER: User = {
    email: 'test@email.com', 
    password: '11111111',
  }

  const USER_DATA = {
    email: 'test@email.com', 
    password: '11111111',
    avatarURL: null,
    createdAt: new Date()
  }

describe('AuthService', () => {
  let service: AuthService, httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register user', () => {
    service.register(USER).subscribe(user => {
      expect(user).toBeTruthy();
    });
    const url = environment.apiUrl + `/auth/register`;
    const req = httpTestingController.expectOne(url)
    expect(req.request.method).toBe('POST');
  });

  it('should login user', () => {
    service.login(USER).subscribe(user => {
      expect(user).toBeTruthy();
    });
    const url = environment.apiUrl + `/auth/login`;
    const req = httpTestingController.expectOne(url)
    expect(req.request.method).toBe('POST');
    req.flush(USER_DATA);
  });

  it('should logout user', () => {
    service.logout().subscribe(user => {
      expect(user).toBeTruthy();
    });
    const url = environment.apiUrl + `/auth/logout`;
    const req = httpTestingController.expectOne(url)
    expect(req.request.method).toBe('GET');
  });

  it('should send new password', () => {
    service.sendPassword({email: 'test@email.com'}).subscribe(user => {
      expect(user).toBeTruthy();
    });
    const url = environment.apiUrl + `/auth/forgot-password`;
    const req = httpTestingController.expectOne(url)
    expect(req.request.method).toBe('PATCH');
    req.flush('New passpord sent to test@email.com email address');
  });

  it('should give an error if user data is wrong', () => {
  service.login(USER).subscribe({
    next: () => fail('The login operation should have failed'),
    error: (error: HttpErrorResponse) => {
      expect(error.status).toBe(400);
    }
  });
  const url = environment.apiUrl + `/auth/login`;
    const req = httpTestingController.expectOne(url)
    expect(req.request.method).toBe('POST');
    req.flush('Login failed', {
      status: 400,
      statusText: 'Bad request'
    })
  })

  afterEach(() => {
    httpTestingController.verify();
  })

});
