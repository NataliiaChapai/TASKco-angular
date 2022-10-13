import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/dashboard/models/board.interface';

@Pipe({
  name: 'sort',
  pure: true
})
export class SortPipe implements PipeTransform {

  transform(list: Board[] | null, sort: string): any {
    
    if (list) {
      if (sort === 'name'|| sort === 'createdAt') {
      list.sort((a, b) => {
        if ( a[sort] === b[sort] ) {
        return 0;
        }
      return( ( a[sort] < b[sort] ) ? -1 : 1 )}
    )}
    
    if (sort === 'todo' || sort === 'inprogress' || sort === 'done') {
      list.sort((a, b) => {
        if ( a.taskCount[sort] === b.taskCount[sort] ) {
        return 0;
        }
      return( ( a.taskCount[sort] < b.taskCount[sort] ) ? -1 : 1 )}
    )}
    }
    return list;
  }

}
