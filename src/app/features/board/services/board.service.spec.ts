import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BoardService } from './board.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

const TASKS = [
    {
      _id: '635a3dcbd80cde3360cf6ee9',
      name: 'Task 1',
      status: 'Todo',
      boardId: '63594d18b67510dcff302408',
      comments: [
        {
          comment: 'Comment',
          time: 1666858450000,
          _id: '635a3dd2d80cde3360cf6eef',
        },
      ],
      createdAt: 1666858443431,
    },
    {
      _id: '635a3dcbd80cde3360cf6ee8',
      name: 'Task 2',
      status: 'Archive',
      boardId: '63594d18b67510dcff302408',
      comments: [
        {
          comment: 'comment',
          time: 1666858450049,
          _id: '635a3dd2d80cde3360cf6eef',
        },
      ],
      createdAt: 1666858443572,
    },
  ];

describe('BoardService', () => {
  let service: BoardService, httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoardService],
    });
    service = TestBed.inject(BoardService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all tasks', () => {
    service.getAllTasks('63594d18b67510dcff302408').subscribe(tasks => {
      expect(tasks).toBeTruthy('No tasks returned');
      expect(tasks.length).toBe(2, 'incorect number of tasks');
      const task = tasks.find(task => task._id == '635a3dcbd80cde3360cf6ee8');
      expect(task?.name).toBe('Task 2');
    });
    const url = environment.apiUrl + `/board/63594d18b67510dcff302408`;
    const req = httpTestingController.expectOne(url)
    expect(req.request.method).toBe('GET');
    req.flush({tasks: Object.values(TASKS)});
  });

  it('should save the task data', () => {
    const changes  = {
      name: 'Test name',
    }
  service.updateTask('635a3dcbd80cde3360cf6ee8', changes).subscribe(task => {
    expect(task._id).toBe('635a3dcbd80cde3360cf6ee8');
  })
  const url = environment.apiUrl + `/board/tasks/635a3dcbd80cde3360cf6ee8`;
    const req = httpTestingController.expectOne(url)
    expect(req.request.method).toBe('PUT');
    req.flush({
      ...TASKS[1],
      ...changes
  })
})

it('should give an error if update task fails', () => {
  const changes  = {
    name: 'Test name',
  }
service.updateTask('635a3dcbd80cde3360cf6ee8', changes).subscribe(
  () => fail('The update task operation should have failed'),
  (error: HttpErrorResponse) => {
    expect(error.status).toBe(500);
  }
);
const url = environment.apiUrl + `/board/tasks/635a3dcbd80cde3360cf6ee8`;
  const req = httpTestingController.expectOne(url)
  expect(req.request.method).toBe('PUT');
  req.flush('Update task failed', {
    status: 500,
    statusText: 'Internal Server Error'
  })
})

  afterEach(() => {
    httpTestingController.verify();
  })

});
