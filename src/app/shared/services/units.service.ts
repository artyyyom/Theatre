import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Units } from '../models/units.model';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class UnitsService extends BaseApi {
  constructor (public http: HttpClient, 
    public authHttp: AuthHttp,
    public router: Router) {
    super(http, authHttp, router);
  }
  getUnits(filter: string = 'false', id: number = 0): Observable<Units[]> {
      let data = {filter: filter, id: id};
      return this.get('units', {params: data})
  }
  getUnit(id): Observable<Units> {
    return this.get(`units/${id}`)
  }
  addUnit(data: any = {}) {
    return this.authPost('units', data);
  }
  updateUnit(id: number, data: any = {}) {
    return this.authPut(`units/${id}`, data);
  }
  deleteUnit(id:number) {
    return this.authDelete(`units/${id}`);
  }
}
