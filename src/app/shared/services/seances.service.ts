import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Seances } from '../models/seances.model';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class SeancesService extends BaseApi {
  constructor (public http: HttpClient, public authHttp: AuthHttp) {
    super(http, authHttp);
  }
  getSeances(filter: string = 'false'): Observable<Seances[]> {
      let data = {filter: filter};
      return this.get('seances', {params: data})
    }

}
