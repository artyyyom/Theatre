import { BaseApi } from "../../../shared/core/base-api";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthHttp, tokenNotExpired,  } from "angular2-jwt";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService extends BaseApi { 
    headers: HttpHeaders;
    constructor (public http: HttpClient, 
        public authHttp: AuthHttp,
        public router: Router) {
        super(http, authHttp, router);
        this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    }
    
    userAuthentication(email, password) {
        
        let data = {email: email, password: password};
        
        return this.post('loginAdminPanel', data, {headers: this.headers});
    }
    loggedIn() {
        return tokenNotExpired();
    }
    logout(): Observable<any> {
        return this.authPost('logout');
    }
}