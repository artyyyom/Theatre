import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Units } from '../models/units.model';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UnitsService extends BaseApi {
  constructor (public http: HttpClient, public authHttp: AuthHttp) {
    super(http, authHttp);
  }
  getUnits(filter: string = 'false', id: number = 0): Observable<Units[]> {
      let data = {filter: filter, id: id};
      return this.get('units', {params: data})
    }

}
