import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Seances } from '../models/seances.model';

@Injectable()
export class SeancesService extends BaseApi {
  constructor (public http: HttpClient) {
    super(http);
  }
  getSeances(): Observable<Seances[]> {
      return this.get('seances')
    }

}
