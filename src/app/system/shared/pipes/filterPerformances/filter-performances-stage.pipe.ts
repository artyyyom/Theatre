import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPerformancesStage'
})
export class FilterPerformancesStagePipe implements PipeTransform {
  uniqueArray(array) {
    let old_date = '';  
    return array.filter(a => {
        if(a !== old_date) {
          old_date = a;
          return true;
        }
        else {
          return false;
        }
    });
  }
  transform(items: Array<any>, seances:any, data: any): any {
    if(
      typeof seances === "undefined" ||
      typeof items === "undefined" || 
      data === -1
      ) {
      return items;
    }
    let array = [];
    items.forEach((item) => {
      seances[item].forEach(seance => {
      //  console.log(seance);
        if (seance.stage.id === data) {
          array.push(item);
        }
      });  
    });
    
    array = this.uniqueArray(array);

    console.log(array);
    return array;
  }

}
