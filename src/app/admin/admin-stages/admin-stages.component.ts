import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StagesService } from '../../shared/services/stages.service';
import { Stages } from '../../shared/models/stages.model';

@Component({
  selector: 'app-admin-stages',
  templateUrl: './admin-stages.component.html',
  styleUrls: ['./admin-stages.component.css']
})
export class AdminStagesComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;
  stages: Stages[];
  isLoaded: boolean = false;
  isSuccess: boolean = false;
  isError:boolean = false;
  constructor(private stagesService: StagesService) { }

  ngOnInit() {
    this.sub1 = this.stagesService.getStages() 
      .subscribe(data => {
        this.stages = data;
        this.isLoaded = true;
      });
  }
  deleteStage(id) {
    this.isLoaded = false;
    this.sub2 = this.stagesService.deleteStage(id)
      .subscribe(data => {
        this.isSuccess = true;
        this.isLoaded = true;
        setTimeout(() => this.isSuccess = false, 4000);
      }, error => {
        this.isError = true;
        this.isLoaded = true;
        setTimeout(() => this.isError = false, 4000);
      })
  }
  ngOnDestroy() {
    if(this.sub1)
      this.sub1.unsubscribe();
    if(this.sub2)
      this.sub2.unsubscribe();
  }
}
