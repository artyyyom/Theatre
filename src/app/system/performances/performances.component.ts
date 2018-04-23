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

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.css']
})
export class PerformancesComponent implements OnInit {
  performances: Performances[];
  stages: Stages[];
  seances: Seances[];
  keys: any;
  constructor(
    private performancesService: PerformancesService,
    private seancesService: SeancesService
  ) { }

  ngOnInit() {
      this.seancesService.getSeances()
        .subscribe((data: Seances[]) => {
          this.seances = data;
          this.keys = data.keys;
          console.log(data);
        });
        
    /*this.performancesService.getPerformances()
      .subscribe((data: Performances[]) => {
        console.log(data);
        this.performances = data;
        console.log(this.stages);
        
      });*/
  }

}
