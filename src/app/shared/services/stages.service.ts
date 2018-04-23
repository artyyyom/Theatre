import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Stages } from '../models/stages.model';

@Injectable()
export class StagesService extends BaseApi {
  constructor (public http: HttpClient) {
    super(http);
  }
  getStages(): Observable<Stages[]> {
      return this.get('stages')
    }

}
