import { Component, OnInit, Input } from '@angular/core';
import { Employees } from '../../../shared/models/employees.model';
import { Positions } from '../../../shared/models/positions.model';
import { Units } from '../../../shared/models/units.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  @Input() employees: Employees;
  @Input() positions: Positions;
  @Input() units: Units[];
  @Input() positionId: number;
  
  constructor() { }

  ngOnInit() {
  }

}
