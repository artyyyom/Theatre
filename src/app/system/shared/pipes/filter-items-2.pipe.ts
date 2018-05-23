import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterItems2'
})
export class FilterItems2Pipe implements PipeTransform {

  transform(items: any, namesField: any, data: any): any {
    //console.log(items);
    if(
      typeof data === "undefined" || 
      typeof namesField[0] === "undefined" ||
      typeof namesField[1] === "undefined" ||
      data === -1
      ) {
      return items;
    }
    let array = [];
    array = items.filter(i => {
      if(i[namesField[0]][namesField[1]] == data)
        return true;
      else 
        return false;
    });
    return array;
  }

}
