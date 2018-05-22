import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arr, str: string, fieldName: string): any {
    if(arr.length === 0 || str === '')
      return arr;
    
      return arr.filter(a => a[fieldName].toLowerCase().indexOf(str.toLowerCase()) !== -1);
  }

}
