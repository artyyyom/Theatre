// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router, private authService: UsersService) {}
  canActivate(): boolean {
    if (!this.authService.loggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}