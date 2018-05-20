import { Component, OnInit, OnDestroy } from '@angular/core';
import { Performances } from '../../shared/models/performances.model';
import { Subscription } from 'rxjs/Subscription';
import { PerformancesService } from '../../shared/services/performances.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-admin-performances',
  templateUrl: './admin-performances.component.html',
  styleUrls: ['./admin-performances.component.css']
})
export class AdminPerformancesComponent implements OnInit, OnDestroy {
  isSuccess: boolean = false;
  isError:boolean = false;
  performances: Performances[];
  sub1: Subscription;
  sub2: Subscription;
  isLoad: boolean = false;
  constructor(private performancesService: PerformancesService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.sub1 = this.performancesService.getPerformances()
      .subscribe(data => {
        this.performances = data;
        this.isLoad = true;
      });
  }
  deletePerformance(id) {
    this.isLoad = false;
    this.sub2 = this.performancesService.deletePerformance(id)
      .subscribe(data => {
        this.performances = this.sharedService.delElArray(this.performances, id);
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
