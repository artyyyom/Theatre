import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Roles } from '../models/roles.model';


@Injectable()
export class RolesService extends BaseApi {
  constructor (public http: HttpClient, 
    public authHttp: AuthHttp,
    public router: Router) {
    super(http, authHttp, router);
  }
  getRoles(stage_id?: number): Observable<Roles[]> {
      return this.authPost('getRoles');
  }

}
