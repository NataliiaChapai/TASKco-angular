import { BOARDS } from 'src/mocks/db-test-data';
import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {

  let pipe: SortPipe;

  beforeEach(() => {
    pipe = new SortPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return board sorted by name the with the ascending direction', () => {
    const sort = 'name'
    const boards = [...BOARDS];
    const sortedList = boards.sort((a, b) => {
      if (a[sort] === b[sort]) {
        return 0;
      }
      return a[sort] < b[sort] ? -1 : 1;
    })
    expect(pipe.transform(BOARDS, sort, 'asc')).toEqual(sortedList);
  });

  it('should return board sorted by date the with the descending direction', () => {
    const sort = 'createdAt';
    const boards = [...BOARDS];
    const sortedList = boards.sort((a, b) => {
      if (a[sort] === b[sort]) {
        return 0;
      }
      return b[sort] < a[sort] ? -1 : 1;
    })
    expect(pipe.transform(BOARDS, sort, 'desc')).toEqual(sortedList);
  });

  it('first item should have 633c570cdfc7dbef15ca0258 id after sorting by todo task count with the descending direction', () => {
    const sort = 'todo';
    const sortedList = pipe.transform(BOARDS, sort, 'desc') ?? BOARDS;
    expect(sortedList[0]._id).toEqual('633c570cdfc7dbef15ca0258');
  });
});
