import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import {Employees} from '../models/employees.model';

@Injectable()
export class EmployeesService extends BaseApi {
  constructor (public http: HttpClient) {
    super(http);
  }
  getEmployees(): Observable<Employees> {
      return this.get('employees');
    }
}
