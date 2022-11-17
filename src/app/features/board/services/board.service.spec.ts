import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { BoardService } from './board.service';
import { environment } from 'src/environments/environment';


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

const COLOR_SET = {
  todo: '#000',
  inprogress: '#fff',
  done: '#eaeaea',
  archive: '#555555',
  boardId: '63594d18b67510dcff302408',
};


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
      expect(tasks).toBeTruthy();
      expect(tasks.length).toBe(2);
      const task = tasks.find(task => task._id == '635a3dcbd80cde3360cf6ee8');
      expect(task?.name).toBe('Task 2');
    });
    const url = environment.apiUrl + `/board/63594d18b67510dcff302408`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({ tasks: Object.values(TASKS) });
  });

  it('should update task data', () => {
    const changes = {
      name: 'Test name',
    };
    service.updateTask('635a3dcbd80cde3360cf6ee8', changes).subscribe(task => {
      expect(task._id).toBe('635a3dcbd80cde3360cf6ee8');
    });
    const url = environment.apiUrl + `/board/tasks/635a3dcbd80cde3360cf6ee8`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('PUT');
    req.flush({
      ...TASKS[1],
      ...changes,
    });
  });

  it('should give an error if update task fails', () => {
    const changes = {
      name: 'Test name',
    };
    service.updateTask('635a3dcbd80cde3360cf6ee8', changes).subscribe(
      () => fail('The update task operation should have failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      }
    );
    const url = environment.apiUrl + `/board/tasks/635a3dcbd80cde3360cf6ee8`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('PUT');
    req.flush('Update task failed', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('should retrieve column colors', () => {
    service.getColors('63594d18b67510dcff302408').subscribe(colorSet => {
      expect(colorSet).toBeTruthy();
      expect(colorSet?.todo).toBe('#000');
    });
    const url = environment.apiUrl + `/board/colors/63594d18b67510dcff302408`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(COLOR_SET);
  });

  it('should add new task', () => {
    const newTask = {
      name: 'New task',
      status: 'Done'
    };
    service.addTask('63594d18b67510dcff302408', newTask).subscribe(task => {
      expect(task).toBeTruthy();
      expect(task.name).toBe('New task');
      expect(task.boardId).toBe('63594d18b67510dcff302408');
    });
    const url = environment.apiUrl + `/board/63594d18b67510dcff302408`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({ task: {
      _id: '635a3dcbd80cde3360cf6ee5',
    name: newTask.name,
    status: newTask.status,
    boardId: '63594d18b67510dcff302408',
    comments: [],
    createdAt: new Date,
    }});
  });

  it('should delete the task', () => {
    service.deleteTask('635a3dcbd80cde3360cf6ee9').subscribe();
    const url = environment.apiUrl + `/board/tasks/635a3dcbd80cde3360cf6ee9`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('DELETE');
  });

  it('should update task status', () => {
    const changes = {
      status: 'Done',
    };
    service.updateStatus('635a3dcbd80cde3360cf6ee9', changes).subscribe(task => {
      expect(task._id).toBe('635a3dcbd80cde3360cf6ee9');
    });
    const url = environment.apiUrl + `/board/tasks/635a3dcbd80cde3360cf6ee9`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('PATCH');
    req.flush({
      ...TASKS[0],
      ...changes,
    });
  });

  it('should update column color', () => {
    service.updateColor('63594d18b67510dcff302408', 'inprogress', 'red').subscribe(task => {
      expect(task.boardId).toBe('63594d18b67510dcff302408');
    });
    const url = environment.apiUrl + `/board/colors/63594d18b67510dcff302408`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('PATCH');
    req.flush({
      ...COLOR_SET,
      'inprogress': 'red',
    });
  });

  it('should add new comment', () => {
    const comment = {
      comment: 'New comment'
    }
    service.addComment('635a3dcbd80cde3360cf6ee9', comment).subscribe(task => {
      expect(task).toBeTruthy();
      expect(task.comments.length).toBe(2);
    });
    const url = environment.apiUrl + `/board/comments/635a3dcbd80cde3360cf6ee9`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush({
      ...TASKS[0],
      comments: [
        ...TASKS[0].comments,
        {
          comment,
          time: new Date(),
          _id: '635a3dd2d80cde3360cf6eeg'
        }
      ],
    });
  });

  it('should delete comment', () => {
    service.deleteComment('635a3dcbd80cde3360cf6ee9').subscribe(task => {
      expect(task).toBeTruthy();
      expect(task.comments.length).toBe(0);
    });
    const url = environment.apiUrl + `/board/comments/635a3dcbd80cde3360cf6ee9`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('DELETE');
    req.flush({
      ...TASKS[0],
      comments: [],
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
