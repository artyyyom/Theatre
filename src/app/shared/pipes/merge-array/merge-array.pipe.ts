import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mergeArray'
})
export class MergeArrayPipe implements PipeTransform {

  transform(arr1, arr2) {
    var arr = [];
    arr1.forEach((elt, i) => {
      arr.push({ map: elt, ticket: arr2[i] });
    });
    return arr;
  }


}
