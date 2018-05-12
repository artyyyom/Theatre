import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Tickets } from '../../../shared/models/tickets.model';
import { SeancesService } from '../../../shared/services/seances.service';
import { Seances } from '../../../shared/models/seances.model';
import { Observable } from 'rxjs/Observable';
import { Category_PlacesService } from '../../../shared/services/category_places.service';
import { Category_Places } from '../../../shared/models/category_places.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { TicketsService } from '../../../shared/services/tickets.service';


@Component({
  selector: 'app-profile-order',
  templateUrl: './profile-order.component.html',
  styleUrls: ['./profile-order.component.css']
})
export class ProfileOrderComponent implements OnInit, OnDestroy {
  cardform: FormGroup;
  actualSeances: Seances[];
  actualSeancesChunk: Seances[] = [];
  historySeances: Seances[];
  historySeancesChunk: Seances[] = [];
  ticketsOrder = [];
  category_places: Category_Places[];
  isLoading = false;
  display: boolean = false;
  sub1: Subscription;
  sub2: Subscription;
  ticket_id: number = 0;
  displayAnswer: boolean = false;
  constructor(private categoryPlacesService: Category_PlacesService,
              private seancesService: SeancesService, 
              private router: Router,
              private fb: FormBuilder,
              private ticketsService: TicketsService) { }

  ngOnInit() {
    this.cardform = this.fb.group({
      'cc-number': new FormControl('', Validators.required),
      'cc-exp-date': new FormControl('', Validators.required),
      'cc-cvc': new FormControl('', Validators.required),
    });
    this.sub1 = Observable.combineLatest(
      this.seancesService.getUserActualSeances(),
      this.categoryPlacesService.getCategoryPlaces(),
      this.seancesService.getUserHistorySeances()
    ).subscribe((data:[Seances[], Category_Places[], Seances[]]) => {
        this.actualSeances = data[0];
        this.category_places = data[1];
        this.historySeances = data[2];
        this.isLoading = true;
        let event = {"first": 0, "rows": 1};
        this.paginateActual(event);
        this.paginateHistory(event);
        console.log(data);
      });
  }
  paginateActual(event) {
    this.actualSeancesChunk = this.actualSeances.slice(event.first, event.first+event.rows);
  }
  paginateHistory(event) {
    this.historySeancesChunk = this.historySeances.slice(event.first, event.first+event.rows);
  }
  ngOnDestroy() {
    if(this.sub1) 
      this.sub1.unsubscribe();
    if(this.sub2) 
      this.sub2.unsubscribe();
  }
  clickReturn(ticket_id) {
    this.display = true;
    this.ticket_id = ticket_id;
    console.log(this.ticket_id);

  }
  updateTicketStatus() {
    let ticket = {status: 0, is_avalaible: 1, user_id: 0};
    this.sub2 = this.ticketsService.updateTicketsAuth(this.ticket_id, ticket)
      .subscribe(data => {
        this.display = false;
        this.displayAnswer = true;
        this.removeTicket();
      });
  }
  removeTicket() {
    this.actualSeances.forEach((actualSeance, index) => {
      this.actualSeances[index].tickets = actualSeance.tickets.filter(ticket => {
        return ticket.id !== this.ticket_id;
      })
    });
  }
}
