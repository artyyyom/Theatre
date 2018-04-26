import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPerformances'
})
export class FilterPerformancesPipe implements PipeTransform {

  transform(items: Array<any>, seances:any, namesField:any, data: any): any {
    if(
      typeof seances === "undefined" ||
      typeof items === "undefined" || 
      typeof namesField[0] === "undefined" ||
      typeof namesField[1] === "undefined" ||
      data === -1
      ) {
      return items;
    }
    let array = [];
 items.forEach((item) => {
      seances[item].forEach(seance => {
        if (seance[namesField[0]][namesField[1]] === data) {
          array.push(seance);
        }
      });  

    });
    console.log('array-parent');
    console.log(array);
    return array;
  }

}
