import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { CurrentUser } from '../models/current-user';

  const USER: CurrentUser = {
    email: 'test@email.com', 
    avatarURL: '',
    createdAt: '1664898828405'
  }

  describe('UserService', () => {
    let service: UserService, httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve current user', () => {
    service.getCurrentUser().subscribe(user => {
      expect(user).toBeTruthy();
      expect(user.email).toBe('test@email.com');
    });
    const url = environment.apiUrl + `/users/current`;
    const req = httpTestingController.expectOne(url)
    expect(req.request.method).toBe('GET');
    req.flush({user: USER});
  });

  it('should update user password', () => {
    service.updatePassword({password: '22222222'}).subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.message).toBe('Password was updated successfully')
    });
    const url = environment.apiUrl + `/users/password`;
    const req = httpTestingController.expectOne(url)
    expect(req.request.method).toBe('PATCH');
    req.flush({message: 'Password was updated successfully'});
  });

  it('should save user avatar url', () => {
    service.saveAvatarUrl('https://res.cloudinary.com/nataliiachapaigoit/image/upload/v1667395036/avatars/632f3ca29e67cccae37ab456/cjh6lrexjdnqxu5ywyjq.jpg')
    .subscribe(url => {
      expect(url).toBeTruthy();
      expect(url).toBe('https://res.cloudinary.com/nataliiachapaigoit/image/upload/v1667395036/avatars/632f3ca29e67cccae37ab456/cjh6lrexjdnqxu5ywyjq.jpg')
    });
    const url = environment.apiUrl + `/users/google-avatar`;
    const req = httpTestingController.expectOne(url)
    expect(req.request.method).toBe('PATCH');
    req.flush({avatarURL: 'https://res.cloudinary.com/nataliiachapaigoit/image/upload/v1667395036/avatars/632f3ca29e67cccae37ab456/cjh6lrexjdnqxu5ywyjq.jpg'});
  });

  it('should give an error if user is not authorized', () => {
  service.getCurrentUser().subscribe({
    next: () => fail('Unauthorized'),
    error: (error: HttpErrorResponse) => {
      expect(error.status).toBe(401);
    }
  });
  const url = environment.apiUrl + `/users/current`;
    const req = httpTestingController.expectOne(url)
    expect(req.request.method).toBe('GET');
    req.flush('No token', {
      status: 401,
      statusText: 'Unauthorized'
    })
  })

  afterEach(() => {
    httpTestingController.verify();
  })

});
