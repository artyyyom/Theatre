import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Stages } from '../models/stages.model';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class StagesService extends BaseApi {
  constructor (public http: HttpClient, public authHttp: AuthHttp) {
    super(http, authHttp);
  }
  getStages(): Observable<Stages[]> {
      return this.get('stages')
    }

}
