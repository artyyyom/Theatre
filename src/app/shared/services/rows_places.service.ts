import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Rows_Places } from '../models/rows_places.model';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class Rows_PlacesService extends BaseApi {
  constructor (public http: HttpClient, public authHttp: AuthHttp) {
    super(http, authHttp);
  }
  getRowsPlaces(stage_id?: number): Observable<Rows_Places[]> {
      let data = {stage_id: stage_id};
      return this.get('rows_places',  {params: data});
    }

}
