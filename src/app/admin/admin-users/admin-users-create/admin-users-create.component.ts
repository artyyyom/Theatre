import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../../../shared/services/users.service';
import { Roles } from '../../../shared/models/roles.model';
import { RolesService } from '../../../shared/services/role.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-admin-users-create',
  templateUrl: './admin-users-create.component.html',
  styleUrls: ['./admin-users-create.component.css']
})
export class AdminUsersCreateComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  dataform: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  roles: Roles[];
  isLoad: boolean = false;
  rolesSelect: Roles[];
  constructor(private usersService: UsersService,
              private rolesService: RolesService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.dataform = this.fb.group({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', Validators.required)
    });
    this.sub2 = this.rolesService.getRoles()
      .subscribe(data => {
        this.roles = data;
        this.isLoad = true;
      },
      error => {
        this.isError = true;
      });
  }

  OnSubmit(value) {
    let data = {name: value.name, 
                email: value.email, 
                phone: value.phone,
                roles: this.rolesSelect
              };

    this.sub1 = this.usersService.addSuperUser(data)
      .subscribe(data => {
        this.isSuccess = true;
        setTimeout(() => this.isSuccess = false, 4000);
      }, error => {
        this.isError = true;
        setTimeout(() => this.isError = false, 4000);
      });
  }

  ngOnDestroy() {
    if(this.sub1) 
      this.sub1.unsubscribe(); 
    if(this.sub2) 
      this.sub2.unsubscribe();
  }

}
