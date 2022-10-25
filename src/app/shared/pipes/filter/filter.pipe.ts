import { Pipe, PipeTransform } from '@angular/core';

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
