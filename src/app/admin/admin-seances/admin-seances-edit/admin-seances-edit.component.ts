import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Rows_Places } from '../../../shared/models/rows_places.model';
import { Performances } from '../../../shared/models/performances.model';
import { Stages } from '../../../shared/models/stages.model';
import { Seasons } from '../../../shared/models/seasons.model';
import { SeancesService } from '../../../shared/services/seances.service';
import { SeasonsService } from '../../../shared/services/seasons.service';
import { PerformancesService } from '../../../shared/services/performances.service';
import { Rows_PlacesService } from '../../../shared/services/rows_places.service';
import { StagesService } from '../../../shared/services/stages.service';
import { TicketsService } from '../../../shared/services/tickets.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Seances } from '../../../shared/models/seances.model';
import { Tickets } from '../../../shared/models/tickets.model';

@Component({
  selector: 'app-admin-seances-edit',
  templateUrl: './admin-seances-edit.component.html',
  styleUrls: ['./admin-seances-edit.component.css']
})
export class AdminSeancesEditComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  dataform: FormGroup;
  ticketform: FormGroup;
  isSuccess: boolean = false;
  isError: boolean = false;
  isSuccessTicket: boolean = false;
  isErrorTicket: boolean = false;
  rowplaces: Rows_Places[];
  performances: Performances[];
  stages: Stages[];
  seasons: Seasons[];
  seance: Seances;
  tickets: Tickets[];
  performancesSelect: Performances;
  stagesSelect: Stages;
  seasonsSelect: Seasons;
  isLoad: boolean = false;
  routeId: number;
  constructor(private seancesService: SeancesService,
              private seasonsService: SeasonsService,
              private performancesService: PerformancesService,
              private stagesService: StagesService,
              private rowplacesService: Rows_PlacesService,
              private ticketsService: TicketsService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    this.sub2 = Observable.combineLatest(
      this.seasonsService.getSeasons(),
      this.stagesService.getStages(),
      this.performancesService.getPerformances(),
      this.seancesService.getSeance(this.routeId),
      this.ticketsService.getTickets('seances', this.routeId),
    )
    .subscribe((data: [Seasons[], Stages[], Performances[], Seances, Tickets[]]) => {
      this.seasons = data[0];
      this.stages = data[1];
      this.performances = data[2];
      this.seance = data[3];
      this.tickets = data[4];
      this.stagesSelect = this.seance.stage;
      this.performancesSelect = this.seance.performance;
      this.seasonsSelect = this.seance.season;
      this.deleteFields();
      this.dataform = this.fb.group({
        'date': new FormControl(this.seance.date, Validators.required),
        'time': new FormControl(this.seance.time, Validators.required),
      });
      this.ticketform = this.fb.group({
        'tickets': this.fb.array([
        ]),
      })

      console.log(this.tickets);
      this.getRowsPlaces();

      this.isLoad = true;

    }, error => {

    })
    
  }
  deleteFields() {
    this.performances.forEach((performance, i) => {
      delete this.performances[i].seances;
    });
    this.seasons.forEach((seasons, i) => {
      delete this.seasons[i].is_parent;
    })
    this.stages.forEach((stage, i) => {
      delete this.stages[i].is_parent;
    });

  }
  initTickets(value: any = {}, ticket: any = {}) {
    return this.fb.group({
      id: ticket.id,
      row_id: value.row_id,
      place_id: value.place_id,
      category_id: value.category_id,
      category_name: value.category_place['name'],
      price: ticket.price/1000
    });
  }
  addTicket(value, ticket) {
    (<FormArray>this.ticketform.get('tickets')).push(
      this.initTickets(value, ticket)
    )   
  }
  getRowsPlaces() {
    this.sub3 = this.rowplacesService.getRowsPlaces(this.stagesSelect.id)
      .subscribe(data => {
        this.rowplaces = data;
        this.rowplaces.forEach((rowplace, i) => {
          this.addTicket(rowplace,this.tickets[i]);
        })
        console.log(this.rowplaces);
      });
  }
  changeStage(event) {
    console.log(event);
    this.getRowsPlaces();
  }
 
  OnSubmitTicket(value) {
    let data = {
      seance_id: this.routeId,
      tickets: value.tickets
    }
    this.sub4 = this.ticketsService.updateRootTicketsAuth(this.routeId, data)
      .subscribe(data => {
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
    this.sub1 = this.seancesService.updateSeance(this.routeId, data)
      .subscribe(data => {
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
    if(this.sub4)
      this.sub4.unsubscribe();
  }

}
