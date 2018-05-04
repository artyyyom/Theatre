import {Component, NgModule, ViewChild, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { PerformancesService } from '../../shared/services/performances.service';
import { Performances } from '../../shared/models/performances.model';
import { Stages } from '../../shared/models/stages.model';
import { SeancesService } from '../../shared/services/seances.service';
import { Seances } from '../../shared/models/seances.model';
import { forEach } from '@angular/router/src/utils/collection';
import { Subscription } from 'rxjs';
import {Observable} from 'rxjs/Rx';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { StagesService } from '../../shared/services/stages.service';
import { Seasons } from '../../shared/models/seasons.model';
import { SeasonsService } from '../../shared/services/seasons.service';

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.css']
})
export class PerformancesComponent implements OnInit {
  stages: Stages[] = [];
  seances: Seances[] = [];
  seasons: Seasons[] = [];
  keys: any;
  uniqueKeys: any;
  sub1: Subscription;
  isLoaded: boolean = false;
  stageSelectId: number = -1;
  seasonSelectId: number = -1;
  monthSelectId: number = -1;
  arr: any = [];
  constructor(
    private stagesService: StagesService,
    private seancesService: SeancesService,
    private seasonsService: SeasonsService
  ) { }

  ngOnInit() {
    this.sub1 = Observable.combineLatest(
      this.stagesService.getStages(),
      this.seancesService.getSeances('true'),
      this.seasonsService.getSeasons('last')
    ).subscribe(
        (data: [Stages[], Seances[], Seasons[]]) => {
                this.stages = data[0];
                this.seances = data[1];
                this.keys = data[1].keys;
                this.seasons = data[2];
                if(this.keys[0])
                  this.uniqueKeys = this.uniqDate(this.keys);
                if(this.seasons)
                  this.seasonSelectId = this.seasons[0].id ? this.seasons[0].id : -1;
                this.isLoaded = true;
              }
      );    
  }
  uniqDate(_date) {
    let array: Array<string> = [];
    let date;
    let month = 0;
    
    _date.forEach(d => {
      date = new Date(d).getMonth();
      if(month != date) {
        array.push(d);
        month = date;
      }
    });
    return array; 
  }
  ngOnDestroy() {
    if(this.sub1)
      this.sub1.unsubscribe();
  }

}
