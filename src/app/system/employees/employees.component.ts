import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeesService} from '../../shared/services/employees.service';
import {Employees} from '../../shared/models/employees.model';
import {Subscription} from 'rxjs/Subscription';
import { PositionsService } from '../../shared/services/positions.service';
import { Positions } from '../../shared/models/positions.model';
import {Observable} from 'rxjs/Rx';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { forEach } from '@angular/router/src/utils/collection';



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees: Employees[] = [];
  positions: Positions[] = [];
  navig: Array<any> = [];
  positionId: number;
  isLoaded: boolean = false;
  constructor(
    private employeesService: EmployeesService,
    private positionsService: PositionsService
  ) { }
  sub1: Subscription;
  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.employeesService.getEmployees(),
      this.positionsService.getPositions()
    ).subscribe(
        (data: [Employees[], Positions[]]) => {
                this.employees = data[0];
                this.positions = data[1];
                this.isLoaded = true;
              }
      );
  }
  onChangedId(id: number) {
    this.positionId = id;
  }
  ngOnDestroy() {
    if(this.sub1)
      this.sub1.unsubscribe();
  }

}
