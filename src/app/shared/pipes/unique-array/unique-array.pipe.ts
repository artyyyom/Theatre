import { Pipe, PipeTransform } from '@angular/core';
import { letProto } from 'rxjs/operator/let';

@Pipe({
  name: 'uniqueArray'
})
export class UniqueArrayPipe implements PipeTransform {

  transform(items: Array<any>): any {
    console.log("trans" + items);
    return Array.from(new Set(items));

  }

}
