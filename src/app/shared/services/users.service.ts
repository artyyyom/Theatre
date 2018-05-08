import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsersService extends BaseApi {
  constructor (public http: HttpClient) {
    super(http);
  }
  createUser(data: any) {
      console.log(data);
    return this.post('users', data);
  }
}
