import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnitsService } from '../../shared/services/units.service';
import { Subscription } from 'rxjs';
import { Units } from '../../shared/models/units.model';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-admin-units',
  templateUrl: './admin-units.component.html',
  styleUrls: ['./admin-units.component.css']
})
export class AdminUnitsComponent implements OnInit, OnDestroy {
  isSuccess: boolean = false;
  isError:boolean = false;
  units: Units[];
  sub1: Subscription;
  sub2: Subscription;
  isLoad: boolean = false;
  constructor(private unitService: UnitsService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.sub1 = this.unitService.getUnits()
      .subscribe(data => {
        this.units = data;
        this.isLoad = true;
      });
  }
  deleteUnits(id) {
    this.isLoad = false;
    this.sub2 = this.unitService.deleteUnit(id)
      .subscribe(data => {
        this.units = this.sharedService.delElArray(this.units, id);
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
