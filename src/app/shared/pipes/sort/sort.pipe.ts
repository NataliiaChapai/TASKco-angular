import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: true,
})
export class SortPipe implements PipeTransform {
  transform(list: any[] | null, sort: string, direction: string): any[] | null {
    let sortedItems: any = [];
    if (list) {
      sortedItems =
      direction === 'asc'
        ? this.sortAscending(list, sort)
        : this.sortDescending(list, sort);
    }
    return sortedItems;
  }

  sortAscending(list: any[], sort: string) {
    if (sort === 'name' || sort === 'createdAt') {
      list.sort((a, b) => {
        if (a[sort] === b[sort]) {
          return 0;
        }
        return a[sort] < b[sort] ? -1 : 1;
      });
    }

    if (sort === 'todo' || sort === 'inprogress' || sort === 'done') {
      list.sort((a, b) => {
        if (a.taskCount[sort] === b.taskCount[sort]) {
          return 0;
        }
        return a.taskCount[sort] < b.taskCount[sort] ? -1 : 1;
      });
    }

    return list;
  }

  sortDescending(list: any[], sort: string) {
    if (sort === 'name' || sort === 'createdAt') {
      list.sort((a, b) => {
        if (a[sort] === b[sort]) {
          return 0;
        }
        return b[sort] < a[sort] ? -1 : 1;
      });
    }

    if (sort === 'todo' || sort === 'inprogress' || sort === 'done') {
      list.sort((a, b) => {
        if (a.taskCount[sort] === b.taskCount[sort]) {
          return 0;
        }
        return b.taskCount[sort] < a.taskCount[sort] ? -1 : 1;
      });
    }

    return list;
  }
}
