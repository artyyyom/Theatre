import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  userform: FormGroup;
  isLoginError: boolean = false;
  display: true;
  constructor(private fb: FormBuilder,
              private authService: UsersService,
             ) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
    });
  }
  OnSubmit(value: any) {
    console.log(value);
    this.sub1 = this.authService.reset(value)
      .subscribe(data => {
        this.display = true;
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
