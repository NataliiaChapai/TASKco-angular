import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/dashboard/models/board.interface';

@Pipe({
  name: 'sort',
  pure: true
})
export class SortPipe implements PipeTransform {

  transform(list: Board[] | null, sort: string): any {
    if (sort === 'name' && list) {
      list.sort((a, b) => {
        if ( a.name === b.name ) {
        return 0;
        }
      return( ( a.name < b.name ) ? -1 : 1 )}
    )}
    if (sort === 'date' && list) {
      list.sort((a, b) => {
        if ( a.createdAt === b.createdAt ) {
        return 0;
        }
      return( ( a.createdAt < b.createdAt ) ? -1 : 1 )}
    )}
    if (sort === 'todo' && list) {
      list.sort((a, b) => {
        if ( a.taskCount.todo === b.taskCount.todo ) {
        return 0;
        }
      return( ( a.taskCount.todo < b.taskCount.todo ) ? -1 : 1 )}
    )}
    if (sort === 'inprogress' && list) {
      list.sort((a, b) => {
        if ( a.taskCount.inprogress === b.taskCount.inprogress ) {
        return 0;
        }
      return( ( a.taskCount.inprogress < b.taskCount.inprogress ) ? -1 : 1 )}
    )}
    if (sort === 'done' && list) {
      list.sort((a, b) => {
        if ( a.taskCount.done === b.taskCount.done ) {
        return 0;
        }
      return( ( a.taskCount.done < b.taskCount.done ) ? -1 : 1 )}
    )}
    return list;
  }

}
