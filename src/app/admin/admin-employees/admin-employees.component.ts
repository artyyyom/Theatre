import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employees } from '../../shared/models/employees.model';
import { Subscription } from 'rxjs/Subscription';
import { EmployeesService } from '../../shared/services/employees.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-admin-employees',
  templateUrl: './admin-employees.component.html',
  styleUrls: ['./admin-employees.component.css']
})
export class AdminEmployeesComponent implements OnInit, OnDestroy {
  isSuccess: boolean = false;
  isError:boolean = false;
  employees: Employees[];
  sub1: Subscription;
  sub2: Subscription;
  isLoad: boolean = false;
  search: string = '';
  sort: boolean = false;
  constructor(private employeesService: EmployeesService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.sub1 = this.employeesService.getEmployees()
      .subscribe(data => {
        this.employees = data;
        console.log(this.employees);
        this.isLoad = true;
      });
  }
  deleteEmployees(id) {
    this.isLoad = false;
    this.sub2 = this.employeesService.deleteEmployee(id)
      .subscribe(data => {
        this.employees = this.sharedService.delElArray(this.employees, id);
        this.isSuccess = true;
        this.isLoad = true;
        setTimeout(() => this.isSuccess = false, 4000);
      },error =>{
        this.isError = true;
        this.isLoad = true;
        setTimeout(() => this.isError = false, 4000);
      });
    
  }
  sortBy() {
    if(!this.sort) {
      this.employees.sort((a,b)=>a.surname.localeCompare(b.name));
      this.sort = true;
    }
    else {
      this.employees.sort((a,b)=>b.surname.localeCompare(a.name));
      this.sort = false;
    }
  }
  ngOnDestroy() {
    if(this.sub1)
      this.sub1.unsubscribe();
    if(this.sub2) 
      this.sub2.unsubscribe();
  }


}
