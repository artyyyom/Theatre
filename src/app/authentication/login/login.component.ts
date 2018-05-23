import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  userform: FormGroup;
  isLoginError: boolean = false;
  constructor(private fb: FormBuilder,
              private authService: UsersService,
              private router: Router
             ) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'password': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
    });
  }
  OnSubmit(value: any) {
    console.log(value);
    this.sub1 = this.authService.userAuthentication(value.email, value.password)
      .subscribe(data => {
        localStorage.setItem('token', data.access_token);
        this.router.navigate(['/profile-order']);
      },
      (error)=>{
        this.isLoginError = true;
      });
  }
  ngOnDestroy() {
    if(this.sub1)
      this.sub1.unsubscribe();
  }
}
