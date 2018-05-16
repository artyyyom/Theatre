// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public router: Router, private authService: AuthService) {}
  canActivate(): boolean {
    var token = localStorage.getItem('token');
    console.log(token);
    if(token === null){
        this.router.navigate(['login']);
        return false;
    }

    if (!this.authService.loggedIn() && !this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
      console.log('hello');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}