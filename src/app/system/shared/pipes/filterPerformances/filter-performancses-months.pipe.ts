import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPerformancsesMonths'
})
export class FilterPerformancsesMonthsPipe implements PipeTransform {

  transform(items: Array<any>, data: any): any {

    if(
      typeof items === "undefined" || 
      data === -1
      ) {
      return items;
    }
  let dateItem, date;

   return  items.filter(item => {
    dateItem = new Date(item).getMonth();
    date = new Date(data).getMonth(); 
    console.log(dateItem);
    console.log(date);
    return dateItem===date ? true : false;
   });
  }

}
