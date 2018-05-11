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
    var token = localStorage.getItem('token');
    if (!this.authService.loggedIn() && !this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}