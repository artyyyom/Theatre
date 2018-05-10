import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Positions } from '../models/positions.model';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class PositionsService extends BaseApi {
  constructor (public http: HttpClient, public authHttp: AuthHttp) {
    super(http, authHttp);
  }
  getPositions(): Observable<Positions[]> {
      return this.get('positions')
    }
}
