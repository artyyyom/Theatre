import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Observable';
import { Units } from '../models/units.model';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class PdfService extends BaseApi {
  constructor (public http: HttpClient, 
    public authHttp: AuthHttp,
    public router: Router) {
    super(http, authHttp, router);
  }
  getPdf() {
    let headers = new Headers({ 
        'Content-Type': 'application/blob', 
        'Accept': 'application/pdf',
        'responseType': 'blob'
    });   
    return this.post('pdfgenerator', {}, {headers: headers});
  }

}
