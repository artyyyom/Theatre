// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public router: Router, private authService: UsersService) {}
  canActivate(): boolean {
    try {
      var token = localStorage.getItem('token');
      if(token === null){
        this.router.navigate(['login']);
        return false;
      }
      if(!this.authService.loggedIn()) {
        this.router.navigate(['login']);
        return false;
      }
      
      let expired = this.jwtHelper.isTokenExpired(token);
        if (expired) {
          this.router.navigate(['login']);
          return false;
        }
    }
    catch(e){
      this.router.navigate(['login']);
      return false;
    }
    
    return true;
  }
}