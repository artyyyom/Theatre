import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Positions } from '../models/positions.model';


@Injectable()
export class PositionsService extends BaseApi {
  constructor (public http: HttpClient) {
    super(http);
  }
  getPositions(): Observable<Positions[]> {
      return this.get('positions')
    }
}
