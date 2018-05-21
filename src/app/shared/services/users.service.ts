import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';


@Injectable()
export class UsersService extends BaseApi {
  headers: HttpHeaders;
  constructor (public http: HttpClient, 
               public authHttp: AuthHttp,
               public router: Router) {
    super(http, authHttp, router);
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
    try {
    return tokenNotExpired();
    }
    catch(e) {
      console.log(e);
      this.router.navigate['/login'];
    }
  }
  logout(): Observable<any> {
    return this.authPost('logout');
  }
  getUsersByRole(filter: string = 'false') {
    let data = {filter: filter};
    return this.authPost('getUsersByRole', data);
  }
  deleteUser(id: number) {
    return this.authDelete(`users/${id}`);
  }
  addSuperUser(data: any = {}) {
    return this.authPost('addSuperUser', data)
  }
  getUserById(id: number) {
    return this.authPost(`getUserById/${id}`);
  }
  updateUser(id: number, data: any = {}) {
    return this.authPost(`updateUser/${id}`, data);
  }
  getUserByTicketId(id: number) {
    return this.authPost(`getUserByTicketId/${id}`);
  }
}
