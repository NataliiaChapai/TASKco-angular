import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/dashboard/models/board.interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(list: Board[] | null, filterText: string): any {
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
