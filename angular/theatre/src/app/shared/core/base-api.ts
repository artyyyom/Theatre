import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';


export class BaseApi {
  private baseUrl = 'htpp://localhost:3000';
  constructor(private http: HttpClient) {}

  private getUrl(url: string = '') {
    return this.baseUrl + url;
  }

  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url))
      .map((response: Response) => response.json());
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
