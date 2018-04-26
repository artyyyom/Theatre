import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { URLSearchParams } from '@angular/http';


export class BaseApi {
  private baseUrl = 'http://127.0.0.1:8000/api/';
  constructor(public http: HttpClient) {}

  private getUrl(url: string = '') {
    return this.baseUrl + url;
  }

  public get(url: string = '', params: any = {}): Observable<any> {
    return this.http
      .get(this.getUrl(url), params)
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data)
      .map((response: Response) => response.json());
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data)
      .map((response: Response) => response.json());
  }

}
