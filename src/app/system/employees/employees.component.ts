import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeesService} from '../../shared/services/employees.service';
import {Employees} from '../../shared/models/employees.model';
import {Subscription} from 'rxjs/Subscription';
import { PositionsService } from '../../shared/services/positions.service';
import { Positions } from '../../shared/models/positions.model';
import {Observable} from 'rxjs/Rx';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { forEach } from '@angular/router/src/utils/collection';
import { Units } from '../../shared/models/units.model';
import { UnitsService } from '../../shared/services/units.service';



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees: Employees[] = [];
  positions: Positions[] = [];
  units: Units[] = [];
  navig: Array<any> = [];
  positionId: number;
  isLoaded: boolean = false;
  constructor(
    private unitsService: UnitsService,
    private employeesService: EmployeesService,
    private positionsService: PositionsService
  ) { }
  sub1: Subscription;
  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.employeesService.getEmployees(),
      this.positionsService.getPositions(),
      this.unitsService.getUnits(),
    ).subscribe(
        (data: [Employees[], Positions[], Units[]]) => {
                this.employees = data[0];
                this.positions = data[1];
                this.units = data[2];
                this.isLoaded = true;
                console.log(this.employees);
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
