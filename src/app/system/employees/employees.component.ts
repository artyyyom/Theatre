import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeesService} from '../../shared/services/employees.service';
import {Employees} from '../../shared/models/employees.model';
import {Subscription} from 'rxjs/Subscription';
import {Message} from '../../shared/models/message.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  message: Message;
  employees: Employees[] = [];
  constructor(private employeesService: EmployeesService) { }
  sub1: Subscription;
  ngOnInit() {
    this.message = new Message('success', '');
    this.employeesService.getEmployees()
      .subscribe(
        (data: Employees[]) => {
                this.employees = data;
              }
      );
  }
  ngOnDestroy() {
    if(this.sub1)
      this.sub1.unsubscribe();
  }

}
