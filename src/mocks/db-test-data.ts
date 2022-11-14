import { User } from '../app/features/auth/models/user';
import { Colors } from '../app/features/board/models/colors.interface';
import { Board } from '../app/features/dashboard/models/board.interface';
import { Task } from '../app/features/board/models/task.interface';
import { CurrentUser } from '../app/features/user/models/current-user';

export const USER: User = {
  email: 'test@email.com',
  password: '11111111',
};

export const TASKS: Task[] = [
  {
    _id: '635a3dcbd80cde3360cf6ee9',
    name: 'Task 1',
    status: 'Todo',
    boardId: '63594d18b67510dcff302408',
    comments: [
      {
        comment: 'Comment',
        time: '1666858450000',
        _id: '635a3dd2d80cde3360cf6eef',
      },
    ],
    createdAt: '1666858443431',
  },
  {
    _id: '635a3dcbd80cde3360cf6ee8',
    name: 'Task 2',
    status: 'Archive',
    boardId: '63594d18b67510dcff302408',
    comments: [
      {
        comment: 'comment',
        time: '1666858450049',
        _id: '635a3dd2d80cde3360cf6eef',
      },
    ],
    createdAt: '1666858443572',
  },
  {
    _id: '635a3dcbd80cde3360cf6ee1',
    name: 'Task 3',
    status: 'In progress',
    boardId: '63594d18b67510dcff302408',
    comments: [
      {
        comment: 'Comment',
        time: '1666858453300',
        _id: '635a3dd2d80cde3360cf6ee3',
      },
    ],
    createdAt: '1666858411431',
  },
  {
    _id: '635a3dcbd80cde3360cf6ee2',
    name: 'Task 4',
    status: 'Done',
    boardId: '63594d18b67510dcff302408',
    comments: [
      {
        comment: 'Comment',
        time: '1666858453000',
        _id: '635a3dd2d80cde3360cf6e0f',
      },
    ],
    createdAt: '1666858143431',
  },
  {
    _id: '635a3dcbd80cde3360cf6ee4',
    name: 'Task 5',
    status: 'Todo',
    boardId: '63594d18b67510dcff302408',
    comments: [
      {
        comment: 'Comment',
        time: '1666858460000',
        _id: '635a3dd2d80cde3360cf6eef',
      },
    ],
    createdAt: '1666858443400',
  },
];

export const COLOR_SET: Colors = {
  todo: '#000',
  inprogress: '#fff',
  done: '#eaeaea',
  archive: '#555555',
};

export const BOARDS: Board[] = [
  {
    _id: '633c570cdfc7dbef15ca7957',
    name: 'Project Kapusta',
    description: 'GoIT',
    userId: '632f3ca29e67cccae37ab456',
    taskCount: {
      todo: '1',
      inprogress: '2',
      done: '3',
      archive: '0',
    },
    createdAt: '1664898828405',
  },
  {
    _id: '633c570cdfc7dbef15ca7958',
    name: 'Project TASKco',
    description: 'Epam',
    userId: '632f3ca29e67cccae37ab456',
    taskCount: {
      todo: '1',
      inprogress: '1',
      done: '1',
      archive: '1',
    },
    createdAt: '1664898828303',
  },
  {
    _id: '633c570cdfc7dbef15ca0258',
    name: 'Project',
    description: 'IT',
    userId: '632f3ca29e67cccae37ab432',
    taskCount: {
      todo: '6',
      inprogress: '1',
      done: '3',
      archive: '1',
    },
    createdAt: '1664898829903',
  },
  {
    _id: '633c570cdfc7dbef15ca7998',
    name: 'Project 1',
    description: 'Epam',
    userId: '632f3ca29e67cccae37ab432',
    taskCount: {
      todo: '4',
      inprogress: '1',
      done: '1',
      archive: '0',
    },
    createdAt: '1664898828300',
  },
  {
    _id: '633c570cdfc7dbef15ca8568',
    name: 'Project 2',
    description: 'Other',
    userId: '632f3ca29e67cccae37ab432',
    taskCount: {
      todo: '0',
      inprogress: '5',
      done: '4',
      archive: '3',
    },
    createdAt: '1664898829751',
  },
];

export const CURRENT_USER: CurrentUser = {
  email: 'test@email.com',
  avatarURL: '',
  createdAt: '1664898828405',
};