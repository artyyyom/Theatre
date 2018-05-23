import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { SeancesService } from '../../../shared/services/seances.service';
import { Observable } from 'rxjs/Observable';
import { Seasons } from '../../../shared/models/seasons.model';
import { Stages } from '../../../shared/models/stages.model';
import { Performances } from '../../../shared/models/performances.model';
import { SeasonsService } from '../../../shared/services/seasons.service';
import { StagesService } from '../../../shared/services/stages.service';
import { PerformancesService } from '../../../shared/services/performances.service';
import {SelectItem} from 'primeng/api';
import { Rows_PlacesService } from '../../../shared/services/rows_places.service';
import { Rows_Places } from '../../../shared/models/rows_places.model';
import { TicketsService } from '../../../shared/services/tickets.service';


@Component({
  selector: 'app-admin-seances-create',
  templateUrl: './admin-seances-create.component.html',
  styleUrls: ['./admin-seances-create.component.css']
})
export class AdminSeancesCreateComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  dataform: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  isSuccessTicket: boolean = false;
  isErrorTicket: boolean = false;
  rowplaces: Rows_Places[];
  performances: Performances[];
  stages: Stages[];
  seasons: Seasons[];
  performancesSelect: Performances;
  stagesSelect: Stages;
  seasonsSelect: Seasons;
  isLoad: boolean = false;
  constructor(private seancesService: SeancesService,
              private seasonsService: SeasonsService,
              private performancesService: PerformancesService,
              private stagesService: StagesService,
              private rowplacesService: Rows_PlacesService,
              private ticketsService: TicketsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.dataform = this.fb.group({
      'date': new FormControl('', Validators.required),
      'time': new FormControl('', Validators.required),
      'tickets': this.fb.array([

      ]),
    });
    this.sub2 = Observable.combineLatest(
      this.seasonsService.getSeasons(),
      this.stagesService.getStages(),
      this.performancesService.getPerformances(),
      
    )
    .subscribe((data: [Seasons[], Stages[], Performances[]]) => {
      this.seasons = data[0];
      this.stages = data[1];
      this.performances = data[2];
      if(this.seasons.length)
        this.seasonsSelect = this.seasons[0];
      if(this.stages.length) {
        this.stagesSelect = this.stages[0];
        this.getRowsPlaces();
      }
      if(this.performances.length)
        this.performancesSelect = this.performances[0];
      
      
      this.isLoad = true;

    }, error => {

    })
    
  }
  initTickets(value: any = {}) {
    return this.fb.group({
      row_id: value.row_id,
      place_id: value.place_id,
      category_id: value.category_id,
      category_name: value.category_place['name'],
      price: 100
    });
  }
  addTicket(value) {
    (<FormArray>this.dataform.get('tickets')).push(
      this.initTickets(value)
    )   
  }
  getRowsPlaces() {
    this.sub3 = this.rowplacesService.getRowsPlaces(this.stagesSelect.id)
      .subscribe(data => {
        this.rowplaces = data;
        this.rowplaces.forEach(rowplace => {
          this.addTicket(rowplace);
        })
        console.log(this.rowplaces);
      });
  }
  changeStage(event) {
    console.log(event);
    this.getRowsPlaces();
  }
  createTickets(value, seance_id) {
    let data = {
      seance_id: seance_id,
      tickets: value.tickets
    }
    this.ticketsService.addTickets(data)
      .subscribe(date => {
        this.isSuccessTicket = true;
        setTimeout(() => this.isSuccessTicket = false, 4000);
      }, error => {
        this.isErrorTicket = true;
        setTimeout(() => this.isErrorTicket = false, 4000);
      })
  }
  OnSubmit(value) {
    let seance_id;
    let data = {
      date: value.date,
      time: value.time,
      datetime: `${value.date} ${value.time}`,
      stage_id: this.stagesSelect.id,
      season_id: this.seasonsSelect.id,
      performance_id: this.performancesSelect.id
    }
    console.log(data);
    this.sub1 = this.seancesService.addSeance(data)
      .subscribe(data => {
        seance_id = data;
        this.createTickets(value, seance_id);
        this.isSuccess = true;
        setTimeout(() => this.isSuccess = false, 4000);
      }, error => {
        this.isError = true;
        setTimeout(() => this.isError = false, 4000);
      });
    
  }

  ngOnDestroy() {
    if(this.sub1) 
      this.sub1.unsubscribe();
    if(this.sub2) 
      this.sub2.unsubscribe();
    if(this.sub3)
      this.sub3.unsubscribe();
  }

}
