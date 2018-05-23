import { Pipe, PipeTransform } from '@angular/core';
import { empty } from 'rxjs/Observer';
import { isEmpty } from 'rxjs/operators';

@Pipe({
  name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {

  transform(items: any, nameField: string, data: any): any {
    console.log(data);
    if(
      items.length === 0 || 
      typeof data === "undefined" || 
      typeof nameField === "undefined" ||
      data === -1
      ) {
    
      return items;
    }
    
    return items.filter(i => {
     // console.log(`i: ${i} - nF: ${i[nameField]} - d: ${data}`)
      return i[nameField] == data
    });
  }

}
