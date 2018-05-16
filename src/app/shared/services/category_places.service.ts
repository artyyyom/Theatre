import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Category_Places } from '../models/category_places.model';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';


@Injectable()
export class Category_PlacesService extends BaseApi {
  constructor (public http: HttpClient, 
    public authHttp: AuthHttp,
    public router: Router) {
    super(http, authHttp, router);
  }
  getCategoryPlaces(): Observable<Category_Places[]> {
      return this.get('category_places')
  }
  getCategoryPlace(id): Observable<Category_Places> {
    return this.get(`category_places/${id}`);
  }
  addCategoryPlace(data: any = {}) {
    return this.authPost('category_places', data);
  }
  updateCategoryPlace(id: number, data: any = {}) {
    return this.authPut(`category_places/${id}`, data);
  }
  deleteCategoryPlace(id:number) {
    return this.authDelete(`category_places/${id}`);
  }
}
