import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Units } from '../models/units.model';

@Injectable()
export class UnitsService extends BaseApi {
  constructor (public http: HttpClient) {
    super(http);
  }
  getUnits(filter: string = 'false', id: number = 0): Observable<Units[]> {
      let data = {filter: filter, id: id};
      return this.get('units', {params: data})
    }

}
