import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RolesService } from '../../../shared/services/role.service';
import { UsersService } from '../../../shared/services/users.service';
import { Roles } from '../../../shared/models/roles.model';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../../../shared/models/users.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';


@Component({
  selector: 'app-admin-users-edit',
  templateUrl: './admin-users-edit.component.html',
  styleUrls: ['./admin-users-edit.component.css']
})
export class AdminUsersEditComponent implements OnInit, OnDestroy {
  
  sub1: Subscription;
  sub2: Subscription;
  dataform: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  roles: any = [];
  isLoad: boolean = false;
  rolesSelect: Roles[] = [];
  routeId: number;
  user: Users;
  constructor(private usersService: UsersService,
              private rolesService: RolesService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    this.sub2 = Observable.combineLatest(
    this.rolesService.getRoles(),
    this.usersService.getUserById(this.routeId)
    )
    .subscribe((data: [Roles[], Users]) => { 
        this.roles = data[0];  
        this.user = data[1];
        this.dataform = this.fb.group({
          'name': new FormControl(this.user.name, Validators.required),
          'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
          'phone': new FormControl(this.user.phone, Validators.required)
        });
        this.deleteRolePivot();
        this.isLoad = true;
      },
      error => {
        this.isError = true;
      });
  }
  deleteRolePivot() {
    this.rolesSelect = this.user.roles;
    this.rolesSelect.forEach((roleSelect,i) => {
      delete this.rolesSelect[i].pivot;   
    });
  }
  onChange() {
    if(!this.rolesSelect.length)
      this.deleteRolePivot();
    console.log(this.rolesSelect);
  }
  OnSubmit(value) {
    let data = {name: value.name, 
                email: value.email, 
                phone: value.phone,
                roles: this.rolesSelect
              };

    this.sub1 = this.usersService.updateUser(this.routeId, data)
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
