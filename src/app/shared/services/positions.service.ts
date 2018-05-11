import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Positions } from '../models/positions.model';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';


@Injectable()
export class PositionsService extends BaseApi {
  constructor (public http: HttpClient, 
    public authHttp: AuthHttp,
    public router: Router) {
    super(http, authHttp, router);
  }
  getPositions(): Observable<Positions[]> {
      return this.get('positions')
    }
}
