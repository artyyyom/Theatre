import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  userform: FormGroup;
  isLoginError: boolean = false;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
              ) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'password': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
    });
  }

  OnSubmit(value: any) {
    this.authService.userAuthentication(value.email, value.password)
      .subscribe(data => {
        localStorage.setItem('token', data.access_token);
        this.router.navigate(['']);
      },
      (error)=>{
        this.isLoginError = true;
      });
  }

}
