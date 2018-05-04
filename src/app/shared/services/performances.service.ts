import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Performances } from '../models/performances.model';

@Injectable()
export class PerformancesService extends BaseApi {
  constructor (public http: HttpClient) {
    super(http);
  }
  getPerformances(): Observable<Performances[]> {
      return this.get('performances');
    }
  getPerformance(id: number, filter: string = 'false', seance_id?:number): Observable<Performances> {
    let data = {filter: filter, seance_id: seance_id};
    return this.get(`performances/${id}`,{params: data})  
  }
}
