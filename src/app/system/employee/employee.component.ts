import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeesService } from '../../shared/services/employees.service';
import { Employees } from '../../shared/models/employees.model';
import {Subscription} from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Performances } from '../../shared/models/performances.model';
import { Employees_Performances } from '../../shared/models/employees_performances.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employee: Employees;
  performances: Performances[];
  sub1: Subscription;
  routeId: number;
  galleryImages: any;
  pivot: Employees_Performances;
  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    console.log(this.routeId);
    this.sub1 = this.employeesService.getEmployee(this.routeId)
      .subscribe((data: Employees) => {
        this.employee = data;
        this.galleryImages = JSON.parse(data.photos);
        this.performances = data.performances;
        console.log(this.performances);
      });
  }

  ngOnDestroy() {
    if(this.sub1)
      this.sub1.unsubscribe();
  }

}
