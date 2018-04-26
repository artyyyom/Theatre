import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Seasons } from '../models/seasons.model';

@Injectable()
export class SeasonsService extends BaseApi {
  constructor (public http: HttpClient) {
    super(http);
  }
  getSeasons(filter: string = 'false'): Observable<Seasons[]> {
      let data = {filter: filter};
      return this.get('seasons', {params: data});
    }

}
