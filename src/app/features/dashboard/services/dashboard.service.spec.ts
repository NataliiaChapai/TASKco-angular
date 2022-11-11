import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DashboardService } from './dashboard.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

const BOARDS = [
    {
      _id: '633c570cdfc7dbef15ca7957',
      name: 'Project Kapusta',
      description: 'GoIT',
      userId: '632f3ca29e67cccae37ab456',
      taskCount: {
        todo: 1,
        inprogress: 2,
        done: 3,
        archive: 0,
      },
      createdAt: 1664898828405,
    },
    {
      _id: '633c570cdfc7dbef15ca7958',
      name: 'Project TASKco',
      description: 'Epam',
      userId: '632f3ca29e67cccae37ab456',
      taskCount: {
        todo: 1,
        inprogress: 1,
        done: 1,
        archive: 1,
      },
      createdAt: 1664898828303,
    },
  ];

describe('BoardService', () => {
  let service: DashboardService, httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    });
    service = TestBed.inject(DashboardService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all boards', () => {
    service.getBoards().subscribe(boards => {
      expect(boards).toBeTruthy('No boards returned');
      expect(boards.length).toBe(2, 'incorect number of boards');
      const board = boards.find(board => board._id == '633c570cdfc7dbef15ca7958');
      expect(board?.name).toBe('Project TASKco');
    });
    const url = environment.apiUrl + `/boards`;
    const req = httpTestingController.expectOne(url)
    expect(req.request.method).toBe('GET');
    req.flush({boards: Object.values(BOARDS)});
  });

  it('should update the board data', () => {
    const changes  = {
      name: 'Test name',
    }
  service.updateBoard('633c570cdfc7dbef15ca7958', changes).subscribe(task => {
    expect(task._id).toBe('633c570cdfc7dbef15ca7958');
  })
  const url = environment.apiUrl + `/boards/633c570cdfc7dbef15ca7958`;
    const req = httpTestingController.expectOne(url)
    expect(req.request.method).toBe('PUT');
    req.flush({
      ...BOARDS[1],
      ...changes
  })
})

it('should give an error if update board fails', () => {
  const changes  = {
    name: 'Test name',
  }
service.updateBoard('633c570cdfc7dbef15ca7958', changes).subscribe(
  () => fail('The update board operation should have failed'),
  (error: HttpErrorResponse) => {
    expect(error.status).toBe(500);
  }
);
const url = environment.apiUrl + `/boards/633c570cdfc7dbef15ca7958`;
  const req = httpTestingController.expectOne(url)
  expect(req.request.method).toBe('PUT');
  req.flush('Update board failed', {
    status: 500,
    statusText: 'Internal Server Error'
  })
});

it('should add new board', () => {
  const newBoard = {
    name: 'New board',
    description: 'Board description'
  };
  service.addBoard(newBoard).subscribe(board => {
    expect(board).toBeTruthy();
    expect(board.name).toBe('New board');
    expect(board.description).toBe('Board description');
  });
  const url = environment.apiUrl + `/boards`;
  const req = httpTestingController.expectOne(url);
  const boardData = {
    _id: '633c570cdfc7dbef15ca7953',
    name: newBoard.name,
    description: newBoard.description,
    userId: '632f3ca29e67cccae37ab456',
    taskCount: {
      todo: 0,
      inprogress: 0,
      done: 0,
      archive: 0,
    },
    createdAt: new Date,
  };
  expect(req.request.method).toBe('POST');
  req.flush(boardData);
});
  
  afterEach(() => {
    httpTestingController.verify();
  })

});