import { Component, OnInit, OnDestroy } from '@angular/core';
import { Users } from '../../shared/models/users.model';
import { Subscription } from 'rxjs/Subscription';
import { UsersService } from '../../shared/services/users.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-admin-buyers',
  templateUrl: './admin-buyers.component.html',
  styleUrls: ['./admin-buyers.component.css']
})
export class AdminBuyersComponent implements OnInit, OnDestroy {

  isSuccess: boolean = false;
  isError:boolean = false;
  users: Users[];
  sub1: Subscription;
  sub2: Subscription;
  isLoad: boolean = false;
  search: string = '';
  constructor(private usersService: UsersService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.sub1 = this.usersService.getUsersByRole('false')
      .subscribe(data => {
        this.users = data;
        this.isLoad = true;
      });
  }
  deleteUser(id) {
    this.isLoad = false;
    this.sub2 = this.usersService.deleteUser(id)
      .subscribe(data => {
        this.users = this.sharedService.delElArray(this.users, id);
        this.isSuccess = true;
        this.isLoad = true;
        setTimeout(() => this.isSuccess = false, 4000);
      },error =>{
        this.isError = true;
        this.isLoad = true;
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
