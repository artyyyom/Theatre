import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../../shared/services/employees.service';
import {Employees} from '../../shared/models/employees.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
    this.employeesService.getEmployees()
      .subscribe((data: Employees) => {
        console.log(data);
      });
  }

}
