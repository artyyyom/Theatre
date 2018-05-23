import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Performances } from '../models/performances.model';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class PerformancesService extends BaseApi {
  constructor (public http: HttpClient, 
    public authHttp: AuthHttp,
    public router: Router) {
    super(http, authHttp, router);
  }
  getPerformances(): Observable<Performances[]> {
      return this.get('performances');
    }
  getPerformance(id: number, filter: string = 'false', seance_id?:number): Observable<Performances> {
    let data = {filter: filter, seance_id: seance_id};
    return this.get(`performances/${id}`,{params: data})  
  }
  addPerformance(data: any = {}) {
    return this.authPost('performances', data);
  }
  updatePerformance(id: number, data: any = {}) {
    return this.authPut(`performances/${id}`, data);
  }
  deletePerformance(id: number) {
    return this.authDelete(`performances/${id}`);
  }
  upload(data) {
    return this.authPost('uploadPerformancePhotos', data);
  }

}
