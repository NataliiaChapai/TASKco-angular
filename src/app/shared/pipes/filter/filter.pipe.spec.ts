import { TASKS } from 'src/mocks/db-test-data';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
 let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return task which contains "task 2"', () => {
    const query = 'task 2'
    expect(pipe.transform(TASKS, query)).toEqual([TASKS[1]]);
  });

  it('should return empty array', () => {
    const query = 'abcd'
    expect(pipe.transform(TASKS, query)).toEqual([]);
  });

  it('should return origin array in case of empty query', () => {
    const query = ''
    expect(pipe.transform(TASKS, query)).toEqual(TASKS);
  });
});
