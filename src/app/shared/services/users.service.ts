import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';


@Injectable()
export class UsersService extends BaseApi {
  headers: HttpHeaders;
  constructor (public http: HttpClient, public authHttp: AuthHttp) {
    super(http, authHttp);
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }
  
  createUser(data: any): Observable<any> {
    return this.post('users', data);
  }
  userAuthentication(email, password) {
    
    let data = {email: email, password: password};
    
    return this.post('login', data, {headers: this.headers});
  }
  loggedIn() {
    return tokenNotExpired();
  }
  logout(): Observable<any> {
    return this.authPost('logout');
  }
}
