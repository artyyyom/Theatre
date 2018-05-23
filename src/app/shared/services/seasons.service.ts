import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Seasons } from '../models/seasons.model';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class SeasonsService extends BaseApi {
  constructor (public http: HttpClient, 
    public authHttp: AuthHttp,
    public router: Router) {
    super(http, authHttp, router);
  }
  getSeasons(filter: string = 'false'): Observable<Seasons[]> {
      let data = {filter: filter};
      return this.get('seasons', {params: data});
    }
  getSeason(id): Observable<Seasons> {
    return this.get(`seasons/${id}`)
  }
  addSeason(data: any = {}) {
    return this.authPost('seasons', data);
  }
  updateSeason(id: number, data: any = {}) {
    return this.authPut(`seasons/${id}`, data);
  }
  deleteSeason(id:number) {
    return this.authDelete(`seasons/${id}`);
  }  
}
