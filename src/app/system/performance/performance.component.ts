import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerformancesService } from '../../shared/services/performances.service';
import { Subscription } from 'rxjs/Subscription';
import { Performances } from '../../shared/models/performances.model';
import { Employees } from '../../shared/models/employees.model';
import {Observable} from 'rxjs/Rx';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { UnitsService } from '../../shared/services/units.service';
import { Units } from '../../shared/models/units.model';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit, OnDestroy {
  routeId: number;
  performance: Performances;
  units: Units[];
  employees: Employees[];
  galleryImages: any;
  sub1: Subscription;  
  isLoaded: boolean = false;
  constructor(
    private unitsService: UnitsService,
    private performanceService: PerformancesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    this.sub1 = Observable.combineLatest(
      this.performanceService.getPerformance(this.routeId),
      this.unitsService.getUnits('performances', this.routeId)
    ).subscribe(
        (data: [Performances, Units[]]) => {
          this.performance = data[0]; 
          this.units = data[1];
          if(data[0].photos)
            this.galleryImages = JSON.parse(data[0].photos);
          this.isLoaded = true;
        },
      //  error => console.log(error)
      );    

  }

  ngOnDestroy(): void {
    if(this.sub1)
      this.sub1.unsubscribe();
    
  }

}
