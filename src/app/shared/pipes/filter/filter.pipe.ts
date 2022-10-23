import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/dashboard/models/board.interface';
import { Task } from 'src/app/board/models/task.interface'; 

@Pipe({
  name: 'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {
  transform(list: any[] | null, filterText: string): any[] | null {
    if (filterText === '') {
      return list;
    } else if (list) {
      return list.filter(item => {
        return item.name.toLowerCase().includes(filterText.toLowerCase())

      });
    } else {
      return [];
    }
  }
}
